<script lang="ts">
  import type { Hst } from '@histoire/plugin-svelte'
  import Input from '../../lib/input/Input.svelte'

  export let Hst: Hst
</script>

<Hst.Story
  title="Input"
  layout={{ type: 'grid', width: 240 }}
>

  <Hst.Variant title="primary">
    <Input label="Input" size="sm" />
  </Hst.Variant>

  <Hst.Variant title="secondary">
    <Input label="Input" size="md" />
  </Hst.Variant>

  <Hst.Variant title="destructive">
    <Input label="Input" size="lg" placeholder="Hola mundo" />
  </Hst.Variant>

  <Hst.Variant title="outline">
    <Input label="Input" size="sm" value="AAAAAA" />
  </Hst.Variant>

  <Hst.Variant title="ghost">
    <Input label="Input" size="md" value="AAAAAA" />
  </Hst.Variant>

  <Hst.Variant title="link">
    <Input label="Input" size="lg" value="AAAAAA" />
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
