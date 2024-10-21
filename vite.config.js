import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // opcjonalnie otwiera aplikację w przeglądarce automatycznie
  },
  build: {
    outDir: 'build', // folder wyjściowy, podobny do tego z CRA
  }
});
