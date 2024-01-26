import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    include: ['**/*.test.{tsx,ts}'],
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      exclude: ['src/environment/*', 'src/interfaces/*', 'src/vite-env.d.ts', 'src/main.tsx']
    }
    // reporters: 'verbose'
  }
});
