module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  transform: {
    "^.+\\.vue$": "vue-jest",
  },

  testMatch: ["**/*.spec.ts"],

  // setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
