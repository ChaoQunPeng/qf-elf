import * as vscode from 'vscode';
import { createFormItem } from './utils';

/**
 * 生成form data
 * @param text 
 * @returns 
 */
function generateFormData(text: string) {
  try {
    let jsonData = JSON.parse(text);

    return JSON.stringify(jsonData)?.replace('/,/g', '\r\n ,') ?? '{}';
  } catch (error) {
    return '{}';
  }
}

/**
 * 获取模板
 * @param params 
 * @returns 
 */
const getTpl = async (params: { name: string }) => {
  let text = await vscode.env.clipboard.readText();

  const tpl = `
  <template>
   <qf-dialog ref="dialog" :title="dialogTitle" width="626px" :visible.sync="visible">
    <div id="${params.name}" v-loading="loading">
      <el-form class="qf-form" :model="form" ref="form" :rules="rules" label-width="45px" :hide-required-asterisk="true">
        <el-row :gutter="24">
          ${createFormItem(text)}
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
      let result = await this.$api.模块名.方法名(params).catch(err => {
        this.$message.success('${`提交失败`}');
        console.error(err);
      });

      if (result) {
        this.$message.success('${`提交成功`}');
        this.$dialogRef.onOk();
        this.cancel();
      }
    },
    /**
     * 新增
     */
    async add(params) {
      let result = await this.$api.模块名.方法名(params).catch(err => {
        this.$message.success('${`提交失败`}');
        console.error(err);
      });

      if (result) {
        this.$message.success('${`提交成功`}');
        this.$dialogRef.onOk();
        this.cancel();
      }
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
};


export default {
  getTpl
};