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
        

        <approve-common-panel
          :approve-type="dialogRecord.approve_type"
          :approve-id="dialogRecord.approve_id"
          :options="pageData.button_option"
          @after-action="afterApprove"
        ></approve-common-panel>
      </div>
      <div style="width: 400px">
        <flow-shaft :value="dialogRecord.approve_id" :type="pageData.approve_type"></flow-shaft>
      </div>
    </qf-dialog-layout>
  </qf-dialog>
</template>

<script>
import FlowShaft from '@components/content/approve/components/common-flow-shaft/common-flow-shaft';
import ApproveCommonPanel from '@approve/components/approve-common-panel';


export default {
  name: '${params.name}',

  components: {
    FlowShaft,
    ApproveCommonPanel
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
      return '审批';
    },
    dialogRecord() {
      return this.$dialogRef.record;
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
      let result = await this.$api.personnel
        .getEntryExamine({
          approve_id: this.$dialogRef.record.approve_id
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
    afterApprove() {
      this.$dialogRef.onOk();
      this.$refs.dialog.close();
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
  getTpl,
};
