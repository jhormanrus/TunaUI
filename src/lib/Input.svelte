<script lang="ts">
  export let id: string | null = null
  export let type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' = 'text'
  export let size: 'sm' | 'lg' | 'md' = 'md'
  export let label: string
  export let placeholder = ''
</script>

<div class="rel">
  <span
    class="
      abs fg:gray-50 top:0 left:0 pointer-events:none transform:top|left fg:gray-50 fg:blue:has(+:focus)
      {size === 'sm' && 'translate(10,12) transform:translate(10,4)scale(.75):has(+:focus) transform:translate(10,4)scale(.75):has(+:valid)'}
      {size === 'md' && 'translate(12,16) transform:translate(12,8)scale(.75):has(+:focus) transform:translate(12,8)scale(.75):has(+:valid)'}
      {size === 'lg' && 'f:18! translate(16,20) transform:translate(16,12)scale(.75):has(+:focus) transform:translate(16,12)scale(.75):has(+:valid)'}
    "
  >{label}</span>
  <input
    class="
      w:full bg:gray-80 outline:blue r:8 px:12 fg:transparent::placeholder fg:gray-60:focus::placeholder fg:gray-60:valid::placeholder bg:gray-90:hover bg:gray-80:focus
      {size === 'sm' && 'pt:20 pb:4'}
      {size === 'md' && 'pt:24 pb:8'}
      {size === 'lg' && 'r:16! f:18! px:16! pt:32 pb:12'}
    "
    id={id}
    type={type}
    placeholder={placeholder}
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
