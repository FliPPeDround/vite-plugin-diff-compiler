export function getCommentsInfo(code: string, mode = '') {
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
    if (commentMode !== mode || mode === '') {
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
