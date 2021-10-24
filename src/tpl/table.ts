import * as vscode from 'vscode';
import * as tableColumn from './table-column';

async function createColumn() {
  let text = await vscode.env.clipboard.readText();
  const editor = vscode.window.activeTextEditor;

  
  if (!editor) {
    return;
  };

  return tableColumn.createColumn(text);
}


export const getTableTpl = async (name: string) => {
  const tableTpl = `<template>
  <div id="${name}">
    <el-table class="qf-table" :data="listData" style="width: 100%">
      ${await createColumn() ?? ''}
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
};