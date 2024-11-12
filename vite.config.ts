import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig({
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // URL ของเซิร์ฟเวอร์ backend ของคุณ
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // ลบ `/api` ออกจากเส้นทาง
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
});
