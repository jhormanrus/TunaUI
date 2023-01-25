<script lang="ts">
  import '../app.css'
  import { Input } from '../lib/index'
</script>

<div class="grid place-items-center min-h-screen">
  <div class="flex gap-4">
    <Input id="xd" label="Usuario" type="date"></Input>
    <Input id="xd" label="Usuario" placeholder="ingresa suario" size="sm"></Input>
    <Input id="xd" label="Usuario" placeholder="ingresa suario"></Input>
    <Input id="xd" label="Usuario" placeholder="ingresa suario" size="lg"></Input>
  </div>
  <div class="gap-4">
    <button type='button' class='button button--sm'>Hola mundo!</button>
    <button type='button' class='button'>Hola mundo!</button>
    <button type='button' class='button button--lg'>Hola mundo!</button>
    <button type='button' class='button button--success'>Hola mundo!</button>
    <button type='button' class='button button--warning'>Hola mundo!</button>
    <button type='button' class='button button--info'>Hola mundo!</button>
    <button type='button' class='button button--danger'>Hola mundo!</button>
  </div>
</div>

<style lang="postcss">
  .button {
    @apply font-bold py-2 px-4 rounded-lg whitespace-nowrap;
    @apply text-white;
    @apply bg-blue-600 hover:after:bg-blue-500;
    @apply translate-x-0 translate-y-0;
    @apply border-solid border-transparent;
    @apply border-0 border-b-[2px];
  }
  .button::after {
    content: '';
    @apply bg-blue-400 bg-clip-padding;
    @apply absolute;
    @apply border-solid border-transparent border-0 border-b-[2px];
    @apply rounded-lg;
    @apply -bottom-[2px] left-0 right-0 top-0;
    z-index: -1;
  }

  .button:active {
    @apply border-0 border-t-[2px];
    @apply bg-transparent;
  }

  .button--success {
    @apply after:bg-green-400 hover:after:bg-green-500;
    @apply bg-green-600;
  }

  .button--warning {
    @apply after:bg-yellow-400 hover:after:bg-yellow-500;
    @apply bg-yellow-600;
  }

  .button--danger {
    @apply after:bg-red-400 hover:after:bg-red-500;
    @apply bg-red-600;
  }

  .button--info {
    @apply after:bg-sky-400 hover:after:bg-sky-500;
    @apply bg-sky-600;
  }

  .button--sm {
    @apply py-1 px-2;
  }

  .button--lg {
    @apply text-lg;
    @apply py-3 px-6;
  }
</style>