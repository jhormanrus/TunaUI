import path from 'path'
import { type Config } from '@/src/utils/get-config'
import {
  registryBaseColorSchema,
  registryIndexSchema,
  type registryItemWithContentSchema,
  registryWithContentSchema
} from '@/src/utils/registry/schema'
import { type Input, parse } from 'valibot'

const baseUrl = process.env.COMPONENTS_REGISTRY_URL ?? ''

export async function getRegistryIndex (): Promise<Input<typeof registryIndexSchema>> {
  try {
    const [result] = await fetchRegistry(['index.json'])

    return parse(registryIndexSchema, result)
  } catch (error) {
    throw new Error('Failed to fetch components from registry.')
  }
}

export async function getRegistryBaseColor (baseColor: string): Promise<Input<typeof registryBaseColorSchema>> {
  try {
    const [result] = await fetchRegistry([`colors/${baseColor}.json`])

    return parse(registryBaseColorSchema, result)
  } catch (error) {
    throw new Error('Failed to fetch base color from registry.')
  }
}

export async function resolveTree (index: Input<typeof registryIndexSchema>, names: string[]): Promise<Input<typeof registryIndexSchema>> {
  const tree: Input<typeof registryIndexSchema> = []

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

export async function fetchTree (style: string, tree: Input<typeof registryIndexSchema>): Promise<Input<typeof registryWithContentSchema>> {
  try {
    const paths = tree.map((item) => `styles/${style}/${item.name}.json`)
    const result = await fetchRegistry(paths)

    return parse(registryWithContentSchema, result)
  } catch (error) {
    throw new Error('Failed to fetch tree from registry.')
  }
}

export async function getItemTargetPath (
  config: Config,
  item: Pick<Input<typeof registryItemWithContentSchema>, 'type'>,
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
