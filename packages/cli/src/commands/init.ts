import { existsSync, promises as fs } from 'fs'
import path from 'path'
import {
  type Config,
  DEFAULT_COMPONENTS,
  DEFAULT_GLOBAL_CSS,
  DEFAULT_MASTERCSS_CONFIG,
  DEFAULT_UTILS,
  RawConfigSchema,
  getConfig,
  resolveConfigPaths,
} from '@/utils/get-config'
import { handleError } from '@/utils/handle-error'
import { logger } from '@/utils/logger'
import { getMastercssConfig } from '@/utils/registry'
// import { getRegistryBaseColor } from '@/utils/registry'
import * as p from '@clack/prompts'
import { Command } from 'commander'
import color from 'picocolors'
import { boolean, object, parse, string } from 'valibot'

const PROJECT_DEPENDENCIES = ['class-variant']

const InitOptionsSchema = object({
  cwd: string(),
  yes: boolean(),
})

const projectInitSpinner = p.spinner()

export const init = new Command()
  .name('init')
  .description('initialize your project and install dependencies')
  .option('-y, --yes', 'skip confirmation prompt.', false)
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd(),
  )
  .action(async (opts) => {
    try {
      const options = parse(InitOptionsSchema, opts)
      const cwd = path.resolve(options.cwd)

      // Ensure target directory exists.
      if (!existsSync(cwd)) {
        logger.error(`The path ${cwd} does not exist. Please try again.`)
        process.exit(1)
      }

      // Read config.
      const existingConfig = await getConfig(cwd)
      const config = await promptForConfig(cwd, existingConfig, options.yes)

      await runInit(cwd, config)

      projectInitSpinner.stop(
        `${color.green('Success!')} Project initialization completed.`,
      )
    } catch (error) {
      handleError(error)
    }
  })

export async function promptForConfig(
  cwd: string,
  defaultConfig: Config | null = null,
  skip = false,
): Promise<Config> {
  const highlight = (text: string): string => color.yellow(text)

  p.intro(`${color.bgCyan(color.bold(color.black(' TunaUI ')))}`)

  const options = await p.group(
    {
      typescript: async () =>
        await p.confirm({
          message: `Would you like to use ${highlight(
            'TypeScript',
          )} (recommended)?`,
          initialValue: defaultConfig?.typescript ?? true,
        }),
      globalCss: async () =>
        await p.text({
          message: `Where is your ${highlight('global CSS')} file?`,
          defaultValue: defaultConfig?.globalCss ?? DEFAULT_GLOBAL_CSS,
          placeholder: defaultConfig?.globalCss ?? DEFAULT_GLOBAL_CSS,
        }),
      mastercssConfig: async () =>
        await p.text({
          message: `Where is your ${highlight('master.css.js')} located?`,
          defaultValue:
            defaultConfig?.mastercss.config ?? DEFAULT_MASTERCSS_CONFIG,
          placeholder:
            defaultConfig?.mastercss.config ?? DEFAULT_MASTERCSS_CONFIG,
        }),
      components: async () =>
        await p.text({
          message: `Configure the import alias for ${highlight('components')}:`,
          defaultValue: defaultConfig?.aliases.components ?? DEFAULT_COMPONENTS,
          placeholder: defaultConfig?.aliases.components ?? DEFAULT_COMPONENTS,
        }),
      utils: async () =>
        await p.text({
          message: `Configure the import alias for ${highlight('utils')}:`,
          defaultValue: defaultConfig?.aliases.utils ?? DEFAULT_UTILS,
          placeholder: defaultConfig?.aliases.utils ?? DEFAULT_UTILS,
        }),
    },
    {
      onCancel: () => {
        p.cancel('Operation cancelled.')
        process.exit(0)
      },
    },
  )

  const config = parse(RawConfigSchema, {
    $schema: 'https://tuna-ui.vercel.app/schema.json',
    globalCss: options.globalCss,
    mastercss: {
      config: options.mastercssConfig,
    },
    typescript: options.typescript,
    aliases: {
      utils: options.utils,
      components: options.components,
    },
  })

  if (!skip) {
    const proceed = await p.confirm({
      message: `Write configuration to ${highlight(
        'components.json',
      )}. Proceed?`,
    })
    if (!proceed) process.exit(0)
  }

  // Write to file.
  projectInitSpinner.start(`Writing ${highlight('components.json')}...`)
  const targetPath = path.resolve(cwd, 'components.json')
  await Bun.write(targetPath, JSON.stringify(config, null, 2))

  return await resolveConfigPaths(cwd, config)
}

export async function runInit(cwd: string, config: Config): Promise<void> {
  projectInitSpinner.message('Initializing project')

  // Ensure all resolved paths directories exist.
  for (const [key, resolvedPath] of Object.entries(config.resolvedPaths)) {
    // Determine if the path is a file or directory.
    // TODO: is there a better way to do this?
    let dirname = path.extname(resolvedPath)
      ? path.dirname(resolvedPath)
      : resolvedPath

    // If the utils alias is set to something like "@/lib/utils",
    // assume this is a file and remove the "utils" file name.
    // TODO: In future releases we should add support for individual utils.
    if (key === 'utils' && resolvedPath.endsWith('/utils')) {
      // Remove /utils at the end.
      dirname = dirname.replace(/\/utils$/, '')
    }

    if (!existsSync(dirname)) {
      await fs.mkdir(dirname, { recursive: true })
    }
  }

  // Write mastercss config.
  const mastercssConfig = await getMastercssConfig()
  await Bun.write(config.resolvedPaths.mastercssConfig, mastercssConfig)

  // Write css file.
  // const baseColor = await getRegistryBaseColor('slate')
  // if (baseColor) {
  //   await fs.writeFile(
  //     config.resolvedPaths.globalCss,
  //     baseColor.inlineColorsTemplate,
  //     'utf8'
  //   )
  // }

  // Install dependencies.
  projectInitSpinner.message('Installing dependencies')
  const proc = Bun.spawn(['bun', 'add', '--silent', ...PROJECT_DEPENDENCIES], {
    cwd,
  })
  await proc.exited
}
