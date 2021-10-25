module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ["metarhia"],
	parserOptions: {
		ecmaFeatures: {
			jsx: false,
		},
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["prettier"],
	rules: {
		quotes: [2, "double", { avoidEscape: true }],
		indent: ["error", "tab"],
		"linebreak-style": ["error", "windows"],
	},
};
