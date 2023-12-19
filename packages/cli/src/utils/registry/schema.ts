import {
  array,
  merge,
  object,
  optional,
  picklist,
  record,
  string,
} from 'valibot'

// TODO: Extract this to a shared package.
export const RegistryItemSchema = object({
  name: string(),
  dependencies: optional(array(string())),
  registryDependencies: optional(array(string())),
  files: array(string()),
  type: picklist([
    'components:ui',
    'components:component',
    'components:example',
  ]),
})

export const RegistryIndexSchema = array(RegistryItemSchema)

export const RegistryItemWithContentSchema = merge([
  RegistryItemSchema,
  object({
    files: array(
      object({
        name: string(),
        content: string(),
      }),
    ),
  }),
])

export const RegistryWithContentSchema = array(RegistryItemWithContentSchema)

export const RegistryBaseColorSchema = object({
  inlineColors: object({
    light: record(string(), string()),
    dark: record(string(), string()),
  }),
  cssVars: object({
    light: record(string(), string()),
    dark: record(string(), string()),
  }),
  inlineColorsTemplate: string(),
  cssVarsTemplate: string(),
})
