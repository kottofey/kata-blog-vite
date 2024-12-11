import { defineConfig } from 'vite';
import { sync } from 'glob';
import checker from 'vite-plugin-checker';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: './src',
  publicDir: '.src/assets',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    target: 'esnext',
    sourcemap: true,
    rollupOptions: {
      input: sync('./src/**/*.html'.replace(/\\/g, '/')),
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp/i.test(extType)) {
            extType = 'images';
          } else if (/ttf|woff/i.test(extType)) {
            extType = 'fonts';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  },
  plugins: [
    {
      ...checker({
        eslint: {
          lintCommand:
            'eslint --config .eslintrc.json "src/**/*.{js,jsx}"',
        },
      }),
      apply: 'build',
    },
    react(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@use '/styles/constants' as *;",
      },
    },
  },
});
