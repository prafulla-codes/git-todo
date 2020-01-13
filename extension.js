// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path')
const getRepoInfo = require('git-repo-info');
const repoName = require('git-repo-name');
const git_username = require('git-username')
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "git-todo" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('I am You.!');
	}
	);
	let abc = vscode.commands.registerCommand('git.todos', function () {
		// The code you place here will be executed every time your command is executed
		const panel = vscode.window.createWebviewPanel('todoview','Todos',vscode.ViewColumn.Beside,{});
		var info = getRepoInfo(vscode.workspace.rootPath);
		console.log(info);

		if(info.root == null)
		{
			panel.webview.html=`
			<html>
			<head>
			<title> Git Todos </title>
			</head>
			<body style="background-color:#fff;color:red">
			<h2> ERROR | Not a git repository :( </h2>
			</body>
			</html>
			`

		}
		else
		{
		// Display a message box to the user
		vscode.window.showInformationMessage('Welcome to git todos!');
		panel.webview.html=getWebViewContent(info);
		}
		
	
	}
	);

	

	context.subscriptions.push(abc);
	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

function getWebViewContent(info){
	console.log(git_username('cwd:vscode.workspace.workspaceFolders'));
	return `
	<html>
	<head>
	<title> Todos </title>
	</head>
	<body style="background-color:#fff;color:black;text-align:center;margin:0;padding:0;box-sizing:border-box">
	<div style="background-color:black;color:white;width:100%;padding:15px;text-align:left">
		<h3> Your Tasks </h3>
		<h4 style='color:lightgreen'> ${info.branch}</h4>
	</div>
	</body>
	</html>
	`
}


module.exports = {
	activate,
	deactivate
}
