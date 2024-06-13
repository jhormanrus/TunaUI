<script setup lang="ts">
import { cvInputWrapper, cvLabel, cvWrapper } from './input'

withDefaults(
  defineProps<{
    idLabel?: string
    label?: string
    size?: 'sm' | 'lg' | 'md'
  }>(),
  {
    type: 'text',
    size: 'md',
    placeholder: '',
  },
)
</script>

<template>
  <label :class="cvWrapper({ size })" :id="idLabel">
    <slot name="left-aside"></slot>
    <div :class="cvInputWrapper({ size })">
      <span :class="cvLabel({ size })">
        {{ label }}
      </span>
      <slot></slot>
    </div>
    <slot name="right-aside"></slot>
  </label>
</template>
