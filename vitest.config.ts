import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    snapshotFormat: {
      printBasicPrototype: true,
    },
    exclude: ["**/node_modules/**", "**/playground/**"],
  },
});
