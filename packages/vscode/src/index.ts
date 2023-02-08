import type { ExtensionContext } from 'vscode'
import { Range, commands, window, workspace } from 'vscode'
// import { version } from '../package.json'
// import { log } from './log'
import { getCode } from './getCode'

export function activate(context: ExtensionContext) {
  getCode()
  const start = window.activeTextEditor?.document.positionAt(0)
  console.log(start)

  // 代码发生变动触发获取code
  workspace.onDidChangeTextDocument((e) => {
    const code = getCode()!
    // 返回code中‘A’的位置
    const index = code.indexOf('A')
    console.log(index)
    // 根据位置设置红色的背景色
    window.activeTextEditor?.setDecorations(
      window.createTextEditorDecorationType({
        backgroundColor: 'red',
      }),
      [
        {
          range: new Range(
            window.activeTextEditor?.document.positionAt(0),
            window.activeTextEditor?.document.positionAt(1),
          ),
        },
      ],
    )
  })

  commands.re1gisterCommand('diffCompiler.reload', () => {
    console.log('test')
    window.showInformationMessage('test')
  })

  // context.subscriptions.push(disposable)
}

export function deactivate() {}
