<script setup lang="ts">
import { cvWrapper } from './button'
</script>

<template>
  <button
    :class="cvWrapper()"
    type="button"
  >
    <slot></slot>
  </button>
</template>
