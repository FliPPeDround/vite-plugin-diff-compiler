import { window } from 'vscode'
import { getCodeInfo, getCommentsInfo } from '@vite-plugin-diff-compiler/shared'

export function getRanges() {
  const editor = window.activeTextEditor

  if (!editor)
    return

  const code = editor.document.getText()
  const commentsInfo = getCommentsInfo(code)
  const codeInfo = getCodeInfo(commentsInfo)

  return codeInfo
}
