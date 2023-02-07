import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import DiffCompiler from 'vite-plugin-diff-compiler'

export default defineConfig({
  plugins: [
    Inspect(),
    DiffCompiler(),
  ],
})
