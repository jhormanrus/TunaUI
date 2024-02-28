import cv from 'class-variant'

export const cvWrapper = cv('rotate(180):has(:popover-open)_svg.icon-chevron-down')

export const cvSearch = cv('{anchor-name:--select-button}')

export const cvIconChevron = cv('flex-shrink:0 fg:gray-60 transition:transform|100ms|linear',
  {
    size: {
      sm: 'w:18',
      md: 'w:22',
      lg: 'w:24',
    },
  },
)

export const cvOptionsWrapper = cv(
  'flex ai:center gap:8 bg:gray-50/.1:hover px:12 py:8 r:8 cursor:pointer transition:background-color|100ms|linear',
)

export const cvIconSelected = cv('ml:auto fg:gray-60 my:-3 mr:-3')
