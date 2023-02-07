import type { Plugin } from 'vite'
import { createFilter } from '@rollup/pluginutils'
import type { Options } from './types'
import { diffCompiler } from './diffCompiler'

function VitePluginDiffCompiler(options: Options = {}): Plugin {
  let config: any
  return {
    name: 'vit-plugin-diff-compiler',
    enforce: 'pre',
    configResolved(resolvedConfig) {
      config = resolvedConfig
    },
    transform(code: string, id: string) {
      const {
        include = /\.(js|tsx|vue|ts|tsx)/,
        exclude = /node_modules/,
      } = options

      const filter = createFilter(include, exclude)

      if (filter(id)) {
        const transformedCode = diffCompiler(code, config.mode)
        return transformedCode
      }
    },
  }
}

export default VitePluginDiffCompiler

