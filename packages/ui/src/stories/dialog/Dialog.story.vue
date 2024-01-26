<script setup lang="ts">
import { ref } from 'vue'
import Dialog from '../../components/dialog/Dialog.vue'

const dialog = ref<InstanceType<typeof Dialog>>()
</script>

<template>
  <Story>
    <Variant title="primary">
      <button @click="dialog?.open">open</button>
      <Dialog ref="dialog">
        <div class="bg:white p:20">
          <button @click="dialog?.close">close</button>
        </div>
      </Dialog>
    </Variant>
  </Story>
</template>
