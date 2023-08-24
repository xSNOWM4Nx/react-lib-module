import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: true,
    outDir: './build',
    emptyOutDir: true,
    lib: {
      entry: './src/index.ts',
      name: "react-lib-module",
      fileName: (format) => `react-lib-module.${format}.js`,
    },
    rollupOptions: {
      external: [
        "@daniel.neuweiler/ts-lib-module",
        "@emotion/react",
        "@emotion/styled",
        "@mui/material",
        "@mui/icons-material",
        "react",
        "react-dom",
        "react-window"
      ],
      // input: "/src/index.ts",
      output: {
        globals: {
          react: 'React'
        }
      }
    },
  },
})
