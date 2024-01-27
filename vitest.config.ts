import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    include: ['**/*.spec.{tsx,ts}'],
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      exclude: ['src/environments/*', 'src/interfaces/*', 'src/vite-env.d.ts', 'src/main.tsx']
    }
    // reporters: 'verbose'
  }
});
