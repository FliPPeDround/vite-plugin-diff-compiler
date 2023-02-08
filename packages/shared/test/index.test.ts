import { describe, expect, it } from 'vitest'
import { getCommentsInfo } from '../src'

describe('shared', () => {
  it('get []', () => {
    const code = 'consloe.log(\'hello world\')'
    const commentsInfo = getCommentsInfo(code)
    expect(commentsInfo).toStrictEqual([])
  })
  it('get info', () => {
    () => {
      const code = `
        // #diff-compiler-start:js
        console.log('hello world')
        // #diff-compiler-end:js
      `
      const commentsInfo = getCommentsInfo(code)
      expect(commentsInfo).toStrictEqual([
        {
          commentType: 'script',
          type: 'start',
          mode: 'js',
          start: 6,
          end: 34,
        },
        {
          commentType: 'script',
          type: 'end',
          mode: 'js',
          start: 35,
          end: 63,
        },
      ])
    }
  })
})
