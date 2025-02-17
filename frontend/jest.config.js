module.exports = {
    preset: "@vue/cli-plugin-unit-jest/presets/babel",
    testEnvironment: "jsdom",
    moduleFileExtensions: ["js", "jsx", "json", "vue", "ts", "tsx"],
    transform: {
      "^.+\\.vue$": "@vue/vue3-jest",
      "^.+\\.(js|jsx|mjs|cjs)$": "babel-jest",
      "^.+\\.tsx?$": "ts-jest",
    },
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1",
    },
    testMatch: [
      "**/tests/unit/**/*.spec.[jt]s?(x)",
      "**/tests/integration/**/*.spec.[jt]s?(x)",
      "**/__tests__/*.[jt]s?(x)",
    ],
    testEnvironmentOptions: {
      customExportConditions: ["node", "node-addons"],
    },
    globals: {
      "ts-jest": {
        tsconfig: "tsconfig.json",
      },
    },
  }
  
  