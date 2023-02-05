import { parse } from '@babel/parser'
import type { CommentBlock, CommentLine } from '@babel/types'
import MagicString from 'magic-string'

type CodeInfo = {
  start: number
  end: number
}[]

function diffCompiler(code: string, mode: string) {
  const s = new MagicString(code)
  const ast = parse(code, {
    sourceType: 'unambiguous',
    plugins: ['typescript', 'jsx', 'classProperties', 'decorators-legacy'],
  })

  if (ast?.comments!.length === 0)
    return code

  const comments = getCodeInfo(ast!.comments!, mode)

  const newCode = computeDiffCode(comments, s)
  return newCode
}

function getCodeInfo(comments: (CommentBlock | CommentLine)[], mode: string) {
  // 正则匹配`#diff-complier-${start|end}: ${mode}`
  const reg = /#diff-complier-(start|end):([\s\S]*)/
  comments = comments.filter((comment) => {
    return reg.test(comment.value)
  })

  // 通过正则获取comment.value的start和end
  const commentsInfo = []
  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i]
    const result = comment.value.match(reg)!
    const type = result[1]
    const commentMode = result[2].trim()
    if (commentMode !== mode) {
      commentsInfo.push({
        type,
        mode,
        start: comment.start!,
        end: comment.end!,
      })
    }
  }

  // 判断start和end是否成对出现
  if (commentsInfo.length % 2 !== 0)
    throw new Error('start and end must be paired')

  // 通过start和end，获取code的start和end
  const codeInfo: CodeInfo = []
  for (let i = 0; i < commentsInfo.length; i++) {
    const comment = commentsInfo[i]
    if (comment.type === 'start') {
      const nextComment = commentsInfo[i + 1]
      if (nextComment.type !== 'end')
        throw new Error('start and end must be paired')
      if (comment.mode === nextComment.mode) {
        codeInfo.push({
          start: comment.start,
          end: nextComment.end,
        })
      }
    }
    else {
      continue
    }
  }

  return codeInfo
}

function computeDiffCode(codeInfo: CodeInfo, s: MagicString) {
  codeInfo.forEach((code) => {
    s.remove(code.start, code.end)
  })
  return s.toString()
}

export {
  diffCompiler,
  getCodeInfo,
  computeDiffCode,
}
