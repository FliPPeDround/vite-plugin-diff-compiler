import { parse } from '@babel/parser'
import type { CommentBlock, CommentLine } from '@babel/types'
// import traverse from '@babel/traverse'
// import generate from '@babel/generator'
import type { Options } from './types'

function diffCompiler(code: string, mode: Options['mode'][number]) {
  console.log(code)
  console.log(mode)
  const ast = parse(code, {
    sourceType: 'unambiguous',
    plugins: ['typescript', 'jsx', 'classProperties', 'decorators-legacy'],
  })

  if (ast?.comments!.length === 0)
    return code

  const comments = getComment(ast!.comments!, mode)

  return comments

  // traverse(ast, {

  // })
  // return code
}

function getComment(comments: (CommentBlock | CommentLine)[], mode: Options['mode'][number]) {
  // 正则匹配`#diff-complier-${start|end}: ${mode}`
  const reg = new RegExp(`#diff-complier-(start|end): ${mode}`)
  const result = comments.filter((comment) => {
    return reg.test(comment.value)
  })
  return result.map((comment) => comment.value)
}

export {
  diffCompiler,
  getComment,
}
