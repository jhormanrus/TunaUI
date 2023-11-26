<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from '../../lib/Input/BaseInput.vue'

const value = ref()
</script>

<template>
  <Story :layout="{ type: 'grid', width: 240 }" auto-props-disabled>
    <Variant title="primary">
      <BaseInput v-model="value" label="Input" size="sm" />
      <template #controls>
        <HstText v-model="value" title="v-model" />
      </template>
    </Variant>

    <Variant title="secondary">
      <BaseInput v-model="value" label="Input" />
      <template #controls>
        <HstText v-model="value" title="v-model" />
      </template>
    </Variant>

    <Variant title="destructive">
      <BaseInput v-model="value" label="Input" size="lg" />
      <template #controls>
        <HstText v-model="value" title="v-model" />
      </template>
    </Variant>
  </Story>
</template>
