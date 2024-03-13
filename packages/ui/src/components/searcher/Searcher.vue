<script setup lang="ts">
import IconSearch from '../icon/IconSearch.vue'
</script>

<template>
  <label class="flex ai:center p:12 gap:8">
    <IconSearch class="flex-shrink:0 fg:gray-60" width="18" />
    <input class="w:full outline:none mb:1" type="text" placeholder="Search">
  </label>
</template>