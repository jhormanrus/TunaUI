import path from 'path'
import { resolveImport } from '@/utils/resolve-import'
import { lilconfig } from 'lilconfig'
import { loadConfig } from 'tsconfig-paths'
import {
  type Input,
  boolean,
  coerce,
  fallback,
  merge,
  never,
  object,
  optional,
  parse,
  string,
} from 'valibot'

export const DEFAULT_COMPONENTS = '@/components'
export const DEFAULT_UTILS = '@/utils'
export const DEFAULT_GLOBAL_CSS = 'src/app.css'
export const DEFAULT_MASTERCSS_CONFIG = 'master.css.js'

const explorer = lilconfig('components', {
  searchPlaces: ['components.json'],
})

export const RawConfigSchema = object(
  {
    $schema: optional(string()),
    typescript: coerce(fallback(boolean(), true), Boolean),
    globalCss: string(),
    mastercss: object({
      config: string(),
    }),
    aliases: object({
      components: string(),
      utils: string(),
    }),
  },
  never(),
)

export type RawConfig = Input<typeof RawConfigSchema>

export const ConfigSchema = merge([
  RawConfigSchema,
  object({
    resolvedPaths: object({
      mastercssConfig: string(),
      globalCss: string(),
      utils: string(),
      components: string(),
    }),
  }),
])

export type Config = Input<typeof ConfigSchema>

export async function getConfig(cwd: string): Promise<Config | null> {
  const config = await getRawConfig(cwd)

  if (!config) {
    return null
  }

  return await resolveConfigPaths(cwd, config)
}

export async function resolveConfigPaths(
  cwd: string,
  config: RawConfig,
): Promise<Config> {
  // Read tsconfig.json.
  const tsConfig = loadConfig(cwd)

  if (tsConfig.resultType === 'failed') {
    throw new Error(
      `Failed to load tsconfig.json. ${tsConfig.message ?? ''}`.trim(),
    )
  }

  return parse(ConfigSchema, {
    ...config,
    resolvedPaths: {
      mastercssConfig: path.resolve(cwd, config.mastercss.config),
      globalCss: path.resolve(cwd, config.globalCss),
      utils: await resolveImport(config.aliases.utils, tsConfig),
      components: await resolveImport(config.aliases.components, tsConfig),
    },
  })
}

export async function getRawConfig(cwd: string): Promise<RawConfig | null> {
  try {
    const configResult = await explorer.search(cwd)

    if (!configResult) {
      return null
    }

    return parse(RawConfigSchema, configResult.config)
  } catch {
    throw new Error(`Invalid configuration found in ${cwd}/components.json.`)
  }
}
