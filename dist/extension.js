(()=>{"use strict";var n={112:function(n,e,t){var a=this&&this.__awaiter||function(n,e,t,a){return new(t||(t=Promise))((function(i,o){function l(n){try{s(a.next(n))}catch(n){o(n)}}function r(n){try{s(a.throw(n))}catch(n){o(n)}}function s(n){var e;n.done?i(n.value):(e=n.value,e instanceof t?e:new t((function(n){n(e)}))).then(l,r)}s((a=a.apply(n,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.deactivate=e.activate=void 0;const i=t(496),o=t(17),l=t(147),r=t(33),s=t(650),c=t(595),d=t(280),u=t(608),f=t(712),p=t(850);function m(n){return a(this,void 0,void 0,(function*(){const e=i.window.activeTextEditor;if(!e)return;const t=e.selection;e.edit((e=>e.replace(t,n)))}))}function v(){return a(this,void 0,void 0,(function*(){let n=yield i.window.showInputBox({placeHolder:"输入文件名称，请使用kebab命名方式",prompt:"按回车确定"});if(n=null==n?void 0:n.replace(/\s+/g,""),n)return`${n}`}))}function h(n,e,t){return a(this,void 0,void 0,(function*(){let a=l.statSync(t.fsPath);const r=o.join(a.isDirectory()?t.fsPath:o.dirname(t.fsPath),`${n}.vue`);l.existsSync(r)?i.window.showErrorMessage("文件已存在"):l.writeFile(r,e,(n=>{n?i.window.showInformationMessage(n.message):(i.window.showTextDocument(i.Uri.file(r)),i.window.showInformationMessage("创建成功!"))}))}))}e.activate=function(n){[i.commands.registerCommand("qf-elf.createTableList",(n=>a(this,void 0,void 0,(function*(){let e=yield v();e&&h(e,yield r.default.getTpl({name:e}),n)})))),i.commands.registerCommand("qf-elf.createTableCol",(()=>a(this,void 0,void 0,(function*(){let n=yield i.env.clipboard.readText();m((0,p.createTableColumn)(n))})))),i.commands.registerCommand("qf-elf.createDialogTable",(n=>a(this,void 0,void 0,(function*(){let e=yield v();e&&h(e,yield c.default.getTpl({name:e}),n)})))),i.commands.registerCommand("qf-elf.createFormItem",(n=>a(this,void 0,void 0,(function*(){let n=yield i.env.clipboard.readText();m((0,p.createFormItem)(n))})))),i.commands.registerCommand("qf-elf.createDialogForm",(n=>a(this,void 0,void 0,(function*(){let e=yield v();e&&h(e,yield s.default.getTpl({name:e}),n)})))),i.commands.registerCommand("qf-elf.createDialog",(n=>a(this,void 0,void 0,(function*(){let e=yield v();e&&h(e,yield d.default.getTpl({name:e}),n)})))),i.commands.registerCommand("qf-elf.createQflabel",(n=>a(this,void 0,void 0,(function*(){let n=yield i.env.clipboard.readText();m((0,p.createQfLabel)(n))})))),i.commands.registerCommand("qf-elf.createDrawer",(n=>a(this,void 0,void 0,(function*(){let e=yield v();e&&h(e,yield u.default.getTpl({name:e}),n)})))),i.commands.registerCommand("qf-elf.createBaseTpl",(n=>a(this,void 0,void 0,(function*(){let e=yield v();e&&h(e,yield f.default.getTpl({name:e}),n)}))))].forEach((e=>{n.subscriptions.push(e)}))},e.deactivate=function(){}},712:function(n,e){var t=this&&this.__awaiter||function(n,e,t,a){return new(t||(t=Promise))((function(i,o){function l(n){try{s(a.next(n))}catch(n){o(n)}}function r(n){try{s(a.throw(n))}catch(n){o(n)}}function s(n){var e;n.done?i(n.value):(e=n.value,e instanceof t?e:new t((function(n){n(e)}))).then(l,r)}s((a=a.apply(n,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.default={getTpl:n=>t(void 0,void 0,void 0,(function*(){return`<template>\n  <div></div>\n</template>\n  \n<script>\n  \nexport default {\n  name: '${n.name}',\n\n  // components:{},\n  \n  // props: {},\n  \n  data() {\n    return {\n       \n     };\n  },\n\n  // computed: {},\n\n  // created() {},\n\n  // mounted() {},\n\n  methods: {},\n\n  // watch: {},\n\n  // filters: {},\n};\n<\/script>\n  \n<style lang="less" scoped>\n</style>`}))}},650:function(n,e,t){var a=this&&this.__awaiter||function(n,e,t,a){return new(t||(t=Promise))((function(i,o){function l(n){try{s(a.next(n))}catch(n){o(n)}}function r(n){try{s(a.throw(n))}catch(n){o(n)}}function s(n){var e;n.done?i(n.value):(e=n.value,e instanceof t?e:new t((function(n){n(e)}))).then(l,r)}s((a=a.apply(n,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0});const i=t(496),o=t(850);e.default={getTpl:n=>a(void 0,void 0,void 0,(function*(){let e=yield i.env.clipboard.readText();const t=`\n  <template>\n   <qf-dialog ref="dialog" :title="dialogTitle" width="626px" :visible.sync="visible">\n    <div id="${n.name}" v-loading="loading">\n      <el-form class="qf-form" :model="form" ref="form" :rules="rules" label-width="45px" :hide-required-asterisk="true">\n        <el-row :gutter="24">\n          ${(0,o.createFormItem)(e)}\n        </el-row>\n      </el-form>\n    </div>\n\n    <template #footer>\n      <div class="dialog-footer">\n        <el-button :loading="loading" class="qf-plain-btn" @click="cancel">取消</el-button>\n        <el-button :loading="loading" type="primary" @click="ok">保存</el-button>\n      </div>\n    </template>\n  </qf-dialog>\n</template>\n\n<script>\nexport default {\n  name: '${n.name}',\n\n  props: {\n    visible: {\n      type: Boolean,\n      default: false\n    }\n  },\n\n  data() {\n    return {\n      form: ${function(n){var e,t;try{let a=JSON.parse(n);return null!==(t=null===(e=JSON.stringify(a))||void 0===e?void 0:e.replace("/,/g","\r\n ,"))&&void 0!==t?t:"{}"}catch(n){return"{}"}}(e)},\n      rules: {},\n      loading: false\n    };\n  },\n\n  computed: {\n    dialogTitle() {\n      return this.$dialogRef.record?.editId ? '编辑' : '添加';\n    }\n  },\n\n  created() {\n    if (this.$dialogRef.record?.editId) {\n\n    }\n  },\n\n  methods: {\n    /**\n     * 编辑\n     */\n    async edit(params) {\n      this.loading=true;\n      let result = await this.$api.模块名.方法名(params).catch(err => {\n        this.$message.success('提交失败');\n        console.error(err);\n      });\n\n      if (result) {\n        this.$message.success('提交成功');\n        this.$dialogRef.onOk();\n        this.cancel();\n      }\n\n      this.loading=false;\n    },\n    /**\n     * 新增\n     */\n    async add(params) {\n      this.loading=true;\n      let result = await this.$api.模块名.方法名(params).catch(err => {\n        this.$message.success('提交失败');\n        console.error(err);\n      });\n\n      if (result) {\n        this.$message.success('提交成功');\n        this.$dialogRef.onOk();\n        this.cancel();\n      }\n\n      this.loading=false;\n    },\n    cancel() {\n      this.$refs.dialog.close();\n    },\n    ok() {\n      let params = this.form;\n\n      this.$refs.form.validate(valid => {\n        if (valid) {\n          if (this.$dialogRef.record.editId) {\n            this.edit(params);\n          } else {\n            this.add(params);\n          }\n        }\n      });\n    }\n  }\n};\n<\/script>\n\n<style lang="less" scoped>\n</style>\n  `;return t}))}},595:function(n,e,t){var a=this&&this.__awaiter||function(n,e,t,a){return new(t||(t=Promise))((function(i,o){function l(n){try{s(a.next(n))}catch(n){o(n)}}function r(n){try{s(a.throw(n))}catch(n){o(n)}}function s(n){var e;n.done?i(n.value):(e=n.value,e instanceof t?e:new t((function(n){n(e)}))).then(l,r)}s((a=a.apply(n,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0});const i=t(496),o=t(850);e.default={getTpl:n=>a(void 0,void 0,void 0,(function*(){let e=yield i.env.clipboard.readText();return`\n  <template>\n   <qf-dialog ref="dialog" :title="dialogTitle" width="626px" :visible.sync="visible">\n    <div id="${n.name}">\n      <el-table class="qf-table-detail" :data="listData.rows" style="width: 100%">\n          ${(0,o.createTableColumn)(e)}\n      </el-table>\n    </div>\n\n    <template #footer>\n      <div class="dialog-footer">\n        <el-button :loading="loading" class="qf-plain-btn" @click="cancel">取消</el-button>\n        <el-button :loading="loading" type="primary" @click="ok">保存</el-button>\n      </div>\n    </template>\n  </qf-dialog>\n</template>\n\n<script>\nexport default {\n  name: '${n.name}',\n\n  props: {\n    visible: {\n      type: Boolean,\n      default: false\n    }\n  },\n\n  data() {\n    return {\n      queryParams: {\n        search: '',\n        page: 1,\n        page_size: 10\n      },\n      listData: {\n        rows: [],\n        total: 0\n      },\n      loading: false\n    };\n  },\n\n  computed: {\n    dialogTitle() {\n      return this.$dialogRef.record?.editId ? '编辑' : '添加';\n    }\n  },\n\n  created() {\n    if (this.$dialogRef.record?.editId) {\n    }\n\n    this.getList();\n  },\n\n  methods: {\n    /**\n     * 获取列表\n     */\n    async getList() {\n      this.loading = true;\n\n      let result = await this.$api.模块名.getList(this.queryParams).catch(err => {\n        this.$message.error('获取列表失败');\n        console.error(err);\n      });\n\n      if (result) {\n        this.listData = result.data;\n      }\n\n      this.loading = false;\n    },\n    cancel() {\n      this.$refs.dialog.close();\n    },\n    ok() { }\n  }\n};\n<\/script>\n\n<style lang="less" scoped>\n</style>\n  \n  `}))}},280:function(n,e){var t=this&&this.__awaiter||function(n,e,t,a){return new(t||(t=Promise))((function(i,o){function l(n){try{s(a.next(n))}catch(n){o(n)}}function r(n){try{s(a.throw(n))}catch(n){o(n)}}function s(n){var e;n.done?i(n.value):(e=n.value,e instanceof t?e:new t((function(n){n(e)}))).then(l,r)}s((a=a.apply(n,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.default={getTpl:n=>t(void 0,void 0,void 0,(function*(){return`\n  <template>\n  <qf-dialog ref="dialog" :title="dialogTitle" width="626px" :visible.sync="visible">\n    <div id="${n.name}" v-loading="loading">\n      \n    </div>\n\n    <template #footer>\n      <div class="dialog-footer">\n        <el-button :loading="loading" class="qf-plain-btn" @click="cancel">取消</el-button>\n        <el-button :loading="loading" type="primary" @click="ok">保存</el-button>\n      </div>\n    </template>\n  </qf-dialog>\n</template>\n\n<script>\nexport default {\n  name: '${n.name}',\n\n  props: {\n    visible: {\n      type: Boolean,\n      default: false\n    }\n  },\n\n  data() {\n    return {\n      pageData:null,\n      loading: false\n    };\n  },\n\n  computed: {\n    dialogTitle() {\n      return '标题';\n    }\n  },\n\n  created() {\n    \n  },\n\n  methods: {\n    cancel() {\n      this.$refs.dialog.close();\n    },\n    ok() {\n      this.$dialogRef.onOk();\n    }\n  }\n};\n<\/script>\n\n<style lang="less" scoped>\n</style>\n  `}))}},608:function(n,e){var t=this&&this.__awaiter||function(n,e,t,a){return new(t||(t=Promise))((function(i,o){function l(n){try{s(a.next(n))}catch(n){o(n)}}function r(n){try{s(a.throw(n))}catch(n){o(n)}}function s(n){var e;n.done?i(n.value):(e=n.value,e instanceof t?e:new t((function(n){n(e)}))).then(l,r)}s((a=a.apply(n,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.default={getTpl:n=>t(void 0,void 0,void 0,(function*(){return`\n  <template>\n  <div v-loading="loading">\n    <qf-drawer ref="drawer" size="1000px" :withHeader="false" :visible.sync="visible">\n\n    </qf-drawer>\n  </div>\n</template>\n\n<script>\n\nexport default {\n  name: '${n.name}',\n\n  props: {\n    visible: {\n      type: Boolean,\n      default: false\n    }\n  },\n\n  data() {\n    return {\n      pageData: {},\n      loading: false\n    };\n  }\n};\n<\/script>\n\n<style lang="less" scoped>\n</style>\n  `}))}},33:function(n,e,t){var a=this&&this.__awaiter||function(n,e,t,a){return new(t||(t=Promise))((function(i,o){function l(n){try{s(a.next(n))}catch(n){o(n)}}function r(n){try{s(a.throw(n))}catch(n){o(n)}}function s(n){var e;n.done?i(n.value):(e=n.value,e instanceof t?e:new t((function(n){n(e)}))).then(l,r)}s((a=a.apply(n,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0});const i=t(496),o=t(850);e.default={getTpl:n=>a(void 0,void 0,void 0,(function*(){let e=yield i.env.clipboard.readText();return`<template>\n  <div id="${n.name}" v-loading="loading">\n    <el-table class="qf-table" :data="listData.rows" style="width: 100%">\n      ${(0,o.createTableColumn)(e)}\n    </el-table>\n\n    <div class="text-right mt6" v-if="listData.total > queryParams.page_size">\n      <el-pagination\n        background\n        layout="total,prev, pager, next"\n        :current-page="queryParams.page"\n        @current-change="paginChange"\n        :total="listData.total"\n        :page-size="queryParams.page_size"\n      ></el-pagination>\n    </div>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: '${n.name}',\n\n  data() {\n    return {\n      queryParams: {\n        search: '',\n        page: 1,\n        page_size: 10\n      },\n      listData: {\n        rows: [],\n        total: 0\n      },\n      loading: false\n    };\n  },\n\n  created() {\n    this.getList();\n  },\n\n  methods: {\n    /**\n     * 查询\n     */\n    searchOnInput(value) {\n      this.$debounce(() => {\n        this.queryParams.page = 1;\n        this.queryParams.search = value;\n        this.getList();\n      }, 300);\n    },\n    /**\n     * 分页\n     */\n    paginChange(page) {\n      this.queryParams.page = page;\n      this.getList();\n    },\n    /**\n     * 获取列表\n     */\n    async getList() {\n      this.loading = true;\n\n      let result = await this.$api.模块名.getList(this.queryParams).catch(err => {\n        this.$message.error('获取列表失败');\n        console.error(err);\n      });\n\n      if (result) {\n        this.listData = result.data;\n      }\n\n      this.loading = false;\n    }\n  }\n};\n<\/script>\n\n<style lang="less" scoped>\n</style>`}))}},850:(n,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.createQfLabel=e.createFormItem=e.createTableColumn=void 0,e.createTableColumn=function(n){try{let e=JSON.parse(n);const t=n=>{let e="";for(const t in n)e+=`\n\t\t\t\t<el-table-column prop="${t}" label="${n[t]}">\n\t\t\t\t\t<template slot-scope="scope">\n\t\t\t\t\t\t{{ scope.row.${t} | emptyDisplay }}\n\t\t\t\t\t</template>\n\t\t\t\t</el-table-column>\n        `;return e};return t(e)}catch(n){return""}},e.createFormItem=function(n){try{let e=JSON.parse(n);const t=n=>{let e="";for(const t in n)e+=`\n\t\t\t\t<el-col :span="24">\n          <el-form-item prop="${t}">\n            <template #label>\n              <i class="iconfont icon-account"></i>\n            </template>\n            <el-input v-model.trim="form.${t}" placeholder="${n[t]}" maxlength="30" clearable></el-input>\n          </el-form-item>\n        </el-col>\n        `;return e};return t(e)}catch(n){return""}},e.createQfLabel=function(n){try{let e=JSON.parse(n);const t=n=>{let e="";for(const t in n)e+=`\n        <qf-label label="${n[t]}">{{pageData.${t}  | emptyDisplay}}</qf-label>\n        `;return e};return t(e)}catch(n){return""}}},496:n=>{n.exports=require("vscode")},147:n=>{n.exports=require("fs")},17:n=>{n.exports=require("path")}},e={},t=function t(a){var i=e[a];if(void 0!==i)return i.exports;var o=e[a]={exports:{}};return n[a].call(o.exports,o,o.exports,t),o.exports}(112);module.exports=t})();