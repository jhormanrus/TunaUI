<script lang="ts">
  export let id: string
  export let type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' = 'text'
  export let size: 'sm' | 'lg' | null = null
  export let label: string
  export let placeholder = ''
</script>

<div class="input-field" class:sm={size === 'sm'} class:lg={size === 'lg'}>
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    required
  />
  <label for={id}>{label}</label>
</div>

<style lang="postcss">
  .input-field {
    @apply relative;
  }
  .input-field > input {
    @apply w-full;
    @apply bg-gray-200;
    @apply outline-blue-500;
    @apply rounded-lg;
    @apply px-3 pt-6 pb-2;
    @apply transition-colors;
  }
  .input-field > input::placeholder {
    @apply text-transparent;
    @apply transition-colors;
  }
  .input-field > input:focus::placeholder,
  .input-field > input:valid::placeholder {
    @apply text-gray-400;
  }
  .input-field > input:hover {
    @apply bg-gray-100;
  }
  .input-field > input:focus {
    @apply bg-gray-200;
  }

  .input-field > label {
    @apply absolute;
    @apply text-gray-500;
    @apply top-0 left-0;
    @apply transition-transform;
    @apply pointer-events-none;
    @apply origin-top-left;
    @apply translate-x-3 translate-y-4 scale-100;
  }
  .input-field > input:focus ~ label {
    @apply text-blue-700;
    @apply translate-y-2 scale-75;
  }
  .input-field > input:valid ~ label {
    @apply translate-y-2 scale-75;
  }

  .input-field.sm > input {
    @apply pt-5 pb-1;
  }
  .input-field.sm > label {
    @apply translate-y-3 scale-100;
  }
  .input-field.sm > input:focus ~ label,
  .input-field.sm > input:valid ~ label {
    @apply translate-y-1 scale-75;
  }

  .input-field.lg > input {
    @apply text-lg;
    @apply px-4 pt-8 pb-3;
  }
  .input-field.lg > label {
    @apply text-lg;
    @apply translate-x-4 translate-y-5 scale-100;
  }
  .input-field.lg > input:focus ~ label,
  .input-field.lg > input:valid ~ label {
    @apply translate-y-3 scale-75;
  }
</style>
