/// <reference types="histoire" />

import { HstSvelte } from '@histoire/plugin-svelte'
import { sveltekit } from '@sveltejs/kit/vite'
import type { UserConfig } from 'vite'

const config: UserConfig = {
	plugins: [sveltekit()],
	histoire: {
		plugins: [HstSvelte()]
	}
}

export default config
