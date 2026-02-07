import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";


export default defineConfig({
  server: {
    host: "127.0.0.1",
    port: 5174,
  },
  plugins: [react(), svgr()],
});
