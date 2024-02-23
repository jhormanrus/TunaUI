<script setup lang="ts" generic="T extends Record<string, any>">
import { computed, onMounted, ref } from 'vue'
import Input from '../input/Input.vue'
import IconChevronDown from '../icon/IconChevronDown.vue'
import Datalist from '../datalist/Datalist.vue'
import IconSquareRounded from '../icon/IconSquareRounded.vue'
import IconSquareRoundedCheckFilled from '../icon/IconSquareRoundedCheckFilled.vue'

const props = withDefaults(
  defineProps<{
    modelValue?: T | T[]
    label: string
    placeholder?: string
    size?: 'sm' | 'lg' | 'md'
    options: T[]
    bindValue?: string
    bindLabel?: string
    search?: boolean
    multiple?: boolean
  }>(),
  {
    bindLabel: 'label',
  }
)
const emit = defineEmits<(e: 'update:modelValue', value?: T | T[]) => undefined>()

const value = computed<T | T[] | undefined>({
  get() {
    return props.bindValue
      ? props.multiple
        ? Array.isArray(props.modelValue)
          ? props.modelValue.map(v => props.options.find(o => props.bindValue ? o[props.bindValue!] === v : o === v) ?? v)
          : []
        : props.options.find(o => o[props.bindValue!] === props.modelValue)
      : Array.isArray(props.modelValue) || !props.multiple
        ? props.modelValue
        : []
  },
  set(value) {
    emit(
      'update:modelValue',
      props.bindValue
        ? props.multiple
          ? (value as T[]).map(v => (props.bindValue ? v[props.bindValue] : v))
          : (value as T)[props.bindValue]
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
  if (props.multiple) {
    return (value.value as T[])
      .reduce<string[]>((list, element) => list.concat(element[props.bindLabel]?? element), [])
      .join(', ')
  }
  return (value.value as T)[props.bindLabel]?? value.value
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

function selectOption(option: T) {
  searchQuery.value = ''
  if (props.multiple) {
    const opIndex = (value.value as T[])
      .map(o => (props.bindValue ? o[props.bindValue] : o))
      .indexOf(props.bindValue ? option[props.bindValue] : option)
    if (opIndex >= 0) {
      value.value = (value.value as T[]).filter((_, i) => i !== opIndex)
    } else {
      value.value = (value.value as T[]).concat(option)
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

function isSelected(option: T) {
  if (props.multiple) {
    return props.bindValue
      ? (value.value as T[]).some(o => o[props.bindValue!] === option[props.bindValue!])
      : (value.value as T[]).includes(option)
      // : (value.value as T[]).filter(o => JSON.stringify(o) === JSON.stringify(option)).length > 0
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
