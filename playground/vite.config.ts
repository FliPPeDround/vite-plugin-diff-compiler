import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import DiffCompiler from '../src/'

export default defineConfig({
  plugins: [
    Inspect(),
    DiffCompiler({
      mode: ['web', 'tarui'],
    }),
  ],
})
