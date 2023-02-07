import MagicString from 'magic-string'
import type { CodeInfo } from './types'

function diffCompiler(code: string, mode: string) {
  const s = new MagicString(code)

  const codeInfo = getCodeInfo(code, mode)
  const newCode = computeDiffCode(codeInfo, s)

  return newCode
}

function getCodeInfo(code: string, mode: string) {
  const commentsInfo = getCommentsInfo()

  if (commentsInfo.length % 2 !== 0)
    throw new Error('start and end must be paired')

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
  }

  return codeInfo

  function getCommentsInfo() {
    const reg = /([^\n]*)#diff-compiler-(start|end):([^\n]*)/g
    const result = [...code.matchAll(reg)]

    const commentsInfo = []
    for (let i = 0; i < result.length; i++) {
      const comment = result[i]

      const commentStr = comment[1].trim()
      const commentType = commentStr.startsWith('<')
        ? 'html'
        : commentStr.startsWith('//')
          ? 'script'
          : 'style'
      const type = comment[2]

      const commentModeStr = comment[3].trim()
      const commentMode = getCommentMode(commentType, commentModeStr)?.trim()

      const index = comment.index!
      if (commentMode !== mode) {
        commentsInfo.push({
          commentType,
          type,
          mode: commentMode,
          start: index,
          end: index + comment[0].length,
        })
      }
    }
    return commentsInfo
  }

  function getCommentMode(commentType: string, commentModeStr: string) {
    switch (commentType) {
      case 'html':
        return commentModeStr.replace('-->', '')
      case 'script':
        return commentModeStr
      case 'style':
        return commentModeStr.replace('*/', '')
    }
  }
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
