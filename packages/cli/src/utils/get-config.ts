import path from 'node:path'
import { resolveImport } from '@/utils/resolve-import'
import { lilconfig } from 'lilconfig'
import { loadConfig } from 'tsconfig-paths'
import * as v from 'valibot'

export const DEFAULT_COMPONENTS = '@/components'
export const DEFAULT_UTILS = '@/utils'
export const DEFAULT_GLOBAL_CSS = 'src/app.css'
export const DEFAULT_MASTERCSS_CONFIG = 'master.css.ts'

const explorer = lilconfig('components', {
  searchPlaces: ['components.json'],
})

export const RawConfigSchema = v.strictObject(
  {
    $schema: v.optional(v.string()),
    typescript: v.pipe(v.fallback(v.boolean(), true), v.transform(input => Boolean(input))),
    globalCss: v.string(),
    mastercss: v.object({
      config: v.string(),
    }),
    aliases: v.object({
      components: v.string(),
      utils: v.string(),
    }),
  }
)

export type RawConfig = v.InferInput<typeof RawConfigSchema>

export const ConfigSchema = v.object({
  ...RawConfigSchema.entries,
  ...v.object({
    resolvedPaths: v.object({
      mastercssConfig: v.string(),
      globalCss: v.string(),
      components: v.string(),
      utils: v.string(),
    }),
  }).entries,
})

export type Config = v.InferInput<typeof ConfigSchema>

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

  return v.parse(ConfigSchema, {
    ...config,
    resolvedPaths: {
      mastercssConfig: path.resolve(cwd, config.mastercss.config),
      globalCss: path.resolve(cwd, config.globalCss),
      components: await resolveImport(config.aliases.components, tsConfig),
      utils: await resolveImport(config.aliases.utils, tsConfig),
    },
  })
}

export async function getRawConfig(cwd: string): Promise<RawConfig | null> {
  try {
    const configResult = await explorer.search(cwd)

    if (!configResult) {
      return null
    }

    return v.parse(RawConfigSchema, configResult.config)
  } catch {
    throw new Error(`Invalid configuration found in ${cwd}/components.json.`)
  }
}
