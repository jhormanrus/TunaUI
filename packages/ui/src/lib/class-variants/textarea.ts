import cv from 'class-variant'

export const cvWrapper = cv(
  `
    flex
    bg:gray-5 bg:gray-10:has(:not(textarea:focus-visible):hover)
    transition:background-color|150ms|ease-in,box-shadow|150ms|ease-in
    $highlight-size:0 $highlight-size:1px:has(textarea:focus-visible)
    shadow:0|0|0|$(highlight-size)|gray-50,0|0|0|calc($(highlight-size)*5)|gray-50/.2
  `,
  {
    size: {
      sm: 'f:16 pt:21>div px:12 r:10',
      md: 'f:16 pt:26>div px:14 r:12',
      lg: 'f:18 pt:32>div px:16 r:14',
    },
  },
)

export const cvInputWrapper = cv(
  'rel flex-grow:1',
  {
    size: {
      sm: 'pb:5',
      md: 'pb:8',
      lg: 'pb:12',
    },
  },
)

export const cvLabel = cv(
  'abs fg:gray-50 fg:control-label:has(+:focus) left:0 pointer-events:none top:0 transform-origin:top|left transition:transform|100ms|ease-in',
  {
    size: {
      sm: 'translateY(14) translateY(8)scale(.75):has(+:not(:placeholder-shown),+:focus)',
      md: 'translateY(18) translateY(10)scale(.75):has(+:not(:placeholder-shown),+:focus)',
      lg: 'translateY(22) translateY(14)scale(.75):has(+:not(:placeholder-shown),+:focus)',
    },
  },
)

export const cvInput = cv(
  'w:full fg:transparent::placeholder fg:gray-60:not(:placeholder-shown)::placeholder fg:control-placeholder:focus::placeholder outline:none',
)
