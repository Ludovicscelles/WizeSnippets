import { defineConfig } from "vitest/config";

export default defineConfig({
  test : {
    globals: true,
    environment: "node",
    setupFiles: ["./server/setupTest.ts"],
    include: ["server/testsUnit/**/*.test.ts"],
  },
});