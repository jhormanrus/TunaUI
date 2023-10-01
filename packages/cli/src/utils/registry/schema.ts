import { array, enumType, merge, object, optional, record, string } from "valibot"

// TODO: Extract this to a shared package.
export const registryItemSchema = object({
  name: string(),
  dependencies: optional(array(string())),
  registryDependencies: optional(array(string())),
  files: array(string()),
  type: enumType(["components:ui", "components:component", "components:example"]),
})

export const registryIndexSchema = array(registryItemSchema)

export const registryItemWithContentSchema = merge([registryItemSchema, object({
  files: array(
    object({
      name: string(),
      content: string(),
    })
  ),
})])

export const registryWithContentSchema = array(registryItemWithContentSchema)

export const registryBaseColorSchema = object({
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
