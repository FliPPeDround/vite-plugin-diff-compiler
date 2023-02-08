import { Range, commands, window, workspace } from 'vscode'
// import { version } from '../package.json'
// import { log } from './log'
import { getRanges } from './getRanges'

function setBgColor(range: {
  start: number
  end: number
}) {
  window.activeTextEditor?.setDecorations(
    window.createTextEditorDecorationType({
      backgroundColor: 'red',
    }),
    [
      {
        range: new Range(
          window.activeTextEditor?.document.positionAt(range.start),
          window.activeTextEditor?.document.positionAt(range.end),
        ),
      },
    ],
  )
}

function mainFunction() {
  const ranges = getRanges()

  if (!ranges)
    return

  ranges.forEach((range) => {
    setBgColor(range)
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
