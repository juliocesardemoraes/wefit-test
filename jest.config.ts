/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: "ts-jest/presets/default-esm",
  testPathIgnorePatterns: ["/node_modules/"],
  transform: {},
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  testMatch: ["**/*.spec.ts"],
  testEnvironment: "node",
  setupFiles: ["<rootDir>/test/setup-env.js"],
};

export default config;
