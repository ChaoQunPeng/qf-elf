/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode = __webpack_require__(1);
const table_1 = __webpack_require__(2);
const form_1 = __webpack_require__(4);
const dialog_1 = __webpack_require__(5);
const path = __webpack_require__(6);
const fs = __webpack_require__(7);
function activate(context) {
    // 生成表格列
    let createTableColumnTemplateDispose = vscode.commands.registerCommand('qf-elf.createTableColumnTemplate', () => {
        createTableColumnTemplate();
    });
    // 生成表格模板文件
    let createTableFileDispose = vscode.commands.registerCommand('qf-elf.createTableFile', (uri) => {
        createFile(uri, table_1.getTableTpl);
    });
    // 生成表单项代码
    let createFormItemDispose = vscode.commands.registerCommand('qf-elf.createFormItemTemplate', (uri) => {
        createFormItemTemplate();
    });
    // 生成表单模板文件
    let createFormFileDispose = vscode.commands.registerCommand('qf-elf.createFormFile', (uri) => {
        createFile(uri, form_1.getFormTpl);
    });
    // 生成弹框模板
    let dialogDispose = vscode.commands.registerCommand('qf-elf.createDialog', (uri) => {
        createFile(uri, dialog_1.getDialogTpl);
    });
    const disposes = [
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
exports.activate = activate;
/**
 * 创建文件
 * @param uri
 * @returns
 */
function createFile(uri, getTplFn) {
    return __awaiter(this, void 0, void 0, function* () {
        let name = yield vscode.window.showInputBox({
            placeHolder: '输入文件名称，请使用kebab命名方式',
            prompt: '按回车确定'
        });
        name = name === null || name === void 0 ? void 0 : name.replace(/\s+/g, "");
        if (!name) {
            return;
        }
        let moduleName = (() => {
            let index = uri.path.split('/').findIndex((e) => e === 'src');
            if (index === -1) {
                return '';
            }
            else {
                return uri.path.split('/').find((e, i) => i === index + 2) + '-';
            }
        })();
        let stats = fs.statSync(uri.fsPath);
        const filePath = path.join(stats.isDirectory() ? uri.fsPath : path.dirname(uri.fsPath), `${name}.vue`);
        const hasFile = fs.existsSync(filePath);
        if (hasFile) {
            vscode.window.showErrorMessage(`文件已存在`);
        }
        else {
            fs.writeFile(filePath, yield getTplFn(`${moduleName}${name}`), (err) => {
                if (err) {
                    vscode.window.showInformationMessage(err.message);
                    return;
                }
                vscode.window.showTextDocument(vscode.Uri.file(filePath));
                vscode.window.showInformationMessage(`创建成功!`);
            });
        }
    });
}
/**
 * 创建el-table-column代码
 */
function createTableColumnTemplate() {
    return __awaiter(this, void 0, void 0, function* () {
        let text = yield vscode.env.clipboard.readText();
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        ;
        const selection = editor.selection;
        let jsonData = {};
        try {
            jsonData = JSON.parse(text);
            const createColumn = (json) => {
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
        }
        catch (error) {
            vscode.window.showInformationMessage(`选择的不是一个JSON对象，请复制一个JSON对象`);
        }
    });
}
/**
 * 创建el-form-item代码
 */
function createFormItemTemplate() {
    return __awaiter(this, void 0, void 0, function* () {
        let text = yield vscode.env.clipboard.readText();
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        ;
        const selection = editor.selection;
        let jsonData = {};
        try {
            jsonData = JSON.parse(text);
            const createColumn = (json) => {
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
        }
        catch (error) {
            vscode.window.showInformationMessage(`选择的不是一个JSON对象，请复制一个JSON对象`);
        }
    });
}
/**
 * 创建弹框
 */
function createDialogTemplate() {
    return __awaiter(this, void 0, void 0, function* () {
        let name = yield vscode.window.showInputBox({
            placeHolder: '输入文件名称，请使用kebab命名方式',
            prompt: '按回车确定'
        });
        name = name === null || name === void 0 ? void 0 : name.replace(/\s+/g, "");
        if (!name) {
            return;
        }
    });
}
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getTableTpl = void 0;
const vscode = __webpack_require__(1);
const tableColumn = __webpack_require__(3);
function createColumn() {
    return __awaiter(this, void 0, void 0, function* () {
        let text = yield vscode.env.clipboard.readText();
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        ;
        return tableColumn.createColumn(text);
    });
}
const getTableTpl = (name) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const tableTpl = `<template>
  <div id="${name}">
    <el-table class="qf-table" :data="listData" style="width: 100%">
      ${(_a = yield createColumn()) !== null && _a !== void 0 ? _a : ''}
    </el-table>

    <div class="text-right mt6" v-if="listData.total != 0">
      <el-pagination
        background
        layout="total,prev, pager, next"
        :current-page="queryParams.page"
        @current-change="paginChange"
        :total="listData.total"
        :page-size="queryParams.page_size"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import debounce from '@utils/debounce';

export default {
  name: '${name}',

  data() {
    return {
      queryParams: {
        page: 1,
        page_size: 10
      },
      listData: {}
    };
  },

  methods: {
    /**
     * 搜索
     */
    searchOnInput(value) {
      debounce(() => {
        this.queryParams.search = value;
        this.getList();
      }, 300);
    },
    /**
     * 分页
     */
    paginChange(page) {
      this.queryParams.page = page;
      this.getList();
    },
    /**
     * 获取列表
     */
    async getList() {
      await this.$nextTick();
      const loading = this.$loading({
        target: '#${name}',
        body: false,
        text: '正在获取数据...'
      });

      // 这里记得修改成实际的模块名和接口名
      let result = await this.$api.模块名.getList().catch(err => {
        this.$message.error('获取列表失败');
        console.error(err);
      });

      if (result) {
        this.listData = result;
      }

      loading.close();
    }
  }
};
</script>

<style lang="less" scoped>
</style>
`;
    return tableTpl;
});
exports.getTableTpl = getTableTpl;


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createColumn = void 0;
/**
 * 生成表格列
 * @param text 剪切板中的文本
 * @returns 生成好的表格模板
 */
function createColumn(text) {
    try {
        let jsonData = JSON.parse(text);
        const createTpl = (json) => {
            let tpl = ``;
            for (const key in json) {
                tpl += `
				<el-table-column prop="${key}" label="${json[key]}">
					<template slot-scope="scope">
						{{ scope.row.${key} }}
					</template>
				</el-table-column>

        `;
            }
            return tpl;
        };
        let cols = createTpl(jsonData);
        return cols;
    }
    catch (error) {
        return '';
    }
}
exports.createColumn = createColumn;


/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getFormTpl = void 0;
const vscode = __webpack_require__(1);
let formData;
function createFormItem() {
    return __awaiter(this, void 0, void 0, function* () {
        let text = yield vscode.env.clipboard.readText();
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        ;
        try {
            let jsonData = JSON.parse(text);
            formData = jsonData;
            const createTpl = (json) => {
                let tpl = ``;
                for (const key in json) {
                    tpl += `
				<el-col :span="12">
          <el-form-item prop="${key}">
            <template #label>
              <i class="iconfont icon-account"></i>
            </template>
            <el-input v-model.trim="form.${key}" placeholder="${json[key]}" maxlength="30" clearable></el-input>
          </el-form-item>
        </el-col>
        `;
                }
                return tpl;
            };
            let cols = createTpl(jsonData);
            return cols;
        }
        catch (error) {
            return '';
        }
    });
}
const getFormTpl = (name) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    let cols = yield createFormItem();
    const formTpl = `<template>
  <div id="${name}">
    <qf-inner-sub-title class="mb-13" icon="icon-article-line" title="标题"></qf-inner-sub-title>

    <el-form class="qf-form" :model="form" ref="form" :rules="rules" label-width="45px" :hide-required-asterisk="true">
      <el-row :gutter="30">
        
        ${(_a = yield createFormItem()) !== null && _a !== void 0 ? _a : ''}
        
      </el-row>
    </el-form>

    <div class="dialog-footer">
      <el-button class="qf-plain-btn" @click="cancel">取消</el-button>
      <el-button type="primary" @click="ok">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: '${name}',

  inject: ['$dialogRef'],

  data() {
    return {
      form: ${(_c = (_b = JSON.stringify(formData)) === null || _b === void 0 ? void 0 : _b.replace('/,/g', '\r\n ,')) !== null && _c !== void 0 ? _c : ''},
      rules: {}
    };
  },

  methods: {
    cancel() {
      this.$dialogRef.close();
    },
    ok() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$dialogRef.onOk();
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
  `;
    return formTpl;
});
exports.getFormTpl = getFormTpl;


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDialogTpl = void 0;
const getDialogTpl = (name) => {
    const tpl = `<template>
<qf-dialog ref="dialog" :title="dialogTitle" width="626px" :visible.sync="visible">
  <div id="${name}">
    
  </div>

  <template #footer>
    <div class="dialog-footer">
      <el-button :loading="loading" class="qf-plain-btn" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="ok">保存</el-button>
    </div>
  </template>
</qf-dialog>
</template>

<script>
export default {
name: '${name}',

props: {
  visible: {
    type: Boolean,
    default: false
  }
},

data() {
  return {
    loading: false
  };
},

computed: {
  dialogTitle() {
    return this.$dialogRef.record?.editId ? '编辑' : '添加';
  }
},

created() {
  if (this.$dialogRef.record?.editId) {
  }
},

methods: {
  cancel() {
    this.$refs.dialog.close();
  },
  ok() {}
}
};
</script>

<style lang="less" scoped>
</style>
  `;
    return tpl;
};
exports.getDialogTpl = getDialogTpl;


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("fs");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map