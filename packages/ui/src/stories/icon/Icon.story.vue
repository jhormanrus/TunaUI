<script setup lang="ts">
import { ref } from 'vue'
import IconAt from '../../components/icon/IconAt.vue'
import IconCalendar from '../../components/icon/IconCalendar.vue'
import IconCheck from '../../components/icon/IconCheck.vue'
import IconInfoCircle from '../../components/icon/IconInfoCircle.vue'
import IconMoodHappy from '../../components/icon/IconMoodHappy.vue'
import IconSearch from '../../components/icon/IconSearch.vue'
import IconSelector from '../../components/icon/IconSelector.vue'
import IconX from '../../components/icon/IconX.vue'

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
