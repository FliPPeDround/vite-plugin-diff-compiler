import type { TextEditor } from 'vscode'
import { Range, commands, window, workspace } from 'vscode'
// import { version } from '../package.json'
// import { log } from './log'
import { getRanges } from './getRanges'

function setBgColor(
  range: {
    start: number
    end: number
  },
  editor: TextEditor,
) {
  const start = editor.document.positionAt(range.start)
  const end = editor.document.positionAt(range.end)
  const editorRange = new Range(start, end)
  console.log(editorRange)
  // 设置背景色前先清除上一次的背景色
  editor.setDecorations(
    window.createTextEditorDecorationType({
      backgroundColor: '',
    }),
    [editorRange],
  )
  // 设置背景色
  editor.setDecorations(
    window.createTextEditorDecorationType({
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    }),
    [editorRange],
  )
}

function mainFunction() {
  const { codeInfo, editor } = getRanges()!

  if (!codeInfo)
    return

  codeInfo.forEach((range) => {
    setBgColor(range, editor)
  })
}
export function activate() {
  mainFunction()

  // 代码发生变动触发获取code
  workspace.onDidChangeTextDocument(() => {
    mainFunction()
  })

  commands.registerCommand('diffCompiler.reload', () => {
    mainFunction()
  })
}

export function deactivate() { }
