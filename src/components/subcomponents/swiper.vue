<template>
  <div>
    <mt-swipe :auto="4000">
      <!-- 注意：使用 v-for 遍历渲染数据的时候，一定要给每一项绑定唯一的 key 属性值，互联网中的 url 都是唯一的 ，所以可以使用 数据的 url 属性作为 key 值-->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
        <img :src="item.image" :class="{ 'full': isFull }"> 
        <!--这里通过属性绑定为元素添加样式，full是类名，isFull是布尔值，为 true 时这个类样式就会被应用-->
        <!--src 要进行属性绑定，否则 item.image 是被当做字符串处理-->
      </mt-swipe-item>
    </mt-swipe>
  </div>

  <!-- 为什么商品评论的轮播图为什么那么丑？？ -->
  <!-- 1. 首页中的图片，它的宽和高，都是使用了100% -->
  <!-- 2. 在商品详情页面中，轮播图的图片，应该设置为 高度为100&，但是宽度应该让其自适应 -->
  <!-- 3. 商品详情页面中的轮播图，期望高度是 100%，但是宽度为自适应 -->
  <!-- 4. 经过分析，得到问题的原因：首页中的轮播图 和 详情页面中的轮播图，分歧点是 宽度到底是100% 还是 自适应 -->
  <!-- 5. 既然这两个轮播图的其他方面是 没有冲突的，只是宽度有分歧，那么我们可以 定义一个属性，让轮播图的调用者，手动指定 是否为100%的宽度 -->


</template>

<script>
  export default {
    data() {
      return {};
    },

    methods: {

    },

    props: ['lunbotuList', 'isFull'] // 从父组件传进来的值，一定要先 props 接收一下
  }
</script>

<style scoped>
  .mint-swipe {
    height: 200px;
    text-align: center;
  }
  
  .mint-swipe img {
    height: 100%;
  }
  
  /* .mint-swipe .mint-swipe-item:nth-child(1) { nth-child 是 CSS3 提供的选择器
    background-color: red;
  }
  
  .mint-swipe .mint-swipe-item:nth-child(2) {
    background-color: skyblue;
  }
  
  .mint-swipe .mint-swipe-item:nth-child(3) {
    background-color: pink;
  } */

  .full {
    width: 100%;
  }
</style>