<script setup lang="ts" generic="T">
import { computed, ref } from 'vue'
import Input from '../input/Input.vue'
import IconDown from '../icon/IconChevronDown.vue'
import Datalist from '../datalist/Datalist.vue'

export type SelectOption<T> = {
  value: T
  key: string
}

const props = defineProps<{
  label?: string
  placeholder?: string
  size?: 'sm' | 'lg' | 'md'
  options: SelectOption<T>[]
  search?: boolean
  multiple?: boolean
}>()

const value = defineModel<SelectOption<T>>()

const dataList = ref<InstanceType<typeof Datalist>>()
const open = ref(false)
const searchQuery = ref('')

const formattedValue = computed<string>(() => {
  if (!value.value) return ''
  return value.value.key
})
const textValue = computed({
  get: () => {
    if (props.search && open.value) return searchQuery.value
    return formattedValue.value
  },
  set: value => {
    searchQuery.value = value
  }
})

const id = Math.random().toString(36).substring(7)
const idLabel = `select-label-${id}`
const idOptions = `select-options-${id}`

function showPopover() {
  dataList.value?.element?.showPopover()
  open.value = true
}

function hidePopover() {
  dataList.value?.element?.hidePopover()
  open.value = false
}

function onToggle(e: ToggleEvent) {
  open.value = e.newState === 'open'
}

function selectOption(option: SelectOption<T>) {
  value.value = option
  hidePopover()
}
</script>

<template>
  <div class="rotate(180):has(:popover-open)_svg">
    <Input
      v-model="textValue"
      class="{anchor-name:--select-button}"
      :id-label="idLabel"
      :label="label"
      :placeholder="placeholder"
      :size="size"
      :readonly="!search"
      :popovertarget="idOptions"
      @click="showPopover"
    >
      <template #right-aside>
        <IconDown class="flex-shrink:0 fg:gray-60 transition:transform|100ms|linear" width="20" />
      </template>
    </Input>
    <Datalist
      ref="dataList"
      popover
      :id="idOptions"
      :anchor="idLabel"
      @toggle="onToggle"
    >
      <option
        v-for="option in options"
        class="bg:gray-50/.1:hover px:12 py:8 r:8 cursor:pointer transition:background-color|100ms|linear"
        :value="option.value"
        @click="selectOption(option)"
      >
        {{ option.key }}
      </option>
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
</style>
