<script setup lang="ts">
import { ref } from 'vue'
import Textarea from '../../lib/textarea/Textarea.vue'

const value = ref()
const placeholder = ref()
</script>

<template>
  <Story :layout="{ type: 'grid', width: 240 }" auto-props-disabled>
    <Variant title="small">
      <Textarea v-model="value" label="Label" size="sm" :placeholder="placeholder" />
      <template #controls>
        <HstText v-model="value" title="v-model" />
        <HstText v-model="placeholder" title="placeholder" />
      </template>
    </Variant>

    <Variant title="medium">
      <Textarea v-model="value" label="Label" required :placeholder="placeholder" />
      <template #controls>
        <HstText v-model="value" title="v-model" />
        <HstText v-model="placeholder" title="placeholder" />
      </template>
    </Variant>

    <Variant title="large">
      <Textarea v-model="value" label="Label" size="lg" :placeholder="placeholder" />
      <template #controls>
        <HstText v-model="value" title="v-model" />
        <HstText v-model="placeholder" title="placeholder" />
      </template>
    </Variant>
  </Story>
</template>
