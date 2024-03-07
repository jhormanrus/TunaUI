<script lang="ts">
import { cvWrapper } from './button'
</script>

<button
  class={cvWrapper()}
  type="button"
>
  <slot />
</button>
