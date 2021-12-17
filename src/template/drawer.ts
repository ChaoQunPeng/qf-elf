/**
 * 获取模板
 * @param params
 * @returns
 */
const getTpl = async (params: { name: string }) => {
  const tpl = `
  <template>
  <div v-loading="loading">
    <qf-drawer ref="drawer" size="1000px" :withHeader="false" :visible.sync="visible">

    </qf-drawer>
  </div>
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
      pageData: {},
      loading: false
    };
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
