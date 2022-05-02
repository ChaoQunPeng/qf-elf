/**
 * 获取模板
 * @param params 
 * @returns 
 */
const getTpl = async (params: { name: string }) => {

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
      pageData:null,
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
};


export default {
  getTpl
};