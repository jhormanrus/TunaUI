<template>
  <div class="bg:white b:gray-20 b:1 r:12 p:6 shadow">
    <slot></slot>
  </div>
</template>

<style scoped>
.shadow {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}
</style>
