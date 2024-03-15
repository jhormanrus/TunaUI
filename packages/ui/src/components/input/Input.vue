<script setup lang="ts" generic="T">
import { withDefaults } from 'vue'
import Wrapper from './Wrapper.vue'
import { cvInput } from './input'

withDefaults(
  defineProps<{
    id?: string
    type?:
      | 'text'
      | 'password'
      | 'email'
      | 'number'
      | 'tel'
      | 'url'
      | 'search'
      | 'date'
      | 'time'
      | 'datetime-local'
      | 'month'
      | 'week'
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
  },
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
  },
})
</script>

<template>
  <Wrapper
    :label
    :size
  >
    <template #left-aside>
      <slot name="left-aside"></slot>
    </template>
    <input
      v-model="value"
      :class="cvInput({ size })"
      :id
      :type
      :placeholder
      :required
      :readonly
      :popovertarget
      @click="emit('click', $event)"
    />
    <template #right-aside>
      <slot name="right-aside"></slot>
    </template>
  </Wrapper>
</template>
