<script setup lang="ts">
import { ref } from 'vue'
import DialogBase from '../../lib/Dialog/DialogBase.vue'

const dialog = ref<InstanceType<typeof DialogBase>>()
</script>

<template>
  <Story>
    <Variant title="primary">
      <button @click="dialog?.open">open</button>
      <DialogBase ref="dialog">
        <div class="bg:white p:20">
          <button @click="dialog?.close">close</button>
        </div>
      </DialogBase>
    </Variant>
  </Story>
</template>
