<script setup lang="ts">
import cv from 'class-variant'

const btn = cv(
  'inline-flex rounded',
  {
    intent: {
      primary: 'bg:blue bg:blue-55:hover fg:white',
      secondary: 'bg:white bg:slate-90:hover fg:slate-30'
    },
    size: {
      sm: 'text:14 p:5|15',
      md: 'text:16 p:10|25'
    }
  }
  // ['uppercase', { intent: 'primary', size: 'md' }]
  // ({ indent, size }) => indent && size && 'font:semibold'
)

btn.default = {
  intent: 'primary',
  size: 'sm'
}

console.log(btn())
</script>

<template>
  <button
    class="inline-flex ai:center b:2 b:gray-80 bg:white f:16 fg:gray-20 font:medium gap:8 h:40 jc:center px:16 py:8 r:12 transition:box-shadow|150ms|ease-in"
    type="button"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  --highlight-size: 0;
  box-shadow: 0 7px 14px -5px hsl(220 3% 15%/calc(1% + 5%)), 0 1px #dee2e6,0 0 0 var(--highlight-size) hsl(210 11% 71%/25%);
}
button:where(:not(:active):hover) {
  --highlight-size: .375rem;
}
button:focus-visible {
  outline-color: blue;
  outline-offset: 5px;
}
</style>
