import path from 'path'
import { resolveImport } from '@/src/utils/resolve-import'
import { loadConfig } from 'tsconfig-paths'
import { type Input, boolean, coerce, fallback, merge, object, optional, parse, strict, string } from 'valibot'
import { lilconfig } from 'lilconfig'

export const DEFAULT_COMPONENTS = '@/components'
export const DEFAULT_UTILS = '@/lib/utils'
export const DEFAULT_GLOBAL_CSS = 'src/globals.css'
export const DEFAULT_MASTERCSS_CONFIG = 'master.css.js'

const explorer = lilconfig('components', {
  searchPlaces: ['components.json']
})

export const RawConfigSchema = strict(object({
  $schema: optional(string()),
  typescript: coerce(fallback(boolean(), true), Boolean),
  globalCss: string(),
  mastercss: object({
    config: string(),
    cssVariables: fallback(boolean(), true)
  }),
  aliases: object({
    components: string(),
    utils: string()
  })
}))

export type RawConfig = Input<typeof RawConfigSchema>

export const ConfigSchema = merge([RawConfigSchema, object({
  resolvedPaths: object({
    mastercssConfig: string(),
    globalCss: string(),
    utils: string(),
    components: string()
  })
})])

export type Config = Input<typeof ConfigSchema>

export async function getConfig (cwd: string): Promise<Config | null> {
  const config = await getRawConfig(cwd)

  if (!config) {
    return null
  }

  return await resolveConfigPaths(cwd, config)
}

export async function resolveConfigPaths (cwd: string, config: RawConfig): Promise<Config> {
  // Read tsconfig.json.
  const tsConfig = loadConfig(cwd)

  if (tsConfig.resultType === 'failed') {
    throw new Error(
      `Failed to load tsconfig.json. ${tsConfig.message ?? ''}`.trim()
    )
  }

  return parse(ConfigSchema, {
    ...config,
    resolvedPaths: {
      mastercssConfig: path.resolve(cwd, config.mastercss.config),
      globalCss: path.resolve(cwd, config.globalCss),
      utils: await resolveImport(config.aliases.utils, tsConfig),
      components: await resolveImport(config.aliases.components, tsConfig)
    }
  })
}

export async function getRawConfig (cwd: string): Promise<RawConfig | null> {
  try {
    const configResult = await explorer.search(cwd)

    if (!configResult) {
      return null
    }

    return parse(RawConfigSchema, configResult.config)
  } catch (error) {
    throw new Error(`Invalid configuration found in ${cwd}/components.json.`)
  }
}
