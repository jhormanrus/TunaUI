import { existsSync, promises as fs } from 'fs'
import path from 'path'
import { type Config, getConfig } from '@/utils/get-config'
import { handleError } from '@/utils/handle-error'
import { logger } from '@/utils/logger'
import {
  fetchTree,
  getItemTargetPath,
  getRegistryBaseColor,
  getRegistryIndex,
  resolveTree,
} from '@/utils/registry'
import {
  RegistryItemWithContentSchema,
  RegistryWithContentSchema,
} from '@/utils/registry/schema'
import * as p from '@clack/prompts'
import { Command } from 'commander'
import color from 'picocolors'
import { Input, array, boolean, object, optional, parse, string } from 'valibot'

const addComponentSpinner = p.spinner()

const AddOptionsSchema = object({
  components: array(string()),
  yes: boolean(),
  overwrite: boolean(),
  cwd: string(),
  all: boolean(),
  path: optional(string()),
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
    process.cwd(),
  )
  .option('-a, --all', 'add all available components.', false)
  .option('-p, --path <path>', 'the path to add the component to.')
  .action(async (components, opts) => {
    try {
      const options = parse(AddOptionsSchema, {
        components,
        ...opts,
      })

      const cwd = path.resolve(options.cwd)

      if (!existsSync(cwd)) {
        logger.error(`The path ${cwd} does not exist. Please try again.`)
        process.exit(1)
      }

      const config = await getConfig(cwd)
      if (!config) {
        logger.warn(
          `Configuration is missing. Please run ${color.green(
            'init',
          )} to create a components.json file.`,
        )
        process.exit(1)
        return
      }

      const payload = await promptToSelectComponents(options)

      if (!options.yes) {
        const proceed = await p.confirm({
          message: 'Ready to install components and dependencies. Proceed?',
        })
        if (!proceed) process.exit(0)
      }

      await runAdd(cwd, config, options, payload)
    } catch (error) {
      handleError(error)
    }
  })

async function promptToSelectComponents(
  options: Input<typeof AddOptionsSchema>,
): Promise<Input<typeof RegistryWithContentSchema>> {
  const registryIndex = await getRegistryIndex()

  let selectedComponents = options.all
    ? registryIndex.map((entry) => entry.name)
    : options.components

  if (!(options.components.length || options.all)) {
    const components = await p.multiselect({
      message: 'Which components would you like to add?',
      options: registryIndex.map((entry) => ({
        value: entry.name,
        label: entry.name,
      })),
    })
    if (p.isCancel(components)) {
      p.cancel('Operation cancelled.')
      process.exit(0)
    }
    selectedComponents = components as string[]
  }

  const tree = await resolveTree(registryIndex, selectedComponents)
  const payload = await fetchTree(tree)
  // const baseColor = await getRegistryBaseColor()
  // console.log(baseColor)

  if (!payload.length) {
    logger.warn('Selected components not found. Exiting.')
    process.exit(0)
  }

  return payload
}

async function runAdd(
  cwd: string,
  config: Config,
  options: Input<typeof AddOptionsSchema>,
  payload: Input<typeof RegistryWithContentSchema>,
): Promise<void> {
  addComponentSpinner.start('Installing components')

  for (const item of payload) {
    const targetDir = await getItemTargetPath(
      config,
      item,
      options.path ? path.resolve(cwd, options.path) : undefined,
    )

    if (!targetDir) continue

    const existingComponent = item.files.filter((file) =>
      existsSync(path.resolve(targetDir, file.name)),
    )

    if (existingComponent.length && !options.overwrite) {
      const overwrite = await promptForOverwrite(item)
      if (!overwrite) continue
    }

    for (const file of item.files) {
      const filePath = path.resolve(targetDir, file.name)
      await Bun.write(filePath, file.content)
    }

    // Install dependencies.
    if (item.dependencies?.length) {
      const proc = Bun.spawn(['bun', 'add', ...item.dependencies], { cwd })
      await proc.exited
    }
  }
  addComponentSpinner.stop('Done.')
}

async function promptForOverwrite(
  item: Input<typeof RegistryItemWithContentSchema>,
) {
  addComponentSpinner.stop(`Component ${item.name} already exists.`)

  const overwrite = await p.confirm({
    message: `Would you like to overwrite component ${item.name}?`,
    initialValue: false,
  })

  addComponentSpinner.start(`Installing ${item.name}`)
  if (!overwrite) {
    addComponentSpinner.stop(`Skipped ${item.name}.`)
  }

  return overwrite
}
