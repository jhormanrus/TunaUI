<script lang="ts">
  import { cvWrapper } from '../class-variants/button'
</script>

<button
  class={cvWrapper()}
  type="button"
>
  <slot />
</button>
