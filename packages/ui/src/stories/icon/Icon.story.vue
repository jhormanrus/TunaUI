<script setup lang="ts">
import { ref } from 'vue'
import IconX from '../../components/icon/IconX.vue'
import IconSelector from '../../components/icon/IconSelector.vue'
import IconSearch from '../../components/icon/IconSearch.vue'
import IconsCoins from '../../components/icon/IconsCoins.vue'
import IconMoodHappy from '../../components/icon/IconMoodHappy.vue'
import IconInfoCircle from '../../components/icon/IconInfoCircle.vue'
import IconCreditCard from '../../components/icon/IconCreditCard.vue'
import IconClock from '../../components/icon/IconClock.vue'
import IconClipboard from '../../components/icon/IconClipboard.vue'
import IconChevronUp from '../../components/icon/IconChevronUp.vue'
import IconChevronRight from '../../components/icon/IconChevronRight.vue'
import IconChevronLeft from '../../components/icon/IconChevronLeft.vue'
import IconChevronDown from '../../components/icon/IconChevronDown.vue'
import IconChecks from '../../components/icon/IconChecks.vue'
import IconCheck from '../../components/icon/IconCheck.vue'
import IconChartBar from '../../components/icon/IconChartBar.vue'
import IconCaretDown from '../../components/icon/IconCaretDown.vue'
import IconCalendar from '../../components/icon/IconCalendar.vue'
import IconBoxMultiple from '../../components/icon/IconBoxMultiple.vue'
import IconBookmarks from '../../components/icon/IconBookmarks.vue'
import IconBookmark from '../../components/icon/IconBookmark.vue'
import IconBellRinging from '../../components/icon/IconBellRinging.vue'
import IconBell from '../../components/icon/IconBell.vue'
import IconBackspace from '../../components/icon/IconBackspace.vue'
import IconAt from '../../components/icon/IconAt.vue'
import IconAssembly from '../../components/icon/IconAssembly.vue'
import IconArchive from '../../components/icon/IconArchive.vue'
import IconAlertCircle from '../../components/icon/IconAlertCircle.vue'
import IconAdjustmentsHorizontal from '../../components/icon/IconAdjustmentsHorizontal.vue'
import IconAdjustments from '../../components/icon/IconAdjustments.vue'

const width = ref()
const height = ref()

const icons = [
  { name: 'adjustments', component: IconAdjustments },
  { name: 'adjustments-horizontal', component: IconAdjustmentsHorizontal },
  { name: 'alert-circle', component: IconAlertCircle },
  { name: 'archive', component: IconArchive },
  { name: 'assembly', component: IconAssembly },
  { name: 'at', component: IconAt },
  { name: 'backspace', component: IconBackspace },
  { name: 'bell', component: IconBell },
  { name: 'bell-ringing', component: IconBellRinging },
  { name: 'bookmark', component: IconBookmark },
  { name: 'bookmarks', component: IconBookmarks },
  { name: 'box-multiple', component: IconBoxMultiple },
  { name: 'caret-down', component: IconCaretDown },
  { name: 'chart-bar', component: IconChartBar },
  { name: 'checks', component: IconChecks },
  { name: 'chevron-down', component: IconChevronDown },
  { name: 'chevron-left', component: IconChevronLeft },
  { name: 'chevron-right', component: IconChevronRight },
  { name: 'chevron-up', component: IconChevronUp },
  { name: 'clipboard', component: IconClipboard },
  { name: 'clock', component: IconClock },
  { name: 'calendar', component: IconCalendar },
  { name: 'check', component: IconCheck },
  { name: 'credit-card', component: IconCreditCard },
  { name: 'coins', component: IconsCoins },
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
