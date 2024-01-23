<script lang="ts">
  import { label as cvLabel, input as cvInput } from '../class-variants/input'

  export let id: string | null = null
  export let type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' = 'text'
  export let size: 'sm' | 'lg' | 'md' = 'md'
  export let label: string
  export let placeholder = ''
  export let value: unknown = null
</script>

<div class="rel">
  <span
    class={cvLabel({ size })}
  >{label}</span>
  <input
    class={cvInput({ size })}
    {value}
    {id}
    {type}
    {placeholder}
    required
  />
</div>

<style>
  input {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
  span {
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
</style>
