<template>
  <!-- 问题：我们不知道什么时候能拿到 max 的值，但是，总归有一刻，会得到一个 正确的 max 的值 -->
  <!-- 我们可以使用 watch 属性监听，来 监听 父组件 传递过来的 max 的值，不管 watch 被触发几次，但是，最后一次，肯定是一个 正确的 max 值 -->
  <div class="mui-numbox" data-numbox-min='1'>
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref='numbox' />
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
        // 当 数量发生改变的时候 就将 改变后的值 传递给父组件
        // 在这里调用 父组件传递进来的 方法，将 值 传递给这个方法，使用 this.$emit() 调用，第一个参数是 要调用的函数的名字，第二个参数 是要传递进这个方法的 参数
        this.$emit('getCount', this.$refs.numbox.value);
      }
    },

    props: ['max'],

    watch: {
      'max': function(newValue, oldValue) {
        // 监听 从父组件传递进来的 max 值的改变，设置为 numberbox 的最大值，max 最后一次改变时 max 肯定是正确值（这里需要插件 MUI 的对应的 API）
        mui('.mui-numbox').numbox().setOption('max', newValue);
      }
    }
  }

</script>

<style scoped>

</style>