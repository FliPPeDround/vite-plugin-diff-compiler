import consola from 'consola'
import type { CodeInfo } from '../../core/src/types'

export function getCodeInfo(commentsInfo: any) {
  if (commentsInfo.length % 2 !== 0)
    consola.error('start and end must be paired')

  const codeInfo: CodeInfo = []
  for (let i = 0; i < commentsInfo.length; i++) {
    const comment = commentsInfo[i]
    if (comment.type === 'start') {
      const nextComment = commentsInfo[i + 1]
      if (nextComment.type !== 'end')
        consola.error('start and end must be paired')
      if (comment.mode === nextComment.mode) {
        codeInfo.push({
          start: comment.start,
          end: nextComment.end,
        })
      }
    }
  }

  return codeInfo
}
