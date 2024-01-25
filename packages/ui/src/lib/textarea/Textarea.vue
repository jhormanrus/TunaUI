<script setup lang="ts">
import { computed, withDefaults } from 'vue'
import { cvInput, cvInputWrapper, cvLabel, cvWrapper } from '../class-variants/textarea'

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
    size: 'md',
    placeholder: '',
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
