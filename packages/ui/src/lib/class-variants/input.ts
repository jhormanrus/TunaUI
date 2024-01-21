import cv from 'class-variant'

export const label = cv(
  'abs fg:gray-50 fg:control-label:has(+:focus) left:0 pointer-events:none top:0 transform-origin:top|left transition:transform|100ms|ease-in',
  {
    size: {
      sm: 'translate(12,14) translate(12,8)scale(.75):has(+:not(:placeholder-shown),+:focus)',
      md: 'translate(14,18) translate(14,10)scale(.75):has(+:not(:placeholder-shown),+:focus)',
      lg: 'translate(16,22) translate(16,14)scale(.75):has(+:not(:placeholder-shown),+:focus)',
    },
  },
)

export const wrapper = cv(
  `
    block rel
    bg:gray-5 bg:gray-10:has(:not(input:focus-visible):hover)
    transition:background-color|150ms|ease-in,box-shadow|150ms|ease-in
    $highlight-size:0 $highlight-size:1px:has(input:focus-visible)
    shadow:0|0|0|$(highlight-size)|gray-50,0|0|0|calc($(highlight-size)*5)|gray-50/.2
  `,
  {
    size: {
      sm: 'f:16 pb:5 pt:21 px:12 r:10',
      md: 'f:16 pb:8 pt:26 px:14 r:12',
      lg: 'f:18 pb:12 pt:32 px:16 r:14',
    },
  },
)

export const input = cv(
  'w:full fg:transparent::placeholder fg:gray-60:not(:placeholder-shown)::placeholder fg:control-placeholder:focus::placeholder outline:none',
)
