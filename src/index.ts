import type { Plugin } from 'vite'
import { createFilter } from '@rollup/pluginutils'
import type { Options } from './types'
import { diffCompiler } from './diffCompiler'

function VitePluginDiffCompiler(options: Options): Plugin {
  let config: any
  return {
    name: 'vit-plugin-diff-compiler',
    enforce: 'post',
    configResolved(resolvedConfig) {
      // 存储最终解析的配置
      config = resolvedConfig
    },
    // transformInclude(id) {
    //   return id.endsWith('main.ts')
    // },
    transform(code: string, id: string) {
      const include = /\.(js|tsx|vue|ts|tsx)/
      const exclude = /node_modules/

      const filter = createFilter(include, exclude)

      if (filter(id)) {
        diffCompiler(code, options)
        return code.replace('__UNPLUGIN__', `Hello Unplugin! ${config.mode}`)
      }
    },
  }
}

export default VitePluginDiffCompiler

