<script setup lang="ts" generic="T">
import { computed, onMounted, ref } from 'vue'
import Input from '../input/Input.vue'
import IconChevronDown from '../icon/IconChevronDown.vue'
import Datalist from '../datalist/Datalist.vue'
import IconSquareRounded from '../icon/IconSquareRounded.vue'
import IconSquareRoundedCheckFilled from '../icon/IconSquareRoundedCheckFilled.vue'

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

const value = defineModel<SelectOption<T> | SelectOption<T>[]>()

const dataList = ref<InstanceType<typeof Datalist>>()
const open = ref(false)
const searchQuery = ref('')

const filteredOptions = computed(() => {
  const selectedOptions = props.options.map(option => ({
    ...option,
    selected: isSelected(option)
  }))
  if (searchQuery.value.length > 0) {
    return selectedOptions.filter(hymn => {
      const normalizedKey = normalizeWord(hymn.key.toLowerCase())
      const normalizedQuery = normalizeWord(searchQuery.value.toLowerCase())
      const arrayQuery = normalizedQuery.split(/\s+/)
      return arrayQuery.every(word => normalizedKey.includes(word))
    })
  }
  return selectedOptions
})
const formattedValue = computed<string>(() => {
  if (!value.value) return ''
  if (props.multiple) {
    return (value.value as SelectOption<T>[])
      .reduce<string[]>((list, element) => list.concat([element.key]), [])
      .join(', ')
  }
  return (value.value as SelectOption<T>).key
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
const internalPlaceholder = computed(() =>
  props.search && open.value ? formattedValue.value : props.placeholder
)

onMounted(() => {
  if (props.multiple && !Array.isArray(value.value)) {
    value.value = []
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
  searchQuery.value = ''
  if (props.multiple) {
    const opIndex = (value.value as SelectOption<T>[]).findIndex(o => o.value === option.value)
    if (opIndex >= 0) {
      (value.value as SelectOption<T>[]).splice(opIndex, 1)
    } else {
      (value.value as SelectOption<T>[]).push(option)
    }
  } else {
    value.value = option
    hidePopover()
  }
}

function normalizeWord(word: string) {
  return word
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .normalize('NFC')
}

function isSelected(option: SelectOption<T>) {
  if (props.multiple) {
    return (value.value as SelectOption<T>[])?.map(o => o.value).includes(option.value)
  }
  return value.value === option.value
}
</script>

<template>
  <div class="rotate(180):has(:popover-open)_svg.icon-chevron-down">
    <Input
      v-model="textValue"
      class="{anchor-name:--select-button}"
      :id-label="idLabel"
      :label="label"
      :placeholder="internalPlaceholder"
      :size="size"
      :readonly="!search"
      :popovertarget="idOptions"
      @click="showPopover"
    >
      <template #right-aside>
        <IconChevronDown class="flex-shrink:0 fg:gray-60 transition:transform|100ms|linear" width="20" stroke-width="2" />
      </template>
    </Input>
    <Datalist
      ref="dataList"
      popover
      :id="idOptions"
      :anchor="idLabel"
      @toggle="onToggle"
      @mousedown.prevent
    >
      <div
        v-for="(option, i) in filteredOptions"
        class="flex ai:center gap:8 bg:gray-50/.1:hover px:12 py:8 r:8 cursor:pointer transition:background-color|100ms|linear"
        :key="i"
        @click="selectOption(option)"
      >
        {{ option.key }}
        <template v-if="multiple">
          <IconSquareRoundedCheckFilled v-if="option.selected" class="ml:auto fg:gray-60 my:-3 mr:-3" width="24" />
          <IconSquareRounded v-else class="ml:auto fg:gray-30 my:-3 mr:-3" width="24" stroke-width="1" />
        </template>
      </div>
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
