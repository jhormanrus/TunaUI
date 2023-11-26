<script setup lang="ts" generic="T">
import { computed, withDefaults } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: T
    id?: string
    type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week'
    size?: 'sm' | 'lg' | 'md'
    label?: string
    placeholder?: string
    required?: boolean
  }>(),
  {
    type: 'text',
    size: 'md'
  }
)

const emit = defineEmits<(e: 'update:modelValue', value?: T) => void>()

const value = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <div class="rel">
    <span
      class="abs fg:gray-50 fg:control-label:has(+:focus) left:0 pointer-events:none top:0 transform-origin:top|left transition:transform|100ms|ease-in"
      :class="[
        size === 'sm' && 'f:16 translate(12,14) translate(12,8)scale(.75):has(+:valid) translate(12,8)scale(.75):has(+:focus)',
        size === 'md' && 'f:16 translate(14,18) translate(14,10)scale(.75):has(+:valid) translate(14,10)scale(.75):has(+:focus)',
        size === 'lg' && 'f:18 translate(16,22) translate(16,14)scale(.75):has(+:valid) translate(16,14)scale(.75):has(+:focus)'
      ]"
    >
      {{ label }}
    </span>
    <input
      v-model="value"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      required
      class="bg:control-bg bg:control-hover-bg:hover bg:control-hover-bg:focus fg:transparent::placeholder fg:gray-60:valid::placeholder fg:control-placeholder:focus::placeholder outline:control-outline|solid|2:focus-visible transition:background-color|150ms|ease-in w:full"
      :class="[
        size === 'sm' && 'f:16 pb:5 pt:21 px:12 r:10',
        size === 'md' && 'f:16 pb:8 pt:26 px:14 r:12',
        size === 'lg' && 'f:18 pb:12 pt:32 px:16 r:14'
      ]"
    />
  </div>
</template>
