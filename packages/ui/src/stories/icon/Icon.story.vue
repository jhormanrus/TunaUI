<script setup lang="ts">
import { ref } from 'vue'
import IconAt from '../../lib/icon/IconAt.vue'
import IconCalendar from '../../lib/icon/IconCalendar.vue'
import IconCheck from '../../lib/icon/IconCheck.vue'
import IconInfoCircle from '../../lib/icon/IconInfoCircle.vue'
import IconMoodHappy from '../../lib/icon/IconMoodHappy.vue'
import IconSearch from '../../lib/icon/IconSearch.vue'
import IconSelector from '../../lib/icon/IconSelector.vue'
import IconX from '../../lib/icon/IconX.vue'

const width = ref()
const height = ref()
</script>

<template>
  <Story :layout="{ type: 'grid', width: 100 }">
    <Variant title="at">
      <IconAt :width="width" :height="height" />
    </Variant>
    <Variant title="calendar">
      <IconCalendar :width="width" :height="height" />
    </Variant>
    <Variant title="check">
      <IconCheck :width="width" :height="height" />
    </Variant>
    <Variant title="info-circle">
      <IconInfoCircle :width="width" :height="height" />
    </Variant>
    <Variant title="mood-happy">
      <IconMoodHappy :width="width" :height="height" />
    </Variant>
    <Variant title="search">
      <IconSearch :width="width" :height="height" />
    </Variant>
    <Variant title="selector">
      <IconSelector :width="width" :height="height" />
    </Variant>
    <Variant title="x">
      <IconX :width="width" :height="height" />
    </Variant>
    <template #controls>
      <HstText v-model="width" title="width" />
      <HstText v-model="height" title="height" />
    </template>
  </Story>
</template>
