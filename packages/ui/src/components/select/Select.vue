<script setup lang="ts">
import Input from '../input/Input.vue'
import IconDown from '../icon/IconChevronDown.vue'
import Datalist from '../datalist/Datalist.vue'

const id = Math.random().toString(36).substring(7)
const idLabel = `select-label-${id}`
const idOptions = `select-options-${id}`

function showPopover(e: MouseEvent) {
  e.target?.popoverTargetElement.showPopover()
}
</script>

<template>
  <div class="rotate(180):has(:popover-open)_svg">
    <Input
      class="{anchor-name:--select-button}"
      label="Label"
      :id-label="idLabel"
      :popovertarget="idOptions"
      @click="showPopover"
    >
      <template #right-aside>
        <IconDown class="flex-shrink:0 fg:gray-60 transition:transform|100ms|linear" width="20" />
      </template>
    </Input>
    <Datalist class="bg:gray-50/.1>*:hover" popover :id="idOptions" :anchor="idLabel">
      <option value="">ejemplo 1</option>
      <option value="">ejemplo 2</option>
      <option value="">ejemplo 3</option>
      <option value="">ejemplo 4</option>
    </Datalist>
  </div>
</template>

<style scoped>
[popover] {
  width: anchor-size(width);
  top: calc(anchor(auto) + 12px);
  bottom: auto;
  left: anchor(left);
  margin: 0;
}
option {
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 100ms linear;
}
option:hover {
  border-radius: 8px;
}
</style>
