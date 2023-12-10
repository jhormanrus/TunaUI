import { existsSync, promises as fs } from 'fs'
import path from 'path'
import { getConfig } from '@/utils/get-config'
import { handleError } from '@/utils/handle-error'
import { logger } from '@/utils/logger'
import { fetchTree, getItemTargetPath, getRegistryBaseColor, getRegistryIndex, resolveTree } from '@/utils/registry'
import chalk from 'chalk'
import { Command } from 'commander'
import * as p from '@clack/prompts'
import { array, boolean, object, optional, parse, string } from 'valibot'

const AddOptionsSchema = object({
  components: optional(array(string())),
  yes: boolean(),
  overwrite: boolean(),
  cwd: string(),
  all: boolean(),
  path: optional(string())
})

export const add = new Command()
  .name('add')
  .description('add a component to your project')
  .argument('[components...]', 'the components to add')
  .option('-y, --yes', 'skip confirmation prompt.', false)
  .option('-o, --overwrite', 'overwrite existing files.', false)
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd()
  )
  .option('-a, --all', 'add all available components.', false)
  .option('-p, --path <path>', 'the path to add the component to.')
  .action(async (components, opts) => {
    try {
      const options = parse(AddOptionsSchema, {
        components,
        ...opts
      })

      const cwd = path.resolve(options.cwd)

      if (!existsSync(cwd)) {
        logger.error(`The path ${cwd} does not exist. Please try again.`)
        process.exit(1)
      }

      const config = await getConfig(cwd)
      if (!config) {
        logger.warn(
          `Configuration is missing. Please run ${chalk.green(
            'init'
          )} to create a components.json file.`
        )
        process.exit(1)
      }

      const registryIndex = await getRegistryIndex()

      let selectedComponents = options.all
        ? registryIndex.map((entry) => entry.name)
        : options.components
      if (!options.components?.length && !options.all) {
        const components = await p.multiselect({
          message: 'Which components would you like to add?',
          options: registryIndex.map((entry) => ({
            value: entry.name,
            label: entry.name
          }))
        })
        if (p.isCancel(components)) {
          p.cancel('Operation cancelled.')
          process.exit(0)
        }
        selectedComponents = components
      }

      if (!selectedComponents?.length) {
        logger.warn('No components selected. Exiting.')
        process.exit(0)
      }

      const tree = await resolveTree(registryIndex, selectedComponents)
      const payload = await fetchTree('default', tree)
      const baseColor = await getRegistryBaseColor('slate')
      console.log(baseColor)

      if (!payload.length) {
        logger.warn('Selected components not found. Exiting.')
        process.exit(0)
      }

      if (!options.yes) {
        const proceed = await p.confirm({
          message: 'Ready to install components and dependencies. Proceed?'
        })
        if (!proceed) process.exit(0)
      }

      const spinner = p.spinner()
      spinner.start('Installing components...')
      for (const item of payload) {
        spinner.message(`Installing ${item.name}...`)
        const targetDir = await getItemTargetPath(
          config,
          item,
          options.path ? path.resolve(cwd, options.path) : undefined
        )

        if (!targetDir) {
          continue
        }

        if (!existsSync(targetDir)) {
          await fs.mkdir(targetDir, { recursive: true })
        }

        const existingComponent = item.files.filter((file) =>
          existsSync(path.resolve(targetDir, file.name))
        )

        if (existingComponent.length && !options.overwrite) {
          if (selectedComponents.includes(item.name)) {
            spinner.stop()
            const overwrite = await p.confirm({
              message: `Component ${item.name} already exists. Would you like to overwrite?`,
              initialValue: false
            })

            if (!overwrite) {
              logger.info(
                `Skipped ${item.name}. To overwrite, run with the ${chalk.green(
                  '--overwrite'
                )} flag.`
              )
              continue
            }

            spinner.start(`Installing ${item.name}...`)
          } else {
            continue
          }
        }

        for (const file of item.files) {
          const filePath = path.resolve(targetDir, file.name)
          await fs.writeFile(filePath, file.content)
        }

        // Install dependencies.
        if (item.dependencies?.length) {
          const proc = Bun.spawn(['bun', 'add', ...item.dependencies], { cwd })
          await proc.exited
        }
      }
      spinner.stop('Done.')
    } catch (error) {
      handleError(error)
    }
  })
