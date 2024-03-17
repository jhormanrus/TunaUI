<script setup lang="ts">
import { ref } from 'vue'
import Select from '../../components/select/Select.vue'

const value = ref()
const placeholder = ref('placeholder')
const bindValue = ref()

const options = ref([
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' },
])
</script>

<template>
  <Story :layout="{ type: 'grid', width: 240 }" auto-props-disabled>
    <Variant title="primary">
      {{ value }}
      <Select v-model="value" label="Label" size="sm" :options :placeholder :bind-value />
      <template #controls>
        <HstText v-model="value" title="v-model" />
        <HstText v-model="placeholder" title="placeholder" />
        <HstText v-model="bindValue" title="bind-value" />
        <HstJson v-model="options" title="options" />
      </template>
    </Variant>

    <Variant title="secondary">
      <Select v-model="value" label="Label" search :options :placeholder :bind-value />
      <template #controls>
        <HstText v-model="value" title="v-model" />
        <HstText v-model="placeholder" title="placeholder" />
        <HstText v-model="bindValue" title="bind-value" />
        <HstJson v-model="options" title="options" />
      </template>
    </Variant>

    <Variant title="destructive">
      <Select v-model="value" label="Label" size="lg" :options :placeholder :bind-value />
      <template #controls>
        <HstText v-model="value" title="v-model" />
        <HstText v-model="placeholder" title="placeholder" />
        <HstText v-model="bindValue" title="bind-value" />
        <HstJson v-model="options" title="options" />
      </template>
    </Variant>
  </Story>
</template>
