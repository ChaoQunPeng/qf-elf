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
const path = __webpack_require__(2);
const fs = __webpack_require__(3);
const table_1 = __webpack_require__(4);
const dialog_form_1 = __webpack_require__(6);
const dialog_table_1 = __webpack_require__(7);
const dialog_1 = __webpack_require__(8);
const base_1 = __webpack_require__(9);
const utils_1 = __webpack_require__(5);
function activate(context) {
    // 创建表格列表文件
    let createTableListDisposable = vscode.commands.registerCommand('qf-elf.createTableList', (uri) => __awaiter(this, void 0, void 0, function* () {
        let name = yield showInputBox();
        if (!name) {
            return;
        }
        ;
        createFile(name, yield table_1.default.getTpl({ name: name }), uri);
    }));
    // 生成表格列
    let createTableColDisposable = vscode.commands.registerCommand('qf-elf.createTableCol', () => __awaiter(this, void 0, void 0, function* () {
        let text = yield vscode.env.clipboard.readText();
        let cols = (0, utils_1.createTableColumn)(text);
        pasteContent(cols);
    }));
    // 生成弹框种带表格的文件
    let createDialogTableDisposable = vscode.commands.registerCommand('qf-elf.createDialogTable', (uri) => __awaiter(this, void 0, void 0, function* () {
        let name = yield showInputBox();
        if (!name) {
            return;
        }
        ;
        createFile(name, yield dialog_table_1.default.getTpl({ name: name }), uri);
    }));
    // 生成表单项
    let createFormItemDisposable = vscode.commands.registerCommand('qf-elf.createFormItem', (uri) => __awaiter(this, void 0, void 0, function* () {
        let text = yield vscode.env.clipboard.readText();
        let cols = (0, utils_1.createFormItem)(text);
        pasteContent(cols);
    }));
    // 生成弹框带表单的文件
    let createDialogFormDisposable = vscode.commands.registerCommand('qf-elf.createDialogForm', (uri) => __awaiter(this, void 0, void 0, function* () {
        let name = yield showInputBox();
        if (!name) {
            return;
        }
        ;
        createFile(name, yield dialog_form_1.default.getTpl({ name: name }), uri);
    }));
    // 生成纯弹框
    let createDialogDisposable = vscode.commands.registerCommand('qf-elf.createDialog', (uri) => __awaiter(this, void 0, void 0, function* () {
        let name = yield showInputBox();
        if (!name) {
            return;
        }
        ;
        createFile(name, yield dialog_1.default.getTpl({ name: name }), uri);
    }));
    // 生成qf-label
    let createQflabelDisposable = vscode.commands.registerCommand('qf-elf.createQflabel', (uri) => __awaiter(this, void 0, void 0, function* () {
        let text = yield vscode.env.clipboard.readText();
        let cols = (0, utils_1.createQfLabel)(text);
        pasteContent(cols);
    }));
    // 生成纯弹框
    let createDrawerDisposable = vscode.commands.registerCommand('qf-elf.createDrawer', (uri) => __awaiter(this, void 0, void 0, function* () {
        let name = yield showInputBox();
        if (!name) {
            return;
        }
        ;
        createFile(name, yield dialog_1.default.getTpl({ name: name }), uri);
    }));
    // 生成基础模板
    let createBaseTpl = vscode.commands.registerCommand('qf-elf.createBaseTpl', (uri) => __awaiter(this, void 0, void 0, function* () {
        let name = yield showInputBox();
        if (!name) {
            return;
        }
        ;
        createFile(name, yield base_1.default.getTpl({ name: name }), uri);
    }));
    const disposes = [
        createTableListDisposable,
        createTableColDisposable,
        createDialogTableDisposable,
        createFormItemDisposable,
        createDialogFormDisposable,
        createDialogDisposable,
        createQflabelDisposable,
        createDrawerDisposable,
        createBaseTpl
    ];
    disposes.forEach(d => {
        context.subscriptions.push(d);
    });
}
exports.activate = activate;
/**
 * 粘贴内容
 * @param params
 */
function pasteContent(content) {
    return __awaiter(this, void 0, void 0, function* () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        ;
        const selection = editor.selection;
        editor.edit(builder => builder.replace(selection, content));
    });
}
/**
 * 打开inputbox
 * @param uri
 * @returns
 */
function showInputBox() {
    return __awaiter(this, void 0, void 0, function* () {
        let name = yield vscode.window.showInputBox({
            placeHolder: '输入文件名称，请使用kebab命名方式',
            prompt: '按回车确定'
        });
        name = name === null || name === void 0 ? void 0 : name.replace(/\s+/g, "");
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
    });
}
/**
 * 创建文件
 * @param uri
 * @param content 内容
 * @returns
 */
function createFile(name, content, uri) {
    return __awaiter(this, void 0, void 0, function* () {
        let stats = fs.statSync(uri.fsPath);
        const filePath = path.join(stats.isDirectory() ? uri.fsPath : path.dirname(uri.fsPath), `${name}.vue`);
        const hasFile = fs.existsSync(filePath);
        if (hasFile) {
            vscode.window.showErrorMessage(`文件已存在`);
        }
        else {
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
    });
}
function deactivate() { }
exports.deactivate = deactivate;


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("fs");

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
const vscode = __webpack_require__(1);
const utils_1 = __webpack_require__(5);
const getTpl = (params) => __awaiter(void 0, void 0, void 0, function* () {
    let text = yield vscode.env.clipboard.readText();
    const tpl = `<template>
  <div id="${params.name}" v-loading="loading">
    <el-table class="qf-table" :data="listData.rows" style="width: 100%">
      ${(0, utils_1.createTableColumn)(text)}
    </el-table>

    <div class="text-right mt6" v-if="listData.total != 0">
      <el-pagination
        background
        layout="total,prev, pager, next"
        :current-page="queryParams.page"
        @current-change="paginChange"
        :total="listData.total"
        :page-size="queryParams.page_size"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: '${params.name}',

  data() {
    return {
      queryParams: {
        search: '',
        page: 1,
        page_size: 10
      },
      listData: {
        rows: [],
        total: 0
      },
      loading: false
    };
  },

  created() {
    this.getList();
  },

  methods: {
    /**
     * 查询
     */
    searchOnInput(value) {
      this.$debounce(() => {
        this.queryParams.page = 1;
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
      this.loading = true;

      let result = await this.$api.模块名.getList(this.queryParams).catch(err => {
        this.$message.error('获取列表失败');
        console.error(err);
      });

      if (result) {
        this.listData = result;
      }

      this.loading = false;
    }
  }
};
</script>

<style lang="less" scoped>
</style>`;
    return tpl;
});
exports["default"] = {
    getTpl
};


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createQfLabel = exports.createFormItem = exports.createTableColumn = void 0;
/**
 * 生成表格列
 * @param json 剪切板中的文本
 * @returns 生成好的表格模板
 */
function createTableColumn(json) {
    try {
        let jsonData = JSON.parse(json);
        const createTpl = (json) => {
            let tpl = ``;
            for (const key in json) {
                tpl += `
				<el-table-column prop="${key}" label="${json[key]}">
					<template slot-scope="scope">
						{{ scope.row.${key} | emptyDisplay }}
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
exports.createTableColumn = createTableColumn;
/**
 * 生成表单项
 * @param text 剪切板中的文本
 * @returns 生成好的表格模板
 */
function createFormItem(json) {
    try {
        let jsonData = JSON.parse(json);
        const createTpl = (json) => {
            let tpl = ``;
            for (const key in json) {
                tpl += `
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
            return tpl;
        };
        let cols = createTpl(jsonData);
        return cols;
    }
    catch (error) {
        return '';
    }
}
exports.createFormItem = createFormItem;
/**
 * 生成qf-label
 * @param text 剪切板中的文本
 * @returns 生成好的表格模板
 */
function createQfLabel(json) {
    try {
        let jsonData = JSON.parse(json);
        const createTpl = (json) => {
            let tpl = ``;
            for (const key in json) {
                tpl += `
        <qf-label label="${json[key]}">{{pageData.${key}  | emptyDisplay}}</qf-label>
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
exports.createQfLabel = createQfLabel;


/***/ }),
/* 6 */
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
const vscode = __webpack_require__(1);
const utils_1 = __webpack_require__(5);
/**
 * 生成form data
 * @param text
 * @returns
 */
function generateFormData(text) {
    var _a, _b;
    try {
        let jsonData = JSON.parse(text);
        return (_b = (_a = JSON.stringify(jsonData)) === null || _a === void 0 ? void 0 : _a.replace('/,/g', '\r\n ,')) !== null && _b !== void 0 ? _b : '{}';
    }
    catch (error) {
        return '{}';
    }
}
/**
 * 获取模板
 * @param params
 * @returns
 */
const getTpl = (params) => __awaiter(void 0, void 0, void 0, function* () {
    let text = yield vscode.env.clipboard.readText();
    const tpl = `
  <template>
   <qf-dialog ref="dialog" :title="dialogTitle" width="626px" :visible.sync="visible">
    <div id="${params.name}" v-loading="loading">
      <el-form class="qf-form" :model="form" ref="form" :rules="rules" label-width="45px" :hide-required-asterisk="true">
        <el-row :gutter="24">
          ${(0, utils_1.createFormItem)(text)}
        </el-row>
      </el-form>
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
  name: '${params.name}',

  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      form: ${generateFormData(text)},
      rules: {},
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
    /**
     * 编辑
     */
    async edit(params) {
      this.loading=true;
      let result = await this.$api.模块名.方法名(params).catch(err => {
        this.$message.success('${`提交失败`}');
        console.error(err);
      });

      if (result) {
        this.$message.success('${`提交成功`}');
        this.$dialogRef.onOk();
        this.cancel();
      }

      this.loading=false;
    },
    /**
     * 新增
     */
    async add(params) {
      this.loading=true;
      let result = await this.$api.模块名.方法名(params).catch(err => {
        this.$message.success('${`提交失败`}');
        console.error(err);
      });

      if (result) {
        this.$message.success('${`提交成功`}');
        this.$dialogRef.onOk();
        this.cancel();
      }

      this.loading=false;
    },
    cancel() {
      this.$refs.dialog.close();
    },
    ok() {
      let params = this.form;

      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.$dialogRef.record.editId) {
            this.edit(params);
          } else {
            this.add(params);
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
  `;
    return tpl;
});
exports["default"] = {
    getTpl
};


/***/ }),
/* 7 */
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
const vscode = __webpack_require__(1);
const utils_1 = __webpack_require__(5);
const getTpl = (params) => __awaiter(void 0, void 0, void 0, function* () {
    let text = yield vscode.env.clipboard.readText();
    const tpl = `
  <template>
   <qf-dialog ref="dialog" :title="dialogTitle" width="626px" :visible.sync="visible">
    <div id="${params.name}">
      <el-table class="qf-table-detail" :data="listData.rows" style="width: 100%">
          ${(0, utils_1.createTableColumn)(text)}
      </el-table>
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
  name: '${params.name}',

  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      queryParams: {
        search: '',
        page: 1,
        page_size: 10
      },
      listData: {
        rows: [],
        total: 0
      },
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

    this.getList();
  },

  methods: {
    /**
     * 获取列表
     */
    async getList() {
      this.loading = true;

      let result = await this.$api.模块名.getList(this.queryParams).catch(err => {
        this.$message.error('获取列表失败');
        console.error(err);
      });

      if (result) {
        this.listData = result.data;
      }

      this.loading = false;
    },
    cancel() {
      this.$refs.dialog.close();
    },
    ok() { }
  }
};
</script>

<style lang="less" scoped>
</style>
  
  `;
    return tpl;
});
exports["default"] = {
    getTpl
};


/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports) {


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
/**
 * 获取模板
 * @param params
 * @returns
 */
const getTpl = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const tpl = `
  <template>
  <qf-dialog ref="dialog" :title="dialogTitle" width="626px" :visible.sync="visible">
    <div id="${params.name}" v-loading="loading">
      
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
  name: '${params.name}',

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
      return '标题';
    }
  },

  created() {
    
  },

  methods: {
    cancel() {
      this.$refs.dialog.close();
    },
    ok() {
      this.$dialogRef.onOk();
    }
  }
};
</script>

<style lang="less" scoped>
</style>
  `;
    return tpl;
});
exports["default"] = {
    getTpl
};


/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports) {


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
/**
 * 获取模板
 * @param params
 * @returns
 */
const getTpl = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const tpl = `<template>
  <div></div>
</template>
  
<script>
  
export default {
  name: '${params.name}',

  // components:{},
  
  // props: {},
  
  data() {
    return {
       
     };
  },

  // computed: {},

  // created() {},

  // mounted() {},

  methods: {},

  // watch: {},

  // filters: {},
};
</script>
  
<style lang="less" scoped>
</style>`;
    return tpl;
});
exports["default"] = {
    getTpl,
};


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