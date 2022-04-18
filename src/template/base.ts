/**
 * 获取模板
 * @param params
 * @returns
 */
const getTpl = async (params: { name: string }) => {
    const tpl = `<template>
  <div></div>
</template>
  
<script>
  
export default {
  name: '${params.name}',

  // components:{},
  
  // props: {},
  
  data() {
    return {
       
     };
  },

  // computed: {},

  // created() {},

  // mounted() {},

  methods: {},

  // watch: {},

  // filters: {},
};
</script>
  
<style lang="less" scoped>
</style>`;

    return tpl;
};

export default {
    getTpl,
};
