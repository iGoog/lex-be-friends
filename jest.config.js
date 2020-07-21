module.exports = {
	preset: 'ts-jest',
	globals: {
	},
	testEnvironment: 'jsdom',
	transform: {
		"^.+\\.vue$": "vue-jest",
		"^.+\\js$": "babel-jest"
	},
	testPathIgnorePatterns: ["<rootDir>/cypress/", "<rootDir>/node_modules/", "/node_modules/"],
	moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node']
}
