<script setup lang="ts" generic="T">
import { withDefaults } from 'vue'
import { cvInput, cvInputWrapper, cvLabel, cvWrapper } from './input'

withDefaults(
  defineProps<{
    id?: string
    idLabel?: string
    type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week'
    label?: string
    placeholder?: string
    size?: 'sm' | 'lg' | 'md'
    required?: boolean
    readonly?: boolean
    popovertarget?: string
  }>(),
  {
    type: 'text',
    size: 'md',
    placeholder: '',
  }
)

const emit = defineEmits<{
  click: [e: MouseEvent]
}>()

const [value, modifiers] = defineModel<T>({
  set(value) {
    if (modifiers.null && value === '') {
      return null
    }
    return value
  }
})
</script>

<template>
  <label :class="cvWrapper({ size })" :id="idLabel">
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
        :readonly="readonly"
        :popovertarget="popovertarget"
        @click="emit('click', $event)"
      />
    </div>
    <slot name="right-aside"></slot>
  </label>
</template>
