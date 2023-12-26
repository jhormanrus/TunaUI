import { array, merge, object, optional, picklist, string } from 'valibot'

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
