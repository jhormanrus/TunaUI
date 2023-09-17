<button
  class="b:2 b:gray-80 r:8 bg:white px:16 py:8 font:medium fg:gray-20 inline-flex jc:center ai:center gap:8 f:16 h:40"
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
