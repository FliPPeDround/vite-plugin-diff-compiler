import { window } from 'vscode'

export function getCode() {
  const editor = window.activeTextEditor

  if (!editor)
    return

  console.log(editor.document.getText())

  return editor.document.getText()
}
