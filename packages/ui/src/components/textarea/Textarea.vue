<script setup lang="ts">
import { withDefaults } from 'vue'
import { cvInput, cvInputWrapper, cvLabel, cvWrapper } from './textarea'

export type TextAreaValue = string | number | readonly string[] | undefined | null

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
  }
)

const value = defineModel<TextAreaValue>()
</script>

<template>
  <label :class="cvWrapper({ size })">
    <div :class="cvInputWrapper({ size })">
      <span :class="cvLabel({ size })">
        {{ label }}
      </span>
      <textarea
        v-model="value"
        :class="cvInput({ size })"
        :id="id"
        :placeholder="placeholder"
        :rows="rows"
        :required="required"
      ></textarea>
    </div>
  </label>
</template>
