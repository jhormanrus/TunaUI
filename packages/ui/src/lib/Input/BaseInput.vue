<script setup lang="ts" generic="T">
import { computed, withDefaults } from 'vue'
import { label as cvLabel, input as cvInput } from '../class-variants/input'

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
    <span :class="cvLabel({ size })">
      {{ label }}
    </span>
    <input
      v-model="value"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      required
      :class="cvInput({ size })"
    />
  </div>
</template>
