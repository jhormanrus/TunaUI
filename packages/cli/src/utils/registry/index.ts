import path from 'path'
import { type Config } from '@/src/utils/get-config'
import {
  RegistryBaseColorSchema,
  RegistryIndexSchema,
  type RegistryItemWithContentSchema,
  RegistryWithContentSchema
} from '@/src/utils/registry/schema'
import { type Input, parse } from 'valibot'

const baseUrl = process.env.COMPONENTS_REGISTRY_URL ?? ''

export async function getRegistryIndex (): Promise<Input<typeof RegistryIndexSchema>> {
  try {
    const [result] = await fetchRegistry(['index.json'])

    return parse(RegistryIndexSchema, result)
  } catch (error) {
    throw new Error('Failed to fetch components from registry.')
  }
}

export async function getRegistryBaseColor (baseColor: string): Promise<Input<typeof RegistryBaseColorSchema>> {
  try {
    const [result] = await fetchRegistry([`colors/${baseColor}.json`])

    return parse(RegistryBaseColorSchema, result)
  } catch (error) {
    throw new Error('Failed to fetch base color from registry.')
  }
}

export async function resolveTree (index: Input<typeof RegistryIndexSchema>, names: string[]): Promise<Input<typeof RegistryIndexSchema>> {
  const tree: Input<typeof RegistryIndexSchema> = []

  for (const name of names) {
    const entry = index.find((entry) => entry.name === name)

    if (!entry) {
      continue
    }

    tree.push(entry)

    if (entry.registryDependencies) {
      const dependencies = await resolveTree(index, entry.registryDependencies)
      tree.push(...dependencies)
    }
  }

  return tree.filter(
    (component, index, self) =>
      self.findIndex((c) => c.name === component.name) === index
  )
}

export async function fetchTree (style: string, tree: Input<typeof RegistryIndexSchema>): Promise<Input<typeof RegistryWithContentSchema>> {
  try {
    const paths = tree.map((item) => `styles/${style}/${item.name}.json`)
    const result = await fetchRegistry(paths)

    return parse(RegistryWithContentSchema, result)
  } catch (error) {
    throw new Error('Failed to fetch tree from registry.')
  }
}

export async function getItemTargetPath (
  config: Config,
  item: Pick<Input<typeof RegistryItemWithContentSchema>, 'type'>,
  override?: string
): Promise<string | null> {
  // Allow overrides for all items but ui.
  if (override && item.type !== 'components:ui') {
    return override
  }

  const [parent, type] = item.type.split(':')
  if (!(parent in config.resolvedPaths)) {
    return null
  }

  return path.join(
    config.resolvedPaths[parent as keyof typeof config.resolvedPaths],
    type
  )
}

async function fetchRegistry (paths: string[]): Promise<unknown[]> {
  try {
    const results = await Promise.all(
      paths.map(async (path) => {
        const response = await fetch(`${baseUrl}/registry/${path}`)
        return await response.json()
      })
    )

    return results
  } catch (error) {
    console.log(error)
    throw new Error(`Failed to fetch registry from ${baseUrl}.`)
  }
}
