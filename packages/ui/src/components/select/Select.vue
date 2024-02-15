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
    <Datalist popover :id="idOptions" :anchor="idLabel">
      <option value="">ejemplo 1</option>
      <option value="">ejemplo 2</option>
      <option value="">ejemplo 3</option>
      <option value="">ejemplo 4</option>
      <span id="indicator" class="bg:gray-50/.1 r:8 abs transition:all|200ms|ease-in"></span>
    </Datalist>
  </div>
</template>

<style>
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
option:nth-of-type(1) {
  anchor-name: --option-hover;
}
option:nth-of-type(2) {
  anchor-name: --option-hover2;
}
:root:has(option:nth-of-type(1):is(:hover)) {
  --active: --option-hover;
}
:root:has(option:nth-of-type(2):is(:hover)) {
  --active: --option-hover2;
}
#indicator {
  top: anchor(var(--active, --option-hover) top);
  bottom: anchor(var(--active, --option-hover) bottom);
  left: anchor(var(--active, --option-hover) left);
  right: anchor(var(--active, --option-hover) right);
  z-index: -1;
}
</style>
