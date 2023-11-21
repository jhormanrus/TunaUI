<script setup lang="ts" generic="T">
import { computed, withDefaults } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: T
    id?: string
    type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week'
    size: 'sm' | 'lg' | 'md'
    label: string
    placeholder?: string
    required?: boolean
  }>(),
  {
    type: 'text',
    size: 'md',
    label: ''
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value?: T): void
}>()

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <div class="rel">
    <span
      class="abs fg:gray-50 fg:control-label:has(+:focus) left:0 pointer-events:none top:0 transform:top|left"
      :class="[
        size === 'sm' && 'f:16 translate(12,14) transform:translate(12,8)scale(.75):has(+:focus) transform:translate(12,8)scale(.75):has(+:valid)',
        size === 'md' && 'f:16 translate(14,18) transform:translate(14,10)scale(.75):has(+:focus) transform:translate(14,10)scale(.75):has(+:valid)',
        size === 'lg' && 'f:18 translate(16,22) transform:translate(16,14)scale(.75):has(+:focus) transform:translate(16,14)scale(.75):has(+:valid)'
      ]"
    >
      {{ label }}
    </span>
    <input
      v-model="value"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      class="bg:control-bg bg:control-hover-bg:hover bg:control-hover-bg:focus fg:transparent::placeholder fg:gray-60:valid::placeholder fg:control-placeholder:focus::placeholder outline:control-outline w:full"
      :class="[
        size === 'sm' && 'f:16 px:12 pt:21 pb:5 r:10',
        size === 'md' && 'f:16 px:14 pt:26 pb:8 r:12',
        size === 'lg' && 'f:18 px:16 pt:32 pb:12 r:14'
      ]"
    />
  </div>
</template>

<style scoped>
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
