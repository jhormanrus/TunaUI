<script setup lang="ts" generic="T">
import IconSearch from '../icon/IconSearch.vue'

withDefaults(
  defineProps<{
    placeholder?: string
  }>(),
  {
    placeholder: 'Search',
  },
)

const value = defineModel<T>()
</script>

<template>
  <label class="flex ai:center p:12 gap:8">
    <IconSearch class="flex-shrink:0 fg:gray-60" width="18" />
    <input v-model="value" class="w:full outline:none mb:1" type="text" :placeholder>
  </label>
</template>