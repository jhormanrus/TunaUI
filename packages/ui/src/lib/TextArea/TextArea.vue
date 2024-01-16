<script setup lang="ts">
import { computed, withDefaults } from 'vue'
import { label as cvLabel, wrapper as cvWrapper, input as cvInput } from '../class-variants/textarea'

export type TextAreaValue = string | number | readonly string[] | undefined | null

const props = withDefaults(
  defineProps<{
    modelValue?: TextAreaValue
    id?: string
    rows?: number
    size?: 'sm' | 'lg' | 'md'
    label?: string
    placeholder?: string
    required?: boolean
  }>(),
  {
    rows: 3,
    size: 'md'
  }
)

const emit = defineEmits<(e: 'update:modelValue', value?: TextAreaValue) => void>()

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
  <label :class="cvWrapper({ size })">
    <span :class="cvLabel({ size })">
      {{ label }}
    </span>
    <textarea
      v-model="value"
      :class="cvInput({ size })"
      :id="id"
      :placeholder="placeholder || ''"
      :rows="rows"
      :required="required"
    ></textarea>
    <!-- class="w-full text-lg bg-stone-200/40 outline-stone-500 rounded-2xl px-6 pt-8 pb-3 transition-colors resize-none" -->
  </label>
</template>
