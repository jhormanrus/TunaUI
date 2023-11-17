<button
  class="inline-flex ai:center b:2 b:gray-80 bg:white f:16 fg:gray-20 font:medium gap:8 h:40 jc:center px:16 py:8 r:12"
  type="button"
>
  <slot />
</button>

<style>
  button {
    --highlight-size: 0;
    box-shadow: 0 7px 14px -5px hsl(220 3% 15%/calc(1% + 5%)), 0 1px #dee2e6,0 0 0 var(--highlight-size) hsl(210 11% 71%/25%);

    transition-property: box-shadow;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
  button:where(:not(:active):hover) {
    --highlight-size: .375rem;
  }
  button:focus-visible {
    outline-color: blue;
    outline-offset: 5px;
  }
</style>
