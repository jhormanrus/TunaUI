import { existsSync, promises as fs } from 'fs'
import path from 'path'
import { DEFAULT_COMPONENTS, DEFAULT_GLOBAL_CSS, DEFAULT_MASTERCSS_CONFIG, DEFAULT_UTILS, getConfig, RawConfigSchema, resolveConfigPaths, type Config } from '@/utils/get-config'
import { handleError } from '@/utils/handle-error'
import { logger } from '@/utils/logger'
// import { getRegistryBaseColor } from '@/utils/registry'
import * as templates from '@/utils/templates'
import chalk from 'chalk'
import { Command } from 'commander'
import template from 'lodash.template'
import { boolean, object, parse, string } from 'valibot'
import * as p from '@clack/prompts'

const PROJECT_DEPENDENCIES = [
  'class-variant'
]

const InitOptionsSchema = object({
  cwd: string(),
  yes: boolean()
})

export const init = new Command()
  .name('init')
  .description('initialize your project and install dependencies')
  .option('-y, --yes', 'skip confirmation prompt.', false)
  .option(
    '-c, --cwd <cwd>',
    'the working directory. defaults to the current directory.',
    process.cwd()
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

      logger.info(`${chalk.green('Success!')} Project initialization completed.`)
    } catch (error) {
      handleError(error)
    }
  })

export async function promptForConfig (cwd: string, defaultConfig: Config | null = null, skip = false): Promise<Config> {
  const highlight = (text: string): string => chalk.yellow(text)

  const options = await p.group(
    {
      typescript: async () => await p.confirm({
        message: `Would you like to use ${highlight('TypeScript')} (recommended)?`,
        initialValue: defaultConfig?.typescript ?? true
      }),
      globalCss: async () => await p.text({
        message: `Where is your ${highlight('global CSS')} file?`,
        defaultValue: defaultConfig?.globalCss ?? DEFAULT_GLOBAL_CSS,
        placeholder: defaultConfig?.globalCss ?? DEFAULT_GLOBAL_CSS
      }),
      mastercssCssVariables: async () => await p.select({
        message: `Would you like to use ${highlight('CSS variables')} for colors?`,
        options: [
          { value: true, label: 'Yes' },
          { value: false, label: 'No' }
        ],
        initialValue: defaultConfig?.mastercss.cssVariables ?? false
      }),
      mastercssConfig: async () => await p.text({
        message: `Where is your ${highlight('master.css.js')} located?`,
        defaultValue: defaultConfig?.mastercss.config ?? DEFAULT_MASTERCSS_CONFIG,
        placeholder: defaultConfig?.mastercss.config ?? DEFAULT_MASTERCSS_CONFIG
      }),
      components: async () => await p.text({
        message: `Configure the import alias for ${highlight('components')}:`,
        defaultValue: defaultConfig?.aliases.components ?? DEFAULT_COMPONENTS,
        placeholder: defaultConfig?.aliases.components ?? DEFAULT_COMPONENTS
      }),
      utils: async () => await p.text({
        message: `Configure the import alias for ${highlight('utils')}:`,
        defaultValue: defaultConfig?.aliases.utils ?? DEFAULT_UTILS,
        placeholder: defaultConfig?.aliases.utils ?? DEFAULT_UTILS
      })
    },
    {
      onCancel: () => {
        p.cancel('Operation cancelled.')
        process.exit(0)
      }
    }
  )

  const config = parse(RawConfigSchema, {
    $schema: 'https://ui.shadcn.com/schema.json',
    globalCss: options.globalCss,
    mastercss: {
      config: options.mastercssConfig,
      cssVariables: options.mastercssCssVariables
    },
    typescript: options.typescript,
    aliases: {
      utils: options.utils,
      components: options.components
    }
  })

  if (!skip) {
    const proceed = await p.confirm({
      message: `Write configuration to ${highlight('components.json')}. Proceed?`
    })
    if (!proceed) process.exit(0)
  }

  // Write to file.
  const spinner = p.spinner()
  spinner.start('Writing components.json...')
  const targetPath = path.resolve(cwd, 'components.json')
  await fs.writeFile(targetPath, JSON.stringify(config, null, 2), 'utf8')
  spinner.stop('components.json written successfully.')

  return await resolveConfigPaths(cwd, config)
}

export async function runInit (cwd: string, config: Config): Promise<void> {
  const spinner = p.spinner()
  spinner.start('Initializing project...')

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

  const extension = config.typescript ? 'ts' : 'js'

  // Write mastercss config.
  await fs.writeFile(
    config.resolvedPaths.mastercssConfig,
    config.mastercss.cssVariables
      ? template(templates.MASTERCSS_CONFIG_WITH_VARIABLES)({ extension })
      : template(templates.MASTERCSS_CONFIG)({ extension }),
    'utf8'
  )

  // Write css file.
  // const baseColor = await getRegistryBaseColor('slate')
  // if (baseColor) {
  //   await fs.writeFile(
  //     config.resolvedPaths.globalCss,
  //     config.mastercss.cssVariables
  //       ? baseColor.cssVarsTemplate
  //       : baseColor.inlineColorsTemplate,
  //     'utf8'
  //   )
  // }

  // Write cn file.
  await fs.writeFile(
    `${config.resolvedPaths.utils}.${extension}`,
    extension === 'ts' ? templates.UTILS : templates.UTILS_JS,
    'utf8'
  )

  spinner.stop('Project initialized successfully.')

  // Install dependencies.
  const dependenciesSpinner = p.spinner()
  dependenciesSpinner.start('Installing dependencies...')
  const proc = Bun.spawn(['bun', 'add', ...PROJECT_DEPENDENCIES], { cwd })
  await proc.exited
  dependenciesSpinner.stop('Dependencies installed successfully.')
}
