import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Define global variable for wallet connect
if (typeof global === 'undefined') {
  window.global = window; // For the browser environment
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
