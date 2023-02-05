import { describe, expect, it } from 'vitest'
import { diffCompiler, getCodeInfo } from './../src/diffCompiler'
import { comments } from './../mock/comments'

describe('index', () => {
  it.skip('should be work', () => {
    const code = diffCompiler('const a = 1', 'web')
    expect(code).toBe('const a = 1')
  })
  it('should be work', () => {
    const source = `// #diff-complier-start:node
    const a = 1
    // #diff-complier-end:node
    // #diff-complier-start:node
    const b = 1
    // #diff-complier-end:node 
    `
    const code = diffCompiler(source, 'node')
    expect(code).toBe(`// #diff-complier-start:node
    const a = 1
    // #diff-complier-end:node
    // #diff-complier-start:node
    const b = 1
    // #diff-complier-end:node 
    `)
    const diffCode = diffCompiler(source, 'web')
    expect(diffCode).toBe(`
    
    `)
  })
})

describe.skip('getComment', () => {
  it('should be work', () => {
    const result = getCodeInfo(comments, 'node')
    expect(result).toMatchInlineSnapshot('')
  })
})
