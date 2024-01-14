<script setup lang="ts">
import { ref } from 'vue'

defineExpose({
  open,
  close
})

const dialog = ref<HTMLDialogElement>()

function open (): undefined {
  dialog.value?.showModal()
  dialog.value?.addEventListener('click', close)
  for (const child of dialog.value?.children ?? []) {
    child.addEventListener('click', stopPropagation)
  }
}

function close (): undefined {
  for (const child of dialog.value?.children ?? []) {
    child.removeEventListener('click', stopPropagation)
  }
  dialog.value?.removeEventListener('click', close)
  dialog.value?.close()
}

function stopPropagation (e: Event): undefined {
  e.stopPropagation()
}
</script>

<template>
  <dialog ref="dialog" class="bg:gray-90/.3::backdrop bg:transparent p:0">
    <slot></slot>
  </dialog>
</template>
