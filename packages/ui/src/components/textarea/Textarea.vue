<script setup lang="ts">
import { withDefaults } from 'vue'
import { cvInput } from './textarea'
import Wrapper from '../input/Wrapper.vue';

export type TextAreaValue =
  | string
  | number
  | readonly string[]
  | undefined
  | null

withDefaults(
  defineProps<{
    id?: string
    rows?: number
    size?: 'sm' | 'lg' | 'md'
    label?: string
    placeholder?: string
    required?: boolean
  }>(),
  {
    rows: 3,
    size: 'md',
    placeholder: '',
  },
)

const [value, modifiers] = defineModel<TextAreaValue>({
  set(value) {
    if (modifiers.null && value === '') {
      return null
    }
    return value
  },
})
</script>

<template>
  <Wrapper
    :label
    :size
  >
    <textarea
      v-model="value"
      :class="cvInput({ size })"
      :id
      :placeholder
      :rows
      :required
    ></textarea>
  </Wrapper>
</template>
