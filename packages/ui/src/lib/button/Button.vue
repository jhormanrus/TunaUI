<script setup lang="ts">
import { cvWrapper } from '../class-variants/button'
</script>

<template>
  <button
    :class="cvWrapper()"
    type="button"
  >
    <slot></slot>
  </button>
</template>
