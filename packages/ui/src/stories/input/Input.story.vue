<script setup lang="ts">
import { ref } from 'vue'
import Input from '../../components/input/Input.vue'
import Select from '../../components/select/Select.vue'

const value = ref()
const placeholder = ref()
</script>

<template>
  <Story :layout="{ type: 'grid', width: 240 }" auto-props-disabled>
    <Variant title="primary">
      <Input v-model="value" label="Label" size="sm" :placeholder="placeholder" />
      <template #controls>
        <HstText v-model="value" title="v-model" />
        <HstText v-model="placeholder" title="placeholder" />
      </template>
    </Variant>

    <Variant title="secondary">
      <!-- <Input v-model="value" label="Label" required :placeholder="placeholder" /> -->
      <Select />
      <template #controls>
        <HstText v-model="value" title="v-model" />
        <HstText v-model="placeholder" title="placeholder" />
      </template>
    </Variant>

    <Variant title="destructive">
      <Input v-model="value" label="Label" size="lg" :placeholder="placeholder" />
      <template #controls>
        <HstText v-model="value" title="v-model" />
        <HstText v-model="placeholder" title="placeholder" />
      </template>
    </Variant>
  </Story>
</template>
