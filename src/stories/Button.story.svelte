<script lang="ts">
  import { Button } from '$lib/index.js'
  import type { Hst } from '@histoire/plugin-svelte'

  export let Hst: Hst
</script>

<Hst.Story title="BaseButton">
  <div class="p-2">
    <Button>Do some hard work</Button>
  </div>
</Hst.Story>
