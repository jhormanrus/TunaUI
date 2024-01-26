import cv from 'class-variant'

export const cvWrapper = cv(
  `
    h:40 inline-flex jc:center ai:center gap:8
    bg:white b:2 b:gray-20 outline:2|solid|blue-50:focus-visible outline-offset:2
    f:16 fg:gray-80 font:medium px:16 py:8 r:12
    transition:box-shadow|150ms|ease-in
    $highlight-size:0 $highlight-size:5px:not(:active):hover
    shadow:0|0|0|$(highlight-size)|gray-20/.2
  `,
  {
    intent: {
      primary: 'bg:blue bg:blue-55:hover fg:white',
      secondary: 'bg:white bg:slate-90:hover fg:slate-30'
    },
    size: {
      sm: 'text:14 p:5|15',
      md: 'text:16 p:10|25'
    }
  }
)
