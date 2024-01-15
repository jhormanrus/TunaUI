<script setup lang="ts">
import { ref } from 'vue'
import InputBase from '../../lib/Input/InputBase.vue'

const value = ref()
const placeholder = ref()
</script>

<template>
  <Story :layout="{ type: 'grid', width: 240 }" auto-props-disabled>
    <Variant title="primary">
      <InputBase v-model="value" label="Label" size="sm" :placeholder="placeholder" />
      <template #controls>
        <HstText v-model="value" title="v-model" />
        <HstText v-model="placeholder" title="placeholder" />
      </template>
    </Variant>

    <Variant title="secondary">
      <InputBase v-model="value" label="Label" required :placeholder="placeholder" />
      <template #controls>
        <HstText v-model="value" title="v-model" />
        <HstText v-model="placeholder" title="placeholder" />
      </template>
    </Variant>

    <Variant title="destructive">
      <InputBase v-model="value" label="Label" size="lg" :placeholder="placeholder" />
      <template #controls>
        <HstText v-model="value" title="v-model" />
        <HstText v-model="placeholder" title="placeholder" />
      </template>
    </Variant>
  </Story>
</template>
