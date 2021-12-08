module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ["metarhia", "plugin:sonarjs/recommended"],
	parserOptions: {
		ecmaFeatures: {
			jsx: false,
		},
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["prettier", "sonarjs"],
	rules: {
		quotes: [2, "double", { avoidEscape: true }],
		indent: ["error", "tab"],
		"linebreak-style": ["error", "windows"],
		"sonarjs/cognitive-complexity": "error",
		"sonarjs/no-identical-expressions": "error",
	},
};
