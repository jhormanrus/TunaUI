<script setup lang="ts">
import { ref } from 'vue'
import Button from '../../lib/Button/BaseButton.vue'

const text = ref('Click me')
</script>

<template>
  <Story>
    <div>
      <Button>{{ text }}</Button>
    </div>

    <template #controls>
      <HstText title="default slot" v-model="text" />
    </template>
  </Story>
</template>
