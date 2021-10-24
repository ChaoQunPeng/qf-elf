export const getDialogTpl = (name: string) => {


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