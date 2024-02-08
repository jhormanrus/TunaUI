<script setup lang="ts" generic="T">
import { withDefaults } from 'vue'
import { cvInput, cvInputWrapper, cvLabel, cvWrapper } from './input'

withDefaults(
  defineProps<{
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

const value = defineModel<T>()
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
