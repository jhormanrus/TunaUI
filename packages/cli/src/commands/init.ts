import { existsSync, promises as fs } from "fs"
import path from "path"
import {
  DEFAULT_COMPONENTS,
  DEFAULT_GLOBAL_CSS,
  DEFAULT_MASTERCSS_CONFIG,
  DEFAULT_UTILS,
  getConfig,
  RawConfigSchema,
  resolveConfigPaths,
  type Config,
} from "@/src/utils/get-config"
import { handleError } from "@/src/utils/handle-error"
import { logger } from "@/src/utils/logger"
import { getRegistryBaseColor } from "@/src/utils/registry"
import * as templates from "@/src/utils/templates"
import chalk from "chalk"
import { Command } from "commander"
import template from "lodash.template"
import ora from "ora"
import prompts from "prompts"
import { boolean, object, parse, string } from 'valibot'

const PROJECT_DEPENDENCIES = [
  "class-variance-authority",
]

const InitOptionsSchema = object({
  cwd: string(),
  yes: boolean(),
})

export const init = new Command()
  .name("init")
  .description("initialize your project and install dependencies")
  .option("-y, --yes", "skip confirmation prompt.", false)
  .option(
    "-c, --cwd <cwd>",
    "the working directory. defaults to the current directory.",
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

      logger.break()
      logger.info(`${chalk.green("Success!")} Project initialization completed.`)
      logger.break()
    } catch (error) {
      handleError(error)
    }
  })

export async function promptForConfig(cwd: string, defaultConfig: Config | null = null, skip = false) {
  const highlight = (text: string) => chalk.yellow(text)

  const options = await prompts([
    {
      type: "toggle",
      name: "typescript",
      message: `Would you like to use ${highlight(
        "TypeScript"
      )} (recommended)?`,
      initial: defaultConfig?.typescript ?? true,
      active: "yes",
      inactive: "no",
    },
    {
      type: "text",
      name: "globalCss",
      message: `Where is your ${highlight("global CSS")} file?`,
      initial: defaultConfig?.globalCss ?? DEFAULT_GLOBAL_CSS,
    },
    {
      type: "toggle",
      name: "mastercssCssVariables",
      message: `Would you like to use ${highlight(
        "CSS variables"
      )} for colors?`,
      initial: defaultConfig?.mastercss.cssVariables ?? false,
      active: "yes",
      inactive: "no",
    },
    {
      type: "text",
      name: "mastercssConfig",
      message: `Where is your ${highlight("master.css.js")} located?`,
      initial: defaultConfig?.mastercss.config ?? DEFAULT_MASTERCSS_CONFIG,
    },
    {
      type: "text",
      name: "components",
      message: `Configure the import alias for ${highlight("components")}:`,
      initial: defaultConfig?.aliases["components"] ?? DEFAULT_COMPONENTS,
    },
    {
      type: "text",
      name: "utils",
      message: `Configure the import alias for ${highlight("utils")}:`,
      initial: defaultConfig?.aliases["utils"] ?? DEFAULT_UTILS,
    },
  ])

  const config = parse(RawConfigSchema, {
    globalCss: options.globalCss,
    mastercss: {
      config: options.mastercssConfig,
      cssVariables: options.mastercssCssVariables,
    },
    typescript: options.typescript,
    aliases: {
      utils: options.utils,
      components: options.components,
    },
  })

  if (!skip) {
    const { proceed } = await prompts({
      type: "confirm",
      name: "proceed",
      message: `Write configuration to ${highlight(
        "components.json"
      )}. Proceed?`,
      initial: true,
    })

    if (!proceed) {
      process.exit(0)
    }
  }

  // Write to file.
  logger.break()
  const spinner = ora(`Writing components.json...`).start()
  const targetPath = path.resolve(cwd, "components.json")
  await fs.writeFile(targetPath, JSON.stringify(config, null, 2), "utf8")
  spinner.succeed()

  return await resolveConfigPaths(cwd, config)
}

export async function runInit(cwd: string, config: Config) {
  const spinner = ora(`Initializing project...`)?.start()

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
    if (key === "utils" && resolvedPath.endsWith("/utils")) {
      // Remove /utils at the end.
      dirname = dirname.replace(/\/utils$/, "")
    }

    if (!existsSync(dirname)) {
      await fs.mkdir(dirname, { recursive: true })
    }
  }

  const extension = config.typescript ? "ts" : "js"

  // Write mastercss config.
  await fs.writeFile(
    config.resolvedPaths.mastercssConfig,
    config.mastercss.cssVariables
      ? template(templates.MASTERCSS_CONFIG_WITH_VARIABLES)({ extension })
      : template(templates.MASTERCSS_CONFIG)({ extension }),
    "utf8"
  )

  // Write css file.
  const baseColor = await getRegistryBaseColor('slate')
  if (baseColor) {
    await fs.writeFile(
      config.resolvedPaths.globalCss,
      config.mastercss.cssVariables
        ? baseColor.cssVarsTemplate
        : baseColor.inlineColorsTemplate,
      "utf8"
    )
  }

  // Write cn file.
  await fs.writeFile(
    `${config.resolvedPaths.utils}.${extension}`,
    extension === "ts" ? templates.UTILS : templates.UTILS_JS,
    "utf8"
  )

  spinner?.succeed()

  // Install dependencies.
  const dependenciesSpinner = ora(`Installing dependencies...`)?.start()

  const proc = Bun.spawn(['bun', 'add', ...PROJECT_DEPENDENCIES], { cwd })
  await proc.exited
  dependenciesSpinner?.succeed()
}
