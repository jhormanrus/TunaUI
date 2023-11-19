module.exports = {
	root: true,
	extends: [
		'@master/css',
		'standard-with-typescript',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 'latest',
		extraFileExtensions: ['.svelte', '.vue'],
		project: './tsconfig.json'
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			extends: ['plugin:svelte/recommended'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
			}
		},
		{
			files: ['*.vue'],
			extends: ['plugin:vue/vue3-essential', '@vue/eslint-config-typescript'],
			parserOptions: {
				parser: '@typescript-eslint/parser',
			}
		}
	],
	rules: {
		'@typescript-eslint/triple-slash-reference': 'off'
	},
	ignorePatterns: ['*.cjs', '*.js']
}
