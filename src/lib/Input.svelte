<script lang="ts">
  export let id: string | null = null
  export let type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' = 'text'
  export let size: 'sm' | 'lg' | null = null
  export let label: string
  export let placeholder = ''
</script>

<div class="rel">
  <span
    class="abs fg:gray-50 top:0 left:0 pointer-events:none transform:top|left translate(12,16) scale(1) fg:gray-50 fg:blue:has(+:focus) translateY(8):has(+:focus) scale(.75):has(+:focus) {size === 'sm' && 'translateY(12)! scale(1)! translateY(4)!:has(+:focus) scale(.75)!:has(+:focus)'} {size === 'lg' && 'f:18! translateY(20) scale(1) translateY(12)!:has(+:focus) scale(.75)!:has(+:focus)'}"
  >{label}</span>
  <input
    class="w:full bg:gray-80 outline:blue r:8 px:12 pt:24 pb:8 fg:transparent::placeholder fg:gray-60:focus::placeholder fg:gray-60:valid::placeholder fg:gray-90:hover fg:gray-80:focus {size === 'sm' && 'pt:20! pb:4!'} {size === 'lg' && 'f:18! px:16! pt:32! pb:12!'}"
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
