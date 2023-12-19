module.exports = {
	overrides: [
		{
			files: ['*.svelte'],
			extends: [
				'@master/css',
				'standard-with-typescript',
				'plugin:@typescript-eslint/recommended',
				'plugin:svelte/recommended',
				'eslint:recommended',
			],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
				extraFileExtensions: ['.svelte', '.vue']
			}
		},
		{
			files: ['*.vue'],
			extends: [
				'@master/css',
				'standard-with-typescript',
				'plugin:@typescript-eslint/recommended',
				'plugin:vue/vue3-essential',
				'eslint:recommended',
				'@vue/eslint-config-typescript',
			],
			parserOptions: {
				parser: '@typescript-eslint/parser',
				extraFileExtensions: ['.svelte', '.vue']
			}
		}
	],
	ignorePatterns: ['*.js']
}
