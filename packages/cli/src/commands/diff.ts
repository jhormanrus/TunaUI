import { existsSync } from 'fs'
import path from 'path'
import { Config, getConfig } from '@/utils/get-config'
import { handleError } from '@/utils/handle-error'
import { printIntro, validateCwd } from '@/utils/prompt'
import {
  fetchTree,
  getItemTargetPath,
  getRegistryIndex,
  sourceUrl,
} from '@/utils/registry'
import { RegistryIndexSchema } from '@/utils/registry/schema'
import * as p from '@clack/prompts'
import { $ } from 'bun'
import { Command } from 'commander'
import color from 'picocolors'
import { Input, boolean, object, optional, parse, string } from 'valibot'

const UpdateOptionsSchema = object({
  component: optional(string()),
  yes: boolean(),
  cwd: string(),
  path: optional(string()),
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

      const options = parse(UpdateOptionsSchema, {
        component: name,
        ...opts,
      })
      const cwd = path.resolve(options.cwd)

      validateCwd(cwd)

      const config = await getConfig(cwd)

      if (!config) {
        p.cancel(
          `Configuration is missing. Please run ${color.green(
            'init',
          )} to create a components.json file.`,
        )
        process.exit(1)
        return
      }

      const registryIndex = await getRegistryIndex()

      if (!options.component) await diffAll(config, registryIndex)

      // Show diff for a single component.
      const component = registryIndex.find(
        (item) => item.name === options.component,
      )

      if (!component) {
        p.cancel(
          `The component ${color.green(options.component)} does not exist.`,
        )
        process.exit(1)
        return
      }

      const changes = await diffComponent(component, config)

      if (!changes.length) {
        p.outro(`No updates found for ${color.green(options.component)}.`)
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
  registryIndex: Input<typeof RegistryIndexSchema>,
) {
  const targetDir = config.resolvedPaths.components

  // Find all components that exist in the project
  const projectComponents = registryIndex.filter((item) => {
    for (const file of item.files) {
      const filePath = path.resolve(targetDir, file)
      console.log(targetDir, file)
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
    if (changes.length) {
      componentsWithUpdates.push({
        name: component.name,
        changes,
      })
    }
  }

  if (!componentsWithUpdates.length) {
    p.outro('No updates found.')
    process.exit(0)
  }

  p.outro('The following components have updates available:')
  for (const component of componentsWithUpdates) {
    p.outro(`- ${component.name}`)
    for (const change of component.changes) {
      p.outro(`  - ${change.filePath}`)
    }
  }
  p.outro(`Run ${color.green('diff <component>')} to see the changes.`)
  process.exit(0)
}

async function diffComponent(
  component: Input<typeof RegistryIndexSchema>[number],
  config: Config,
) {
  const payload = await fetchTree([component])

  const changes = []

  for (const item of payload) {
    const targetDir = await getItemTargetPath(config, item)

    if (!targetDir) {
      continue
    }

    for (let i = 0; i < item.files.length; i++) {
      const file = item.files[i]
      const filePath = path.resolve(targetDir, file.name)

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
