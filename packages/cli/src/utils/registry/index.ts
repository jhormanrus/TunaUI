import path from 'path'
import { type Config } from '@/utils/get-config'
import {
  RegistryBaseColorSchema,
  RegistryIndexSchema,
  RegistryItemSchema,
  type RegistryItemWithContentSchema,
  RegistryWithContentSchema,
} from '@/utils/registry/schema'
import { type Input, SetInput, parse } from 'valibot'

const baseUrl =
  process.env.COMPONENTS_REGISTRY_URL ?? 'https://tuna-ui.vercel.app'

const sourceUrl =
  'https://raw.githubusercontent.com/jhormanrus/TunaUI/main/packages/ui'

export async function getRegistryIndex(): Promise<
  Input<typeof RegistryIndexSchema>
> {
  try {
    const [result] = await fetchRegistry(['registry.json'])
    return parse(RegistryIndexSchema, result)
  } catch {
    throw new Error('Failed to fetch components from registry.')
  }
}

export async function getRegistryBaseColor(): Promise<
  Input<typeof RegistryBaseColorSchema>
> {
  try {
    const [result] = await fetchFromSource(['master.css.ts'])

    return parse(RegistryBaseColorSchema, result)
  } catch {
    throw new Error('Failed to fetch base color from registry.')
  }
}

export async function resolveTree(
  index: Input<typeof RegistryIndexSchema>,
  names: string[],
): Promise<Input<typeof RegistryIndexSchema>> {
  const tree: SetInput<typeof RegistryItemSchema> = new Set()

  for (const name of names) {
    const entry = index.find((entry) => entry.name === name)

    if (!entry) continue

    tree.add(entry)

    if (entry.registryDependencies) {
      const dependencies = await resolveTree(index, entry.registryDependencies)
      for (const dependency of dependencies) {
        tree.add(dependency)
      }
    }
  }

  return [...tree]
}

export async function fetchTree(
  tree: Input<typeof RegistryIndexSchema>,
): Promise<Input<typeof RegistryWithContentSchema>> {
  try {
    const paths = tree.map((item) => item.files[0])
    const result = await fetchFromSource(paths)
    const registryWithContent = tree.map((item, index) => ({
      ...item,
      files: [
        {
          name: item.files[0].split('/').pop(),
          content: result[index],
        },
      ],
    }))
    return parse(RegistryWithContentSchema, registryWithContent)
  } catch {
    throw new Error('Failed to fetch tree from registry.')
  }
}

export async function getItemTargetPath(
  config: Config,
  item: Pick<Input<typeof RegistryItemWithContentSchema>, 'type'>,
  override?: string,
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
    type,
  )
}

async function fetchRegistry(paths: string[]): Promise<unknown[]> {
  try {
    const results = await Promise.all(
      paths.map(async (path) => {
        const response = await fetch(`${baseUrl}/${path}`)
        return await response.json()
      }),
    )

    return results
  } catch (error) {
    throw new Error(`Failed to fetch registry from ${baseUrl}.`)
  }
}

async function fetchFromSource(paths: string[]): Promise<string[]> {
  try {
    const results = await Promise.all(
      paths.map(async (path) => {
        const response = await fetch(`${sourceUrl}/${path}`)
        return await response.text()
      }),
    )

    return results
  } catch (error) {
    throw new Error(`Failed to fetch component from ${sourceUrl}.`)
  }
}
