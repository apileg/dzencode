/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",

    rootDir: "./tests/jest",

    // Add support for `@/` import alias
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/../../src/$1",
    },
}
