<script setup lang="ts" generic="T">
import { computed, withDefaults } from 'vue'
import { cvInput, cvInputWrapper, cvLabel, cvWrapper } from './input'

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
    size: 'md',
    placeholder: '',
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
  <label :class="cvWrapper({ size })">
    <slot name="left-aside"></slot>
    <div :class="cvInputWrapper({ size })">
      <span :class="cvLabel({ size })">
        {{ label }}
      </span>
      <input
        v-model="value"
        :class="cvInput({ size })"
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :required="required"
      />
    </div>
    <slot name="right-aside"></slot>
  </label>
</template>
