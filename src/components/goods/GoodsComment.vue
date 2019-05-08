<template>
  <div>
    <!-- 3. 以标签的形式 引入 -->
    <cmtbox :id='$route.params.id'></cmtbox>
  </div>
</template>

<script>
  // 1. 导入组件
  import cmtbox from '../subcomponents/comment.vue';

  export default {
    data() {
      return {};
    },

    methods: {

    },

    components: {
      // 2. 注册组件
      cmtbox: cmtbox
    }
  }
</script>

<style scoped>
  
</style>