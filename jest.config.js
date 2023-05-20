/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",

    rootDir: "./tests/jest",

    // Add support for `@/` import alias
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/../../src/$1",
    },
}
