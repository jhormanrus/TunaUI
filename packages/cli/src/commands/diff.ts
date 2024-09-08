import { existsSync } from 'node:fs'
import path from 'node:path'
import { styleText } from 'node:util'
import { type Config, getConfig } from '@/utils/get-config'
import { handleError } from '@/utils/handle-error'
import { printIntro, validateCwd } from '@/utils/prompt'
import { fetchTree, getRegistryIndex, sourceUrl } from '@/utils/registry'
import type { RegistryIndexSchema } from '@/utils/registry/schema'
import * as p from '@clack/prompts'
import { $ } from 'bun'
import { Command } from 'commander'
import * as v from 'valibot'

const UpdateOptionsSchema = v.object({
  component: v.string(),
  yes: v.boolean(),
  cwd: v.string(),
  path: v.optional(v.string()),
})

export const diff = new Command()
  .name('diff')
  .description('check for updates against the registry')
  .argument('[component]', 'the component name')
  .option('-y, --yes', 'skip confirmation prompt.', false)
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd(),
  )
  .action(async (name, opts) => {
    try {
      printIntro()

      const options = v.parse(UpdateOptionsSchema, {
        component: name,
        ...opts,
      })
      const cwd = path.resolve(options.cwd)

      validateCwd(cwd)

      const config = await getConfig(cwd)

      if (!config) {
        p.cancel(
          `Configuration is missing. Please run ${styleText(
            'green',
            'init',
          )} to create a components.json file.`,
        )
        process.exit(1)
      }

      const registryIndex = await getRegistryIndex()

      if (!options.component) {
        await diffAll(config, registryIndex)
      }

      // Show diff for a single component.
      const component = registryIndex.find(
        (item) => item.name === options.component,
      )

      if (!component) {
        p.cancel(
          `The component ${styleText(
            'yellow',
            options.component,
          )} does not exist.`,
        )
        process.exit(1)
      }

      const changes = await diffComponent(component, config)

      if (changes.length === 0) {
        p.outro(
          `No updates found for ${styleText('yellow', options.component)}.`,
        )
        process.exit(0)
      }

      for (const change of changes) {
        p.note(change.patch, change.filePath)
      }

      p.outro('Done.')
    } catch (error) {
      handleError(error)
    }
  })

async function diffAll(
  config: Config,
  registryIndex: v.InferInput<typeof RegistryIndexSchema>,
) {
  const targetDir = config.resolvedPaths.components

  // Find all components that exist in the project
  const projectComponents = registryIndex.filter((item) => {
    for (const file of item.files) {
      const fileName = file.split('/').slice(2).join('/')
      const filePath = path.resolve(targetDir, fileName)
      if (existsSync(filePath)) {
        return true
      }
    }
    return false
  })

  // Check for updates
  const componentsWithUpdates = []
  for (const component of projectComponents) {
    const changes = await diffComponent(component, config)
    if (changes.length > 0) {
      componentsWithUpdates.push({
        name: component.name,
        changes,
      })
    }
  }

  if (componentsWithUpdates.length === 0) {
    p.outro('No updates found.')
    process.exit(0)
  }

  const filePaths = componentsWithUpdates
    .map((component) => {
      const componentName = styleText('yellow', component.name)
      const filesPath = component.changes
        .map((change) => change.filePath)
        .join('\n')
      return `${componentName}\n${filesPath}`
    })
    .join('\n\n')

  p.note(filePaths, 'The following components have updates available:')
  p.outro(`Run ${styleText('green', 'diff <component>')} to see the changes.`)
  process.exit(0)
}

async function diffComponent(
  component: v.InferInput<typeof RegistryIndexSchema>[number],
  config: Config,
) {
  const payload = await fetchTree([component])

  const changes = []

  for (const item of payload) {
    for (let i = 0; i < item.files.length; i++) {
      const file = item.files[i]
      const filePath = path.resolve(config.resolvedPaths[file.type], file.name)

      if (!existsSync(filePath)) {
        continue
      }

      const output =
        await $`curl -s -L ${sourceUrl}/${component.files[i]} | git -P diff --no-index -- ${filePath} - | tail -n +5`.text()

      if (output) {
        changes.push({
          file: file.name,
          filePath,
          patch: output,
        })
      }
    }
  }

  return changes
}
