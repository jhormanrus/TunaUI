<script setup lang="ts">
import { ref } from 'vue'
import Textarea from '../../components/textarea/Textarea.vue'

const value = ref()
const placeholder = ref()
const autoresize = ref()
const rows = ref()
</script>

<template>
  <Story :layout="{ type: 'grid', width: 240 }" auto-props-disabled>
    <Variant title="small">
      <Textarea
        v-model.null="value"
        label="Label"
        size="sm"
        :autoresize
        :placeholder
        :rows
      />
      <template #controls>
        <HstText v-model="value" title="v-model" />
        <HstText v-model="placeholder" title="placeholder" />
        <HstNumber v-model="rows" title="rows" />
        <HstCheckbox v-model="autoresize" title="autoresize" />
      </template>
    </Variant>

    <Variant title="medium">
      <Textarea
        v-model.null="value"
        label="Label"
        required
        :autoresize
        :placeholder
        :rows
      />
      <template #controls>
        <HstText v-model="value" title="v-model" />
        <HstText v-model="placeholder" title="placeholder" />
        <HstNumber v-model="rows" title="rows" />
        <HstCheckbox v-model="autoresize" title="autoresize" />
      </template>
    </Variant>

    <Variant title="large">
      <Textarea
        v-model.null="value"
        label="Label"
        size="lg"
        :autoresize
        :placeholder
        :rows
      />
      <template #controls>
        <HstText v-model="value" title="v-model" />
        <HstText v-model="placeholder" title="placeholder" />
        <HstNumber v-model="rows" title="rows" />
        <HstCheckbox v-model="autoresize" title="autoresize" />
      </template>
    </Variant>
  </Story>
</template>
