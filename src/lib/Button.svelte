<button class="border-2 border-gray-300 rounded-lg bg-white px-4 py-2 font-medium text-stone-800 inline-flex justify-center items-center gap-2 transition-shadow text-base leading-none h-10">
  <slot />
</button>

<style lang="postcss">
  button {
    --highlight-size: 0;
    box-shadow: 0 7px 14px -5px hsl(220 3% 15%/calc(1% + 5%)), 0 1px #dee2e6,0 0 0 var(--highlight-size) hsl(210 11% 71%/25%);
  }
  button:where(:not(:active):hover) {
    --highlight-size: .375rem;
  }
  button:focus-visible {
    outline-color: blue;
    outline-offset: 5px;
  }
</style>
