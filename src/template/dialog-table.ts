import * as vscode from 'vscode';
import { createTableColumn } from './utils';

const getTpl = async (params: { name: string }) => {
  let text = await vscode.env.clipboard.readText();

  const tpl=`
  <template>
   <qf-dialog ref="dialog" :title="dialogTitle" width="626px" :visible.sync="visible">
    <div id="${params.name}">
      <el-table class="qf-table-detail" :data="listData.rows" style="width: 100%">
          ${createTableColumn(text)}
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
};


export default {
  getTpl
};