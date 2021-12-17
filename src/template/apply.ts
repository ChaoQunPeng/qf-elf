/**
 * 获取模板
 * @param params
 * @returns
 */
const getTpl = async (params: { name: string }) => {
  const tpl = `
  <template>
  <qf-dialog ref="dialog" :title="dialogTitle" width="1100px" :visible.sync="visible" :body-padding="true">
    <qf-dialog-layout id="${params.name}" v-loading="loading">
      <div class="flex-1">
        <apply-common-panel ref="applyCommonPanel" class="mt8" module="模块名" fn="方法名"></apply-common-panel>
      </div>
      <div style="width: 400px">
        <flow-shaft :type="pageData.approve_type"></flow-shaft>
      </div>
    </qf-dialog-layout>
  </qf-dialog>
</template>

<script>
import FlowShaft from '@components/content/approve/components/common-flow-shaft/common-flow-shaft';
import ApplyCommonPanel from '@approve/components/apply-common-panel';

export default {
  name: '${params.name}',

  components: {
    FlowShaft,
    ApplyCommonPanel
  },

  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      pageData: {},
      loading: false
    };
  },

  computed: {
    dialogTitle() {
      return '申请';
    }
  },

  created() {
    this.getDetail();
  },

  methods: {
    /**
     * 获取详情
     */
    async getDetail() {
      this.loading = true;
      let result = await this.$api.模块名.方法名({
          id: this.$dialogRef.record.id
        })
        .catch(err => {
          this.$message.error('获取页面数据失败');
          console.error(err);
        });

      if (result) {
        this.pageData = result.data;
      }
      this.loading = false;
    },
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
