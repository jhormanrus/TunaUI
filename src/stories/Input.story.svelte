<script lang="ts">
  import { Input } from '$lib/index.js'
  import type { Hst } from '@histoire/plugin-svelte'

  export let Hst: Hst
</script>

<Hst.Story
  title="Input"
  layout={{ type: 'grid', width: 240 }}
>

  <Hst.Variant title="primary">
    <Input label="Input" />
  </Hst.Variant>

  <Hst.Variant title="secondary">
    <Input label="Input" size="sm" />
  </Hst.Variant>

  <Hst.Variant title="destructive">
    <Input label="Input" size="lg" />
  </Hst.Variant>

  <Hst.Variant title="outline">
  </Hst.Variant>

  <Hst.Variant title="ghost">
  </Hst.Variant>

  <Hst.Variant title="link">
  </Hst.Variant>

  <Hst.Variant title="icon">
  </Hst.Variant>

  <Hst.Variant title="with icon">
  </Hst.Variant>

  <Hst.Variant title="loading">
  </Hst.Variant>

  <Hst.Variant title="as child">
  </Hst.Variant>

</Hst.Story>
