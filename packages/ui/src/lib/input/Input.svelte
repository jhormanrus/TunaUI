<script lang="ts">
  import { cvInput, cvInputWrapper, cvLabel, cvWrapper } from '../class-variants/input'

  export let value: unknown = null
  export let id: string | null = null
  export let type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' = 'text'
  export let size: 'sm' | 'lg' | 'md' = 'md'
  export let label: string = ''
  export let placeholder = ''
  export let required = false
</script>

<label class={cvWrapper({ size })}>
  <slot name="left-aside"></slot>
  <div class={cvInputWrapper({ size })}>
    <span class={cvLabel({ size })}>
      { label }
    </span>
    <input
      class={cvInput({ size })}
      {value}
      {id}
      {type}
      {placeholder}
      {required}
    />
  </div>
  <slot name="right-aside"></slot>
</label>
