import MagicString from 'magic-string'
import { getCodeInfo, getCommentsInfo } from '@vite-plugin-diff-compiler/shared'
import type { CodeInfo } from './types'

export function diffCompiler(code: string, mode: string) {
  const s = new MagicString(code)

  const commentsInfo = getCommentsInfo(code, mode)
  const codeInfo = getCodeInfo(commentsInfo)
  const newCode = computeDiffCode(codeInfo, s)

  return newCode
}

function computeDiffCode(codeInfo: CodeInfo, s: MagicString) {
  codeInfo.forEach((code) => {
    s.remove(code.start, code.end)
  })

  return s.toString()
}
