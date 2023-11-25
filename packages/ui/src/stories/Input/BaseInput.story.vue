<script setup lang="ts">
import BaseInput from '../../lib/Input/BaseInput.vue'
</script>

<template>
  <Story :layout="{ type: 'grid', width: 240 }">
    <Variant title="primary">
      <BaseInput label="Input" size="sm" />
    </Variant>

    <Variant title="secondary">
      <BaseInput label="Input" />
    </Variant>

    <Variant title="destructive">
      <BaseInput label="Input" size="lg" />
    </Variant>
  </Story>
</template>
