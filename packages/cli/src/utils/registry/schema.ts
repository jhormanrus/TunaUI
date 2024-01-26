import { array, merge, object, optional, picklist, string } from 'valibot'

export const RegistryItemSchema = object({
  name: string(),
  dependencies: optional(array(string())),
  registryDependencies: optional(array(string())),
  files: array(string()),
})

export const RegistryIndexSchema = array(RegistryItemSchema)

export const RegistryItemWithContentSchema = merge([
  RegistryItemSchema,
  object({
    files: array(
      object({
        name: string(),
        type: picklist(['classVariants', 'components', 'utils']),
        content: string(),
      }),
    ),
  }),
])

export const RegistryWithContentSchema = array(RegistryItemWithContentSchema)
