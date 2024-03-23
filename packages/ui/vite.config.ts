/// <reference types="histoire" />

import { HstSvelte } from '@histoire/plugin-svelte'
import { HstVue } from '@histoire/plugin-vue'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [svelte(), vue()],
  server: {
    host: true,
  },
  histoire: {
    plugins: [HstSvelte(), HstVue()],
    setupFile: '/src/histoire-setup.ts',
    routerMode: 'hash',
    theme: {
      title: 'Lidia UI',
    },
    tree: {
      groups: [
        {
          id: 'top',
          title: '',
        },
        {
          title: 'Svelte',
          include: (file) => /\.story\.svelte$/.test(file.path),
        },
        {
          title: 'Vue',
          include: (file) => /\.story\.vue$/.test(file.path),
        },
      ],
    },
  },
})
