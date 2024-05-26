<script setup lang="ts">
import { withDefaults } from 'vue'
import Wrapper from '../input/Wrapper.vue'
import { cvInput } from './textarea'

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
    autoresize?: boolean
  }>(),
  {
    rows: 3,
    size: 'md',
    placeholder: '',
    autoresize: false,
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
      :class="cvInput({ size, autoresize })"
      :id
      :placeholder
      :rows
      :required
    ></textarea>
  </Wrapper>
</template>
