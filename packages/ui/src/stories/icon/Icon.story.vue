<script setup lang="ts">
import { ref } from 'vue'
import IconAdjustments from '../../components/icon/IconAdjustments.vue'
import IconAdjustmentsHorizontal from '../../components/icon/IconAdjustmentsHorizontal.vue'
import IconAlertCircle from '../../components/icon/IconAlertCircle.vue'
import IconArchive from '../../components/icon/IconArchive.vue'
import IconAssembly from '../../components/icon/IconAssembly.vue'
import IconAt from '../../components/icon/IconAt.vue'
import IconBackspace from '../../components/icon/IconBackspace.vue'
import IconBell from '../../components/icon/IconBell.vue'
import IconBellRinging from '../../components/icon/IconBellRinging.vue'
import IconBookmark from '../../components/icon/IconBookmark.vue'
import IconBookmarks from '../../components/icon/IconBookmarks.vue'
import IconBoxMultiple from '../../components/icon/IconBoxMultiple.vue'
import IconCalendar from '../../components/icon/IconCalendar.vue'
import IconCaretDown from '../../components/icon/IconCaretDown.vue'
import IconChartBar from '../../components/icon/IconChartBar.vue'
import IconCheck from '../../components/icon/IconCheck.vue'
import IconChecks from '../../components/icon/IconChecks.vue'
import IconChevronDown from '../../components/icon/IconChevronDown.vue'
import IconChevronLeft from '../../components/icon/IconChevronLeft.vue'
import IconChevronRight from '../../components/icon/IconChevronRight.vue'
import IconChevronUp from '../../components/icon/IconChevronUp.vue'
import IconClipboard from '../../components/icon/IconClipboard.vue'
import IconClock from '../../components/icon/IconClock.vue'
import IconColorSwatch from '../../components/icon/IconColorSwatch.vue'
import IconCookie from '../../components/icon/IconCookie.vue'
import IconCreditCard from '../../components/icon/IconCreditCard.vue'
import IconCrop from '../../components/icon/IconCrop.vue'
import IconCut from '../../components/icon/IconCut.vue'
import IconDots from '../../components/icon/IconDots.vue'
import IconDotsVertical from '../../components/icon/IconDotsVertical.vue'
import IconEye from '../../components/icon/IconEye.vue'
import IconEyeClosed from '../../components/icon/IconEyeClosed.vue'
import IconFile from '../../components/icon/IconFile.vue'
import IconFiles from '../../components/icon/IconFiles.vue'
import IconInfoCircle from '../../components/icon/IconInfoCircle.vue'
import IconMoodHappy from '../../components/icon/IconMoodHappy.vue'
import IconsCoins from '../../components/icon/IconsCoins.vue'
import IconSearch from '../../components/icon/IconSearch.vue'
import IconSelector from '../../components/icon/IconSelector.vue'
import IconX from '../../components/icon/IconX.vue'

const width = ref()
const height = ref()

const icons = [
  { name: 'adjustments-horizontal', component: IconAdjustmentsHorizontal },
  { name: 'adjustments', component: IconAdjustments },
  { name: 'alert-circle', component: IconAlertCircle },
  { name: 'archive', component: IconArchive },
  { name: 'assembly', component: IconAssembly },
  { name: 'at', component: IconAt },
  { name: 'backspace', component: IconBackspace },
  { name: 'bell-ringing', component: IconBellRinging },
  { name: 'bell', component: IconBell },
  { name: 'bookmark', component: IconBookmark },
  { name: 'bookmarks', component: IconBookmarks },
  { name: 'box-multiple', component: IconBoxMultiple },
  { name: 'calendar', component: IconCalendar },
  { name: 'caret-down', component: IconCaretDown },
  { name: 'chart-bar', component: IconChartBar },
  { name: 'check', component: IconCheck },
  { name: 'checks', component: IconChecks },
  { name: 'chevron-down', component: IconChevronDown },
  { name: 'chevron-left', component: IconChevronLeft },
  { name: 'chevron-right', component: IconChevronRight },
  { name: 'chevron-up', component: IconChevronUp },
  { name: 'clipboard', component: IconClipboard },
  { name: 'clock', component: IconClock },
  { name: 'coins', component: IconsCoins },
  { name: 'credit-card', component: IconCreditCard },
  { name: 'info-circle', component: IconInfoCircle },
  { name: 'mood-happy', component: IconMoodHappy },
  { name: 'search', component: IconSearch },
  { name: 'selector', component: IconSelector },
  { name: 'x', component: IconX },
]
</script>

<template>
  <Story :layout="{ type: 'grid', width: 100 }">
    <template v-for="icon in icons" :key="icon.name">
      <Variant :title="icon.name">
        <component :is="icon.component" :width="width" :height="height" />
      </Variant>
    </template>
    <template #controls>
      <HstText v-model="width" title="width" />
      <HstText v-model="height" title="height" />
    </template>
  </Story>
</template>
