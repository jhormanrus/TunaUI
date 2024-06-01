import { existsSync } from 'node:fs'
import path from 'node:path'
import { styleText } from 'node:util'
import { type Config, getConfig } from '@/utils/get-config'
import { handleError } from '@/utils/handle-error'
import { onCancel, printIntro, validateCwd } from '@/utils/prompt'
import { fetchTree, getRegistryIndex, resolveTree } from '@/utils/registry'
import type {
  RegistryItemWithContentSchema,
  RegistryWithContentSchema,
} from '@/utils/registry/schema'
import * as p from '@clack/prompts'
import { Command } from 'commander'
import * as v from 'valibot'

const addComponentSpinner = p.spinner()

const AddOptionsSchema = v.object({
  components: v.array(v.string()),
  yes: v.boolean(),
  overwrite: v.boolean(),
  cwd: v.string(),
  all: v.boolean(),
  path: v.optional(v.string()),
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

      const options = v.parse(AddOptionsSchema, {
        components,
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

      const payload = await promptToSelectComponents(options)

      if (!options.yes) {
        const proceed = await p.confirm({
          message: 'Ready to install components and dependencies. Proceed?',
        })
        if (!proceed) {
          onCancel()
        }
      }

      await runAdd(cwd, config, options, payload)

      p.outro(`${styleText('green', 'Success!')} Components installed.`)
    } catch (error) {
      handleError(error)
    }
  })

async function promptToSelectComponents(
  options: v.InferInput<typeof AddOptionsSchema>,
): Promise<v.InferInput<typeof RegistryWithContentSchema>> {
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
      onCancel()
    }
    selectedComponents = v.parse(v.array(v.string()), components)
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
  options: v.InferInput<typeof AddOptionsSchema>,
  payload: v.InferInput<typeof RegistryWithContentSchema>,
): Promise<void> {
  for (const item of payload) {
    const existingComponent = item.files.filter((file) =>
      existsSync(path.resolve(config.resolvedPaths[file.type], file.name)),
    )

    if (existingComponent.length && !options.overwrite) {
      const overwrite = await promptForOverwrite(item)
      if (!overwrite) {
        continue
      }
    } else {
      addComponentSpinner.start(
        `Installing component ${styleText('yellow', item.name)}`,
      )
    }

    for (const file of item.files) {
      const filePath = path.resolve(config.resolvedPaths[file.type], file.name)
      await Bun.write(filePath, file.content)
    }

    // Install dependencies.
    if (item.dependencies?.length) {
      const proc = Bun.spawn(['bun', 'add', ...item.dependencies], { cwd })
      await proc.exited
    }

    addComponentSpinner.stop(
      `Installed component ${styleText('yellow', item.name)}.`,
    )
  }
}

async function promptForOverwrite(
  item: v.InferInput<typeof RegistryItemWithContentSchema>,
) {
  const overwrite = await p.confirm({
    message: `Would you like to overwrite component ${item.name}?`,
    initialValue: false,
  })

  addComponentSpinner.start(
    `Installing component ${styleText('yellow', item.name)}`,
  )
  if (!overwrite) {
    addComponentSpinner.stop(
      `Skipped component ${styleText('yellow', item.name)}.`,
    )
  }

  return overwrite
}
