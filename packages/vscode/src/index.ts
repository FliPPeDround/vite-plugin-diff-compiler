import type { ExtensionContext } from 'vscode'
import { commands, window } from 'vscode'
// import { version } from '../package.json'
// import { log } from './log'

export function activate(context: ExtensionContext) {
  const code = editor.document.getText()
  console.log(data)
  // log.appendLine(`⚪️ Diff Compiler for VS Code v${version}\n`)
  commands.registerCommand('diffCompiler.reload', () => {
    console.log('test')
    window.showInformationMessage('test')
  })

  // context.subscriptions.push(disposable)
}

export function deactivate() {}
