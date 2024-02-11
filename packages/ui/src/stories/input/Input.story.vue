<script setup lang="ts">
import { ref } from 'vue'
import Input from '../../components/input/Input.vue'

const value = ref()
const placeholder = ref()

function showPopover(e: MouseEvent) {
  e.target?.popoverTargetElement.showPopover()
}
</script>

<template>
  <Story :layout="{ type: 'grid', width: 240 }" auto-props-disabled>
    <Variant title="primary">
      <Input v-model="value" label="Label" size="sm" :placeholder="placeholder" />
      <template #controls>
        <HstText v-model="value" title="v-model" />
        <HstText v-model="placeholder" title="placeholder" />
      </template>
    </Variant>

    <Variant title="secondary">
      <div>
        <Input v-model="value" id="menu-button" popovertarget="dropdown-menu" @click="showPopover" label="Label" required :placeholder="placeholder" />
        <div id="dropdown-menu" popover anchor="menu-label" class="bg:cyan-50">popover</div>
      </div>
      <template #controls>
        <HstText v-model="value" title="v-model" />
        <HstText v-model="placeholder" title="placeholder" />
      </template>
    </Variant>

    <Variant title="destructive">
      <Input v-model="value" label="Label" size="lg" :placeholder="placeholder" />
      <template #controls>
        <HstText v-model="value" title="v-model" />
        <HstText v-model="placeholder" title="placeholder" />
      </template>
    </Variant>
  </Story>
</template>

<style scoped>
  #dropdown-menu {
    top: calc(anchor(auto) + 8px);
    bottom: auto;
    left: anchor(left);
  }
</style>
