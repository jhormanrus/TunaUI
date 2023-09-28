/// <reference types="histoire" />

import { HstSvelte } from '@histoire/plugin-svelte'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [sveltekit()],
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
