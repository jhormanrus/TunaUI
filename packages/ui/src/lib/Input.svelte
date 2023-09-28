<script lang="ts">
  export let id: string | null = null
  export let type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' = 'text'
  export let size: 'sm' | 'lg' | 'md' = 'md'
  export let label: string
  export let placeholder = ''
  export let value: unknown = null
</script>

<div class="rel">
  <span
    class="
      abs fg:gray-50 top:0 left:0 pointer-events:none transform:top|left fg:gray-50 fg:input-label:has(+:focus)
      {size === 'sm' && 'f:16 translate(12,14) transform:translate(12,8)scale(.75):has(+:focus) transform:translate(12,8)scale(.75):has(+:valid)'}
      {size === 'md' && 'f:16 translate(14,18) transform:translate(14,10)scale(.75):has(+:focus) transform:translate(14,10)scale(.75):has(+:valid)'}
      {size === 'lg' && 'f:18 translate(16,22) transform:translate(16,14)scale(.75):has(+:focus) transform:translate(16,14)scale(.75):has(+:valid)'}
    "
  >{label}</span>
  <input
    {value}
    {id}
    {type}
    {placeholder}
    required
    class="
      w:full bg:input-bg outline:input-outline fg:transparent::placeholder fg:input-placeholder:focus::placeholder fg:gray-60:valid::placeholder bg:input-hover-bg:hover bg:input-hover-bg:focus
      {size === 'sm' && 'f:16 px:12 pt:21 pb:5 r:10'}
      {size === 'md' && 'f:16 px:14 pt:26 pb:8 r:12'}
      {size === 'lg' && 'f:18 px:16 pt:32 pb:12 r:14'}
    "
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
