module.exports = {
	overrides: [
		{
			files: ['*.ts'],
			extends: 'standard-with-typescript',
			rules: {
				"@typescript-eslint/strict-boolean-expressions": "off"
			}
		}
	]
}
