import { existsSync } from 'fs'
import path from 'path'
import { type Config, getConfig } from '@/utils/get-config'
import { handleError } from '@/utils/handle-error'
import { onCancel, printIntro, validateCwd } from '@/utils/prompt'
import {
  fetchTree,
  getItemTargetPath,
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
      printIntro()

      const options = parse(AddOptionsSchema, {
        components,
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

      const payload = await promptToSelectComponents(options)

      if (!options.yes) {
        const proceed = await p.confirm({
          message: 'Ready to install components and dependencies. Proceed?',
        })
        if (!proceed) onCancel()
      }

      await runAdd(cwd, config, options, payload)

      p.outro(`${color.green('Success!')} Components installed.`)
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
    if (p.isCancel(components)) onCancel()
    selectedComponents = parse(array(string()), components)
  }

  const tree = await resolveTree(registryIndex, selectedComponents)
  const payload = await fetchTree(tree)

  if (!payload.length) {
    p.cancel('Selected components not found. Exiting.')
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
    } else {
      addComponentSpinner.start(
        `Installing component ${color.yellow(item.name)}`,
      )
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

    addComponentSpinner.stop(`Installed component ${color.yellow(item.name)}.`)
  }
}

async function promptForOverwrite(
  item: Input<typeof RegistryItemWithContentSchema>,
) {
  const overwrite = await p.confirm({
    message: `Would you like to overwrite component ${item.name}?`,
    initialValue: false,
  })

  addComponentSpinner.start(`Installing component ${color.yellow(item.name)}`)
  if (!overwrite) {
    addComponentSpinner.stop(`Skipped component ${color.yellow(item.name)}.`)
  }

  return overwrite
}
