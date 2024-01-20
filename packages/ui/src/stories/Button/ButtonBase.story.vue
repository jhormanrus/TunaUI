<script setup lang="ts">
import { ref } from 'vue'
import ButtonBase from '../../lib/Button/ButtonBase.vue'

const text = ref('Click me')
</script>

<template>
  <Story>
    <ButtonBase>{{ text }}</ButtonBase>

    <template #controls>
      <HstText title="default slot" v-model="text" />
    </template>
  </Story>
</template>
