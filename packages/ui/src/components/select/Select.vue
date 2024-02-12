<script setup lang="ts">
import Input from '../input/Input.vue'
import IconDown from '../icon/IconChevronDown.vue'
import Datalist from '../datalist/Datalist.vue'

function showPopover(e: MouseEvent) {
  e.target?.popoverTargetElement.showPopover()
}
</script>

<template>
  <div class="rotate(180):has(:popover-open)_svg">
    <Input
      id="menu-button"
      id-label="menu-label"
      label="Label"
      popovertarget="dropdown-menu"
      @click="showPopover"
    >
      <template #right-aside>
        <IconDown class="flex-shrink:0 fg:gray-60 transition:transform|100ms|linear" width="20" />
      </template>
    </Input>
    <Datalist id="dropdown-menu" popover anchor="menu-label">
      popover
    </Datalist>
  </div>
</template>

<style scoped>
#dropdown-menu {
  top: calc(anchor(auto) + 12px);
  bottom: auto;
  left: anchor(left);
}
</style>
