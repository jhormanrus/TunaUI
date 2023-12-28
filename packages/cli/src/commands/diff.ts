import { existsSync, promises as fs } from 'fs'
import path from 'path'
import { Config, getConfig } from '@/utils/get-config'
import { handleError } from '@/utils/handle-error'
import { validateCwd } from '@/utils/prompt'
import {
  fetchTree,
  getItemTargetPath,
  getRegistryIndex,
} from '@/utils/registry'
import { RegistryIndexSchema } from '@/utils/registry/schema'
import { transform } from '@/utils/transformers'
import * as p from '@clack/prompts'
import { Command } from 'commander'
import { type Change, diffLines } from 'diff'
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

      if (!options.component) {
        const targetDir = config.resolvedPaths.components

        // Find all components that exist in the project.
        const projectComponents = registryIndex.filter((item) => {
          for (const file of item.files) {
            const filePath = path.resolve(targetDir, file)
            if (existsSync(filePath)) {
              return true
            }
          }

          return false
        })

        // Check for updates.
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

      // Show diff for a single component.
      const component = registryIndex.find(
        (item) => item.name === options.component,
      )

      if (!component) {
        p.cancel(
          `The component ${color.green(options.component)} does not exist.`,
        )
        process.exit(1)
      }

      const changes = await diffComponent(component, config)

      if (!changes.length) {
        p.outro(`No updates found for ${options.component}.`)
        process.exit(0)
      }

      for (const change of changes) {
        p.outro(`- ${change.filePath}`)
        await printDiff(change.patch)
      }
    } catch (error) {
      handleError(error)
    }
  })

async function diffComponent(
  component: Input<typeof RegistryIndexSchema>[number],
  config: Config,
) {
  const payload = await fetchTree(config.style, [component])

  const changes = []

  for (const item of payload) {
    const targetDir = await getItemTargetPath(config, item)

    if (!targetDir) {
      continue
    }

    for (const file of item.files) {
      const filePath = path.resolve(targetDir, file.name)

      if (!existsSync(filePath)) {
        continue
      }

      const fileContent = await fs.readFile(filePath, 'utf8')

      const registryContent = await transform({
        filename: file.name,
        raw: file.content,
        config,
      })

      const patch = diffLines(registryContent as string, fileContent)
      if (patch.length > 1) {
        changes.push({
          file: file.name,
          filePath,
          patch,
        })
      }
    }
  }

  return changes
}

async function printDiff(diff: Change[]) {
  for (const part of diff) {
    if (part) {
      if (part.added) {
        return process.stdout.write(color.green(part.value))
      }
      if (part.removed) {
        return process.stdout.write(color.red(part.value))
      }

      return process.stdout.write(part.value)
    }
  }
}
