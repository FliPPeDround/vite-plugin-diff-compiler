import type { CommentLine } from '@babel/types'

const comments: CommentLine[] = [
  {
    type: 'CommentLine',
    value: ' #diff-complier-start: node',
    start: 5,
    end: 34,
    loc: {
      start: { line: 2, column: 4, index: 5 },
      end: { line: 2, column: 33, index: 34 },
      filename: undefined,
      identifierName: undefined,
    },
  },
  {
    type: 'CommentLine',
    value: ' #diff-complier-end: node',
    start: 55,
    end: 82,
    loc: {
      start: { line: 4, column: 4, index: 55 },
      end: { line: 4, column: 31, index: 82 },
      filename: undefined,
      identifierName: undefined,
    },
  },
]

export {
  comments,
}
