import * as v from 'valibot'

export const RegistryItemSchema = v.object({
  name: v.string(),
  dependencies: v.optional(v.array(v.string())),
  registryDependencies: v.optional(v.array(v.string())),
  files: v.array(v.string()),
})

export const RegistryIndexSchema = v.array(RegistryItemSchema)

export const RegistryItemWithContentSchema = v.object({
  ...RegistryItemSchema.entries,
  ...v.object({
    files: v.array(
      v.object({
        name: v.string(),
        type: v.picklist(['components', 'utils']),
        content: v.string(),
      }),
    ),
  }).entries,
})

export const RegistryWithContentSchema = v.array(RegistryItemWithContentSchema)
