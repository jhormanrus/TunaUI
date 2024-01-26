import {
  RegistryIndexSchema,
  RegistryItemSchema,
  RegistryWithContentSchema,
} from '@/utils/registry/schema'
import { type Input, SetInput, parse, string } from 'valibot'

export const sourceUrl =
  'https://raw.githubusercontent.com/jhormanrus/LidiaUI/main/packages/ui'

export async function getMastercssConfig(): Promise<string> {
  try {
    const [result] = await fetchFromSource(['master.css.ts'], true)
    return parse(string(), result)
  } catch {
    throw new Error('Failed to fetch master.css.ts from registry.')
  }
}

export async function getRegistryIndex(): Promise<
  Input<typeof RegistryIndexSchema>
> {
  try {
    const [result] = await fetchFromSource(['registry.json'])
    return parse(RegistryIndexSchema, result)
  } catch {
    throw new Error('Failed to fetch components from registry.')
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
    const paths = tree.map((item) => item.files)
    const result = await fetchFromSource(paths.flat(), true)
    enum FileType {
      'class-variants' = 'classVariants',
      components = 'components',
      utils = 'utils',
    }
    const registryWithContent = tree.map((item) => ({
      ...item,
      files: item.files.map((file, index) => ({
        name: file.split('/').pop(),
        type: FileType[file.split('/').reverse()[1] as keyof typeof FileType],
        content: result[index],
      })),
    }))
    return parse(RegistryWithContentSchema, registryWithContent)
  } catch {
    throw new Error('Failed to fetch tree from registry.')
  }
}

async function fetchFromSource(paths: string[], text = false) {
  try {
    const results = await Promise.all(
      paths.map(async (path) => {
        const response = await fetch(`${sourceUrl}/${path}`)
        if (text) return await response.text()
        return await response.json()
      }),
    )

    return results
  } catch (error) {
    throw new Error(`Failed to fetch component from ${sourceUrl}.`)
  }
}
