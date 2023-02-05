import { describe, expect, it } from 'vitest'
import { diffCompiler, getComment } from './../src/diffCompiler'

describe('index', () => {
  it('should be work', () => {
    const code = diffCompiler('const a = 1', 'web')
    expect(code).toBe('const a = 1')
  })
  it('should be work', () => {
    const source = '// #diff-complier-start: node'
    const code = diffCompiler(source, 'node')
    expect(code).toBe('')
  })
})
