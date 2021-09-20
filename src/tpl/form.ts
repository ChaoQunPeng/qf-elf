import * as vscode from 'vscode';

let formData: string;

async function createFormItem() {
  let text = await vscode.env.clipboard.readText();
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    return;
  };

  try {
    let jsonData = JSON.parse(text);

    formData = jsonData;


    const createTpl = (json: any) => {
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
  } catch (error) {
    return '';
  }
}

export const getFormTpl = async (name: string) => {
  let cols = await createFormItem();

  const formTpl = `<template>
  <div id="${name}">
    <qf-inner-sub-title class="mb-13" icon="icon-article-line" title="标题"></qf-inner-sub-title>

    <el-form class="qf-form" :model="form" ref="form" :rules="rules" label-width="45px" :hide-required-asterisk="true">
      <el-row :gutter="30">
        
        ${await createFormItem() ?? ''}
        
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
      form: ${JSON.stringify(formData)?.replace('/,/g', '\r\n ,') ?? ''},
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
};