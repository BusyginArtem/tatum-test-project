// import { defineConfig } from "vite";
import { defineConfig } from 'vitest/config';
import preact from '@preact/preset-vite';

export default defineConfig({
  plugins: [preact()],
  base: '/tatum-test-project/',
  // define: {
  //   "process.env": process.env,
  // },
  test: {
    include: ['**/*.test.tsx'],
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    // onConsoleLog(log: string, type: 'stdout' | 'stderr'): boolean | void {
    //   return !(log === 'message from third party library' && type === 'stdout');
    // },
  },
});
