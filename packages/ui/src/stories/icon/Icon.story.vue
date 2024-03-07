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
import IconCoins from '../../components/icon/IconCoins.vue'
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
import IconFilter from '../../components/icon/IconFilter.vue'
import IconGift from '../../components/icon/IconGift.vue'
import IconHash from '../../components/icon/IconHash.vue'
import IconHeadphones from '../../components/icon/IconHeadphones.vue'
import IconHeart from '../../components/icon/IconHeart.vue'
import IconHeartFilled from '../../components/icon/IconHeartFilled.vue'
import IconHistory from '../../components/icon/IconHistory.vue'
import IconInfoCircle from '../../components/icon/IconInfoCircle.vue'
import IconMoodHappy from '../../components/icon/IconMoodHappy.vue'
import IconSearch from '../../components/icon/IconSearch.vue'
import IconSelector from '../../components/icon/IconSelector.vue'
import IconSquareRounded from '../../components/icon/IconSquareRounded.vue'
import IconSquareRoundedCheckFilled from '../../components/icon/IconSquareRoundedCheckFilled.vue'
import IconSquareRoundedMinusFilled from '../../components/icon/IconSquareRoundedMinusFilled.vue'
import IconX from '../../components/icon/IconX.vue'

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
  { name: 'coins', component: IconCoins },
  { name: 'color-swatch', component: IconColorSwatch },
  { name: 'cookie', component: IconCookie },
  { name: 'credit-card', component: IconCreditCard },
  { name: 'crop', component: IconCrop },
  { name: 'cut', component: IconCut },
  { name: 'dots', component: IconDots },
  { name: 'dots-vertical', component: IconDotsVertical },
  { name: 'eye', component: IconEye },
  { name: 'eye-closed', component: IconEyeClosed },
  { name: 'file', component: IconFile },
  { name: 'files', component: IconFiles },
  { name: 'filter', component: IconFilter },
  { name: 'gift', component: IconGift },
  { name: 'hash', component: IconHash },
  { name: 'headphones', component: IconHeadphones },
  { name: 'heart', component: IconHeart },
  { name: 'heart-filled', component: IconHeartFilled },
  { name: 'history', component: IconHistory },
  { name: 'info-circle', component: IconInfoCircle },
  { name: 'mood-happy', component: IconMoodHappy },
  { name: 'search', component: IconSearch },
  { name: 'selector', component: IconSelector },
  { name: 'square-rounded', component: IconSquareRounded },
  {
    name: 'square-rounded-check-filled',
    component: IconSquareRoundedCheckFilled,
  },
  {
    name: 'square-rounded-minus-filled',
    component: IconSquareRoundedMinusFilled,
  },
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
