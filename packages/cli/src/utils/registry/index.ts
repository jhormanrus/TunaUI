import {
  RegistryIndexSchema,
  type RegistryItemSchema,
  RegistryWithContentSchema,
} from '@/utils/registry/schema'
import * as v from 'valibot'

export const sourceUrl =
  'https://raw.githubusercontent.com/jhormanrus/LidiaUI/main/packages/ui'

export async function getMastercssConfig(): Promise<string> {
  try {
    const [result] = await fetchFromSource(['master.css.ts'], true)
    return v.parse(v.string(), result)
  } catch {
    throw new Error('Failed to fetch master.css.ts from registry.')
  }
}

export async function getRegistryIndex(): Promise<
  v.InferInput<typeof RegistryIndexSchema>
> {
  try {
    const [result] = await fetchFromSource(['registry.json'])
    return v.parse(RegistryIndexSchema, result)
  } catch {
    throw new Error('Failed to fetch components from registry.')
  }
}

export async function resolveTree(
  index: v.InferInput<typeof RegistryIndexSchema>,
  names: string[],
): Promise<v.InferInput<typeof RegistryIndexSchema>> {
  const tree: v.InferSetInput<typeof RegistryItemSchema> = new Set()

  for (const name of names) {
    const entry = index.find((entry) => entry.name === name)

    if (!entry) {
      continue
    }

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
  tree: v.InferInput<typeof RegistryIndexSchema>,
): Promise<v.InferInput<typeof RegistryWithContentSchema>> {
  try {
    const paths = tree.map((item) => item.files)
    const result = await fetchFromSource(paths.flat(), true)
    const registryWithContent = tree.map((item) => ({
      ...item,
      files: item.files.map((file, index) => ({
        name: file.split('/').slice(2).join('/'),
        type: file.split('/')[1],
        content: result[index],
      })),
    }))
    return v.parse(RegistryWithContentSchema, registryWithContent)
  } catch {
    throw new Error('Failed to fetch tree from registry.')
  }
}

async function fetchFromSource(paths: string[], text = false) {
  try {
    const results = await Promise.all(
      paths.map(async (path) => {
        const response = await fetch(`${sourceUrl}/${path}`)
        if (text) {
          return await response.text()
        }
        return await response.json()
      }),
    )

    return results
  } catch {
    throw new Error(`Failed to fetch component from ${sourceUrl}.`)
  }
}
