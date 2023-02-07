import { describe, expect, test } from 'vitest'
import {
  diffCompiler,
} from '../package/core/src/diffCompiler'

describe('fixtures', async () => {
  const files = import.meta.glob('./fixtures/*.{vue,js,ts}', {
    eager: true,
    as: 'raw',
  })

  for (const [id, code] of Object.entries(files)) {
    test(id.replace(/\\/g, '/'), async () => {
      // 获取文件名
      const ext = id.split('.').at(-2)!.split('/').pop()!

      const exec = () => diffCompiler(code, ext)
      if (id.includes('error'))
        expect(exec).toThrowErrorMatchingSnapshot()

      else
        expect(exec()).toMatchSnapshot()
    })
  }
})
