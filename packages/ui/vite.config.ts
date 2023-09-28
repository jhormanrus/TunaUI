/// <reference types="histoire" />

import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { HstSvelte } from '@histoire/plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
	server: {
		host: true
	},
	histoire: {
		plugins: [HstSvelte()],
		setupFile: '/src/histoire-setup.ts',
		theme: {
			title: 'Tuna UI'
		},
		tree: {
			groups: [
				{
					id: 'top',
					title: '',
				},
			],
		}
	}
})
