import * as vscode from 'vscode';
import { getTableTpl } from './tpl/table';
import { getFormTpl } from './tpl/form';
import { getDialogTpl } from './tpl/dialog';
import path = require('path');
import fs = require('fs');

export function activate(context: vscode.ExtensionContext) {

	// 生成表格列
	let createTableColumnTemplateDispose = vscode.commands.registerCommand('qf-elf.createTableColumnTemplate', () => {
		createTableColumnTemplate();
	});

	// 生成表格模板文件
	let createTableFileDispose = vscode.commands.registerCommand('qf-elf.createTableFile', (uri) => {
		createFile(uri, getTableTpl);
	});

	// 生成表单项代码
	let createFormItemDispose = vscode.commands.registerCommand('qf-elf.createFormItemTemplate', (uri) => {
		createFormItemTemplate();
	});

	// 生成表单模板文件
	let createFormFileDispose = vscode.commands.registerCommand('qf-elf.createFormFile', (uri) => {
		createFile(uri, getFormTpl);
	});

	// 生成弹框模板
	let dialogDispose = vscode.commands.registerCommand('qf-elf.createDialog', (uri) => {
		createFile(uri, getDialogTpl);
	});

	const disposes: any[] = [
		createTableColumnTemplateDispose,
		createTableFileDispose,
		createFormItemDispose,
		createFormFileDispose,
		dialogDispose
	];

	disposes.forEach(d => {
		context.subscriptions.push(d);
	});

	// context.subscriptions.push(createTableColumnTemplateDispose);
	// context.subscriptions.push(createTableFileDispose);
	// context.subscriptions.push(createFormItemDispose);
	// context.subscriptions.push(createFormFileDispose);
}

/**
 * 创建文件
 * @param uri 
 * @returns 
 */
async function createFile(uri: any, getTplFn: Function) {
	let name = await vscode.window.showInputBox({
		placeHolder: '输入文件名称，请使用kebab命名方式',
		prompt: '按回车确定'
	});

	name = name?.replace(/\s+/g, "");

	if (!name) {
		return;
	}

	let moduleName = (() => {
		let index = uri.path.split('/').findIndex((e: any) => e === 'src');

		if (index === -1) {
			return '';
		} else {
			return uri.path.split('/').find((e: any, i: number) => i === index + 2) + '-';
		}

	})();

	let stats = fs.statSync(uri.fsPath);


	const filePath = path.join(
		stats.isDirectory() ? uri.fsPath : path.dirname(uri.fsPath),
		`${name}.vue`
	);

	const hasFile = fs.existsSync(filePath);

	if (hasFile) {
		vscode.window.showErrorMessage(`文件已存在`);
	} else {
		fs.writeFile(filePath, await getTplFn(`${moduleName}${name}`), (err) => {
			if (err) {
				vscode.window.showInformationMessage(err.message);
				return;
			}

			vscode.window.showTextDocument(vscode.Uri.file(filePath));

			vscode.window.showInformationMessage(`创建成功!`);
		});
	}
}

/**
 * 创建el-table-column代码
 */
async function createTableColumnTemplate() {
	let text = await vscode.env.clipboard.readText();
	const editor = vscode.window.activeTextEditor;

	if (!editor) {
		return;
	};

	const selection = editor.selection;

	let jsonData: any = {};

	try {
		jsonData = JSON.parse(text);

		const createColumn = (json: any) => {
			let columnTpl = ``;

			for (const key in json) {
				columnTpl += `
				<el-table-column prop="${key}" label="${json[key]}">
					<template slot-scope="scope">
						{{ scope.row.${key} | emptyDisplay}}
					</template>
				</el-table-column>`;
			}

			return columnTpl;
		};

		let cols = createColumn(jsonData);

		editor.edit(builder => builder.replace(selection, cols));
	} catch (error) {
		vscode.window.showInformationMessage(`选择的不是一个JSON对象，请复制一个JSON对象`);
	}
}

/**
 * 创建el-form-item代码
 */
async function createFormItemTemplate() {
	let text = await vscode.env.clipboard.readText();
	const editor = vscode.window.activeTextEditor;

	if (!editor) {
		return;
	};

	const selection = editor.selection;

	let jsonData: any = {};

	try {
		jsonData = JSON.parse(text);

		const createColumn = (json: any) => {
			let columnTpl = ``;

			for (const key in json) {
				columnTpl += `
				<el-col :span="24">
          <el-form-item prop="${key}">
            <template #label>
              <i class="iconfont icon-account"></i>
            </template>
            <el-input v-model.trim="form.${key}" placeholder="${json[key]}" maxlength="30" clearable></el-input>
          </el-form-item>
        </el-col>
				`;
			}

			return columnTpl;
		};

		let cols = createColumn(jsonData);

		editor.edit(builder => builder.replace(selection, cols));
	} catch (error) {
		vscode.window.showInformationMessage(`选择的不是一个JSON对象，请复制一个JSON对象`);
	}
}

/**
 * 创建弹框
 */
async function createDialogTemplate() {
	let name = await vscode.window.showInputBox({
		placeHolder: '输入文件名称，请使用kebab命名方式',
		prompt: '按回车确定'
	});

	name = name?.replace(/\s+/g, "");

	if (!name) {
		return;
	}
}

// this method is called when your extension is deactivated
export function deactivate() { }
