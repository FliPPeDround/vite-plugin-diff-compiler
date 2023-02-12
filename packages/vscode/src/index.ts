import type { TextEditor } from 'vscode'
import { Range, commands, window, workspace } from 'vscode'
// import { version } from '../package.json'
// import { log } from './log'
import { getRanges } from './getRanges'

const lineDec = window.createTextEditorDecorationType({
  isWholeLine: true,
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  rangeBehavior: 1,
})

function setBgColor(
  range: {
    start: number
    end: number
  },
  editor: TextEditor,
) {
  // 给代码所影响的一整行全部改变设置背景色
  const start = editor.document.positionAt(range.start)
  const end = editor.document.positionAt(range.end)
  const editorRange = new Range(start, end)
  editor.setDecorations(lineDec, [editorRange])
}

// 还原背景色
function resetBgColor(editor: TextEditor) {
  editor.setDecorations(lineDec, [])
}

function mainFunction() {
  const { codeInfo, editor } = getRanges()!
  resetBgColor(editor)

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
