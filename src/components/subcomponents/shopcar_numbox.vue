<template>
  <div class="mui-numbox" data-numbox-min='1' style="height: 25px;">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref='numbox' readonly />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
  // import '../../lib/css/mui.min.css'; 为什么这里不加也是可以的？？？
  
  import mui from '../../lib/js/mui.min.js';

  export default {
    data(){
      return {};
    },

    // 组件的JS效果需要手动初始化一下， 在 mounted 中初始化 保证初始化时 元素应该加载并 保存到页面中了
    mounted() {
      mui('.mui-numbox').numbox();
      console.log(this.max);
    },

    methods: {
      countChanged() {
        // 数量改变了
        // console.log(this.$refs.numbox.value); // 能够 访问到 numbox 的 文本框中的数字
        // 调用 store 的 mutation 中提供的 更新购物车数量的方法
        this.$store.commit('updateGoodsInfo', { id: this.goodsid, count: this.$refs.numbox.value});
      }
    },

    props: ['initcount', 'goodsid']
  }

</script>

<style scoped>

</style>