import cv from 'class-variant'

export const cvInput = cv(
  'w:full fg:transparent::placeholder fg:gray-60:not(:placeholder-shown)::placeholder fg:control-placeholder:focus::placeholder outline:none',
  ({ autoresize }) => autoresize && '{field-sizing:content}'
)
