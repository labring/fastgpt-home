import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/customers/**/*.test.{ts,tsx}', 'src/app/customers/**/*.test.{ts,tsx}'],
    setupFiles: []
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'server-only': fileURLToPath(new URL('./src/customers/test/server-only.ts', import.meta.url))
    }
  }
});
