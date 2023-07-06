<script lang="ts">
  import { Input } from '$lib/index.js'
  import type { Hst } from '@histoire/plugin-svelte'

  export let Hst: Hst
</script>

<Hst.Story title="BaseButton">
  <div class="p-2">
    <Input id="x" label="text"></Input>
  </div>
</Hst.Story>