import * as vscode from 'vscode';
import path = require('path');
import fs = require('fs');
import table from './template/table';
import dialogForm from './template/dialog-form';
import dialogTable from './template/dialog-table';
import dialog from './template/dialog';
import { createTableColumn, createFormItem, createQfLabel } from './template/utils';

export function activate(context: vscode.ExtensionContext) {
	// 创建表格列表文件
	let createTableListDisposable = vscode.commands.registerCommand('qf-elf.createTableList', async (uri) => {
		let name = await showInputBox();

		if (!name) {
			return;
		};

		createFile(name, await table.getTpl({ name: name }), uri);
	});

	// 生成表格列
	let createTableColDisposable = vscode.commands.registerCommand('qf-elf.createTableCol', async () => {
		let text = await vscode.env.clipboard.readText();

		let cols = createTableColumn(text);

		pasteContent(cols);
	});

	// 生成弹框种带表格的文件
	let createDialogTableDisposable = vscode.commands.registerCommand('qf-elf.createDialogTable', async (uri) => {
		let name = await showInputBox();

		if (!name) {
			return;
		};

		createFile(name, await dialogTable.getTpl({ name: name }), uri);
	});

	// 生成表单项
	let createFormItemDisposable = vscode.commands.registerCommand('qf-elf.createFormItem', async (uri) => {
		let text = await vscode.env.clipboard.readText();

		let cols = createFormItem(text);

		pasteContent(cols);
	});

	// 生成弹框带表单的文件
	let createDialogFormDisposable = vscode.commands.registerCommand('qf-elf.createDialogForm', async (uri) => {
		let name = await showInputBox();

		if (!name) {
			return;
		};

		createFile(name, await dialogForm.getTpl({ name: name }), uri);
	});

	// 生成纯弹框
	let createDialogDisposable = vscode.commands.registerCommand('qf-elf.createDialog', async (uri) => {
		let name = await showInputBox();

		if (!name) {
			return;
		};

		createFile(name, await dialog.getTpl({ name: name }), uri);
	});

	// 生成qf-label
	let createQflabelDisposable = vscode.commands.registerCommand('qf-elf.createQflabel', async (uri) => {
		let text = await vscode.env.clipboard.readText();

		let cols = createQfLabel(text);

		pasteContent(cols);
	});

	const disposes: any[] = [
		createTableListDisposable,
		createTableColDisposable,
		createDialogTableDisposable,
		createFormItemDisposable,
		createDialogFormDisposable,
		createDialogDisposable,
		createQflabelDisposable
	];

	disposes.forEach(d => {
		context.subscriptions.push(d);
	});
}

/**
 * 粘贴内容
 * @param params 
 */
async function pasteContent(content: string) {
	const editor = vscode.window.activeTextEditor;

	if (!editor) {
		return;
	};

	const selection = editor.selection;

	editor.edit(builder => builder.replace(selection, content));
}


/**
 * 打开inputbox
 * @param uri 
 * @returns 
 */
async function showInputBox() {
	let name = await vscode.window.showInputBox({
		placeHolder: '输入文件名称，请使用kebab命名方式',
		prompt: '按回车确定'
	});

	name = name?.replace(/\s+/g, "");

	if (!name) {
		return;
	}

	// let moduleName = (() => {
	// 	let index = uri.path.split('/').findIndex((e: any) => e === 'src');

	// 	if (index === -1) {
	// 		return '';
	// 	} else {
	// 		return uri.path.split('/').find((e: any, i: number) => i === index + 2) + '-';
	// 	}
	// })();

	return `${name}`;
}

/**
 * 创建文件
 * @param uri 
 * @param content 内容 
 * @returns 
 */
async function createFile(name: string, content: string, uri: any) {
	let stats = fs.statSync(uri.fsPath);

	const filePath = path.join(
		stats.isDirectory() ? uri.fsPath : path.dirname(uri.fsPath),
		`${name}.vue`
	);

	const hasFile = fs.existsSync(filePath);

	if (hasFile) {
		vscode.window.showErrorMessage(`文件已存在`);
	} else {
		// 创建模板
		fs.writeFile(filePath, content, (err) => {
			if (err) {
				vscode.window.showInformationMessage(err.message);
				return;
			}

			vscode.window.showTextDocument(vscode.Uri.file(filePath));

			vscode.window.showInformationMessage(`创建成功!`);
		});
	}
}

export function deactivate() { }
