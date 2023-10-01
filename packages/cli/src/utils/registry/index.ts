import path from "path"
import { Config } from "@/src/utils/get-config"
import {
  registryBaseColorSchema,
  registryIndexSchema,
  registryItemWithContentSchema,
  registryWithContentSchema,
} from "@/src/utils/registry/schema"
import { Input, parse } from "valibot"

const baseUrl = process.env.COMPONENTS_REGISTRY_URL ?? ""

export async function getRegistryIndex() {
  try {
    const [result] = await fetchRegistry(["index.json"])

    return parse(registryIndexSchema, result)
  } catch (error) {
    throw new Error(`Failed to fetch components from registry.`)
  }
}

export async function getRegistryBaseColor(baseColor: string) {
  try {
    const [result] = await fetchRegistry([`colors/${baseColor}.json`])

    return parse(registryBaseColorSchema, result)
  } catch (error) {
    throw new Error(`Failed to fetch base color from registry.`)
  }
}

export async function resolveTree(
  index: Input<typeof registryIndexSchema>,
  names: string[]
) {
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

export async function fetchTree(
  style: string,
  tree: Input<typeof registryIndexSchema>
) {
  try {
    const paths = tree.map((item) => `styles/${style}/${item.name}.json`)
    const result = await fetchRegistry(paths)

    return parse(registryWithContentSchema, result)
  } catch (error) {
    throw new Error(`Failed to fetch tree from registry.`)
  }
}

export async function getItemTargetPath(
  config: Config,
  item: Pick<Input<typeof registryItemWithContentSchema>, "type">,
  override?: string
) {
  // Allow overrides for all items but ui.
  if (override && item.type !== "components:ui") {
    return override
  }

  const [parent, type] = item.type.split(":")
  if (!(parent in config.resolvedPaths)) {
    return null
  }

  return path.join(
    config.resolvedPaths[parent as keyof typeof config.resolvedPaths],
    type
  )
}

async function fetchRegistry(paths: string[]) {
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
