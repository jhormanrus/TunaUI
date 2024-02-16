<script setup lang="ts">
import { ref } from 'vue'
import Select from '../../components/select/Select.vue'

const value = ref()
const placeholder = ref('placeholder')

const options = [
  { value: '1', key: 'Option 1' },
  { value: '2', key: 'Option 2' },
  { value: '3', key: 'Option 3' },
  { value: '4', key: 'Option 4' },
  { value: '5', key: 'Option 5' },
]
</script>

<template>
  <Story :layout="{ type: 'grid', width: 240 }" auto-props-disabled>
    <Variant title="primary">
      <Select v-model="value" label="Label" size="sm" :options="options" :placeholder="placeholder" />
      <template #controls>
        <HstText v-model="value" title="v-model" />
        <HstText v-model="placeholder" title="placeholder" />
      </template>
    </Variant>

    <Variant title="secondary">
      <Select v-model="value" label="Label" search :options="options" :placeholder="placeholder" />
      <template #controls>
        <HstText v-model="value" title="v-model" />
        <HstText v-model="placeholder" title="placeholder" />
      </template>
    </Variant>

    <Variant title="destructive">
      <Select v-model="value" label="Label" size="lg" :options="options" :placeholder="placeholder" />
      <template #controls>
        <HstText v-model="value" title="v-model" />
        <HstText v-model="placeholder" title="placeholder" />
      </template>
    </Variant>
  </Story>
</template>
