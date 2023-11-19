/// <reference types="histoire" />

import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import vue from '@vitejs/plugin-vue'
import { HstSvelte } from '@histoire/plugin-svelte'
import { HstVue } from '@histoire/plugin-vue'

export default defineConfig({
  plugins: [svelte(), vue()],
  server: {
    host: true
  },
  histoire: {
    plugins: [HstSvelte(), HstVue()],
    setupFile: '/src/histoire-setup.ts',
    theme: {
      title: 'Tuna UI'
    },
    tree: {
      groups: [
        {
          id: 'top',
          title: ''
        }
      ]
    }
  }
})
