import * as vscode from 'vscode';
import { createTableColumn } from './utils';

const getTpl = async (params: { name: string }) => {
  let text = await vscode.env.clipboard.readText();

  const tpl = `<template>
  <div id="${params.name}" v-loading="loading">
    <el-table class="qf-table" :data="listData.rows" style="width: 100%">
      ${createTableColumn(text)}
    </el-table>

    <div class="text-right mt6" v-if="listData.total > queryParams.page_size">
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
        this.listData = result.data;
      }

      this.loading = false;
    }
  }
};
</script>

<style lang="less" scoped>
</style>`;

  return tpl;
};


export default {
  getTpl
};