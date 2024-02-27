<script setup lang="ts" generic="U extends Record<string, any>">
import { computed, ref } from 'vue'
import Input from '../input/Input.vue'
import IconChevronDown from '../icon/IconChevronDown.vue'
import Datalist from '../datalist/Datalist.vue'
import IconCheck from '../icon/IconCheck.vue'
import IconSquareRounded from '../icon/IconSquareRounded.vue'
import IconSquareRoundedCheckFilled from '../icon/IconSquareRoundedCheckFilled.vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | U | string[] | number[] | U[]
    label: string
    placeholder?: string
    size?: 'sm' | 'lg' | 'md'
    options: U[]
    bindValue?: string
    bindLabel?: string
    search?: boolean
  }>(),
  {
    bindLabel: 'label',
  }
)
const emit = defineEmits<(e: 'update:modelValue', value?: U | U[]) => undefined>()

const value = computed<string | number | U | string[] | number[] | U[] | undefined>({
  get() {
    // if (props.bindValue) {
    //   return Array.isArray(props.modelValue)
    //     ? props.modelValue.map(v => props.options.find(o => props.bindValue ? o[props.bindValue!] === v : o === v) ?? v)
    //     : props.options.find(o => o[props.bindValue!] === props.modelValue)
    // } else {
    //   return props.modelValue
    // }
    if (Array.isArray(props.modelValue)) {
      return props.bindValue
        ? props.modelValue.map(v => props.options.find(o => o[props.bindValue!] === v) ?? v) as string[] | number[] | U[]
        : props.modelValue.map(v => props.options.find(o => o === v) ?? v) as string[] | number[] | U[]
    } else {
      return props.bindValue
        ? props.options.find(o => o[props.bindValue!] === props.modelValue)
        : props.modelValue
    }
  },
  set(value) {
    emit(
      'update:modelValue',
      props.bindValue
        ? Array.isArray(value)
          ? value.map(v => (props.bindValue && typeof v === 'object' ? v[props.bindValue] : v))
          : value instanceof Object && value[props.bindValue]
        : value
    )
  }
})

const dataList = ref<InstanceType<typeof Datalist>>()
const open = ref(false)
const searchQuery = ref('')

const filteredOptions = computed(() => {
  const selectedOptions = props.options.map(option => ({
    ...option,
    selected: isSelected(option)
  }))
  if (searchQuery.value.length > 0) {
    return selectedOptions.filter(option => {
      const normalizedKey = normalizeWord(option[props.bindLabel].toLowerCase())
      const normalizedQuery = normalizeWord(searchQuery.value.toLowerCase())
      const arrayQuery = normalizedQuery.split(/\s+/)
      return arrayQuery.every(word => normalizedKey.includes(word))
    })
  }
  return selectedOptions
})
const formattedValue = computed<string>(() => {
  if (!value.value) return ''
  if (Array.isArray(value.value)) {
    return value.value
      .reduce((list, element) => list.concat((element as U)[props.bindLabel]?? element), [])
      .join(', ')
  }
  return (value.value as U)[props.bindLabel]?? value.value
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
const isMultiple = computed(() => Array.isArray(props.modelValue))

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

function selectOption(option: U) {
  searchQuery.value = ''
  if (Array.isArray(value.value)) {
    const opIndex = value.value
      .map(o => (props.bindValue ? (o as U)[props.bindValue] : o))
      .indexOf(props.bindValue ? option[props.bindValue] : option)
    if (opIndex >= 0) {
      value.value = value.value.filter((_, i) => i !== opIndex) as string[] | number[] | U[]
    } else {
      value.value = value.value.concat(option) as string[] | number[] | U[]
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

function isSelected(option: U) {
  if (Array.isArray(value.value)) {
    return props.bindValue
      ? value.value.some(o => (o as U)[props.bindValue!] === option[props.bindValue!])
      : (value.value as U[]).includes(option)
  }
  return value.value === (props.bindValue ? option[props.bindValue] : option)
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
        {{ option.label }}
        <template v-if="isMultiple">
          <IconSquareRoundedCheckFilled v-if="option.selected" class="ml:auto fg:gray-60 my:-3 mr:-3" width="24" />
          <IconSquareRounded v-else class="ml:auto fg:gray-30 my:-3 mr:-3" width="24" stroke-width="1" />
        </template>
        <template v-else>
          <IconCheck v-if="option.selected" class="ml:auto fg:gray-60 my:-3 mr:-3" width="20" stroke-width="2" />
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
