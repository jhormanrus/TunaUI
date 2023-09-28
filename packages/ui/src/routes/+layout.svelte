<script lang="ts">
  import { onMount, type ComponentType } from 'svelte'
  import { Fragment } from '@master/css.svelte'
  import type { CSSProvider as CSSProviderType } from '@master/css.svelte'

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let CSSProvider: ComponentType<CSSProviderType> = Fragment as any

  onMount(async () => {
    CSSProvider = (await import('@master/css.svelte')).CSSProvider
  })
</script>

<CSSProvider config={import('../master.css')}>
  <slot />
</CSSProvider>
