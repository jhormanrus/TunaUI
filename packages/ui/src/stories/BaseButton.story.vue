<script setup>
import { ref } from 'vue'
import Button from '../lib/BaseButton.vue'

const text = ref('Click me');
</script>

<template>
  <Story>
    <div>
      {{ text }}
      <Button />
    </div>

    <template #controls>
      <HstText title="default slot" v-model="text" />
    </template>
  </Story>
</template>
