<script setup lang="ts">
import { ref } from 'vue'
import IconAdjustments from '../../components/icon/IconAdjustments.vue'
import IconAdjustmentsHorizontal from '../../components/icon/IconAdjustmentsHorizontal.vue'
import IconAlertCircle from '../../components/icon/IconAlertCircle.vue'
import IconArchive from '../../components/icon/IconArchive.vue'
import IconAssembly from '../../components/icon/IconAssembly.vue'
import IconBackspace from '../../components/icon/IconBackspace.vue'
import IconBell from '../../components/icon/IconBell.vue'
import IconBellRinging from '../../components/icon/IconBellRinging.vue'
import IconBookmark from '../../components/icon/IconBookmark.vue'
import IconBookmarks from '../../components/icon/IconBookmarks.vue'
import IconBoxMultiple from '../../components/icon/IconBoxMultiple.vue'
import IconCaretDown from '../../components/icon/IconCaretDown.vue'
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
    <Variant title="adjustments">
      <IconAdjustments :width="width" :height="height" />
    </Variant>
    <Variant title="adjustments-horizontal">
      <IconAdjustmentsHorizontal :width="width" :height="height" />
    </Variant>
    <Variant title="alert-circle">
      <IconAlertCircle :width="width" :height="height" />
    </Variant>
    <Variant title="archive">
      <IconArchive :width="width" :height="height" />
    </Variant>
    <Variant title="assembly">
      <IconAssembly :width="width" :height="height" />
    </Variant>
    <Variant title="backspace">
      <IconBackspace :width="width" :height="height" />
    </Variant>
    <Variant title="bell">
      <IconBell :width="width" :height="height" />
    </Variant>
    <Variant title="bell-ringing">
      <IconBellRinging :width="width" :height="height" />
    </Variant>
    <Variant title="bookmark">
      <IconBookmark :width="width" :height="height" />
    </Variant>
    <Variant title="bookmarks">
      <IconBookmarks :width="width" :height="height" />
    </Variant>
    <Variant title="box-multiple">
      <IconBoxMultiple :width="width" :height="height" />
    </Variant>
    <Variant title="caret-down">
      <IconCaretDown :width="width" :height="height" />
    </Variant>
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
