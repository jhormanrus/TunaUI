<script lang="ts">
  export let id: string
  export let type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' = 'text'
  export let size: 'sm' | 'md' | 'lg' = 'md'
  export let label: string = ''
  export let placeholder: string = ''

  const sizeClass = {
    sm: 'form__input-field--sm',
    md: '',
    lg: 'form__input-field--lg'
  }
</script>

<div class={`form__input-field ${size ? sizeClass[size] : ''}`}>
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    required
  />
  <label for={id}>{label}</label>
</div>

<style lang="postcss">
  .form__input-field {
    @apply relative;
  }
  
  .form__input-field > input {
    @apply w-full;
    @apply bg-gray-200;
    @apply outline-blue-500;
    @apply rounded-lg;
    @apply px-3 pt-6 pb-2;
    @apply transition-colors;
  }
  .form__input-field > input::placeholder {
    @apply text-transparent;
    @apply transition-colors;
  }
  .form__input-field > input:focus::placeholder,
  .form__input-field > input:valid::placeholder {
    @apply text-gray-400;
  }
  .form__input-field > input:hover {
    @apply bg-gray-100;
  }
  .form__input-field > input:focus {
    @apply bg-gray-200;
  }

  .form__input-field > label {
    @apply absolute;
    @apply text-gray-500;
    @apply top-0 left-0;
    @apply transition-transform;
    @apply pointer-events-none;
    @apply origin-top-left;
    @apply translate-x-3 translate-y-4 scale-100;
  }
  .form__input-field > input:focus ~ label {
    @apply text-blue-700;
    @apply translate-y-2 scale-75;
  }
  .form__input-field > input:valid ~ label {
    @apply translate-y-2 scale-75;
  }

  .form__input-field--sm > input {
    @apply pt-5 pb-1;
  }
  .form__input-field--sm > label {
    @apply translate-y-3 scale-100;
  }
  .form__input-field--sm > input:focus ~ label,
  .form__input-field--sm > input:valid ~ label {
    @apply translate-y-1 scale-75;
  }

  .form__input-field--lg > input {
    @apply text-lg;
    @apply px-4 pt-8 pb-3;
  }
  .form__input-field--lg > label {
    @apply text-lg;
    @apply translate-x-4 translate-y-5 scale-100;
  }
  .form__input-field--lg > input:focus ~ label,
  .form__input-field--lg > input:valid ~ label {
    @apply translate-y-3 scale-75;
  }
</style>