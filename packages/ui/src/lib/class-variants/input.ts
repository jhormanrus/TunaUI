import cv from 'class-variant'

export const label = cv(
  'abs fg:gray-50 fg:control-label:has(+:focus) left:0 pointer-events:none top:0 transform-origin:top|left transition:transform|100ms|ease-in',
  {
    size: {
      sm: 'f:16 translate(12,14) translate(12,8)scale(.75):has(+:valid) translate(12,8)scale(.75):has(+:focus)',
      md: 'f:16 translate(14,18) translate(14,10)scale(.75):has(+:valid) translate(14,10)scale(.75):has(+:focus)',
      lg: 'f:18 translate(16,22) translate(16,14)scale(.75):has(+:valid) translate(16,14)scale(.75):has(+:focus)',
    },
  },
)

export const input = cv(
  'bg:control-bg bg:control-hover-bg:hover bg:control-hover-bg:focus fg:transparent::placeholder fg:gray-60:valid::placeholder fg:control-placeholder:focus::placeholder outline:control-outline|solid|2:focus-visible transition:background-color|150ms|ease-in w:full',
  {
    size: {
      sm: 'f:16 pb:5 pt:21 px:12 r:10',
      md: 'f:16 pb:8 pt:26 px:14 r:12',
      lg: 'f:18 pb:12 pt:32 px:16 r:14',
    },
  },
)
