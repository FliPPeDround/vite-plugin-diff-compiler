import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import DiffCompiler from '../package/core/src'

export default defineConfig({
  plugins: [
    Inspect(),
    DiffCompiler(),
  ],
})
