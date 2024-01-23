<script setup lang="ts">
import { ref } from 'vue'
import Button from '../../lib/button/Button.vue'

const text = ref('Click me')
</script>

<template>
  <Story>
    <Button>{{ text }}</Button>
    <template #controls>
      <HstText title="default slot" v-model="text" />
    </template>
  </Story>
</template>
