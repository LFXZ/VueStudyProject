<template>
  <div>
    <mt-swipe :auto="4000">
      <!-- 注意：使用 v-for 遍历渲染数据的时候，一定要给每一项绑定唯一的 key 属性值，互联网中的 url 都是唯一的 ，所以可以使用 数据的 url 属性作为 key 值-->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
        <img :src="item.image"> <!--src 要进行属性绑定，否则 item.image 是被当做字符串处理-->
      </mt-swipe-item>
    </mt-swipe>
    
    <!-- 六宫格区域改造工程 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
        <img src="../../images/menu1.jpg">
        <div class="mui-media-body">新闻资讯</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
        <img src="../../images/menu2.jpg">
        <div class="mui-media-body">图片分享</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
        <img src="../../images/menu3.jpg">
        <div class="mui-media-body">商品购买</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
        <img src="../../images/menu4.jpg">
        <div class="mui-media-body">留言反馈</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
        <img src="../../images/menu5.jpg">
        <div class="mui-media-body">视频专区</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
        <img src="../../images/menu6.jpg">
        <div class="mui-media-body">联系我们</div></a></li>
    </ul> 

  </div>
</template>

<script>
  import { Toast } from 'mint-ui';

  // 这里要发送获取轮播图的请求
  export default {
    data() {
      return {
        lunbotuList: [] // 用于保存获取到的轮播图数据
      };
    },
    // 执行 getLunbo 的时机
    created() {
      this.getLunbotu();
    },
    methods: {
      getLunbotu() {
        // 获取轮播图数据的方法
        this.$http.get("api/getlunbotu").then(result => {
          // console.log(result.body);
          if (result.body.status === 0) {
            this.lunbotuList = result.body.message;
          } else {
            // 弹框提示获取轮播图数据失败，使用的是 MintUI 的组件
            Toast('加载轮播图失败');
          }
        })
      }
    }
  }
</script>

<style scoped>
  .mint-swipe {
    height: 200px;
  }

  .mint-swipe .mint-swipe-item:nth-child(1) { /* nth-child 是 CSS3 提供的选择器 */
    background-color: red;
  }

  .mint-swipe .mint-swipe-item:nth-child(2) {
    background-color: skyblue;
  }

  .mint-swipe .mint-swipe-item:nth-child(3) {
    background-color: pink;
  }

  img {
    width: 100%;
    height: 100%;
  }

  .mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border: none;
  }
  .mui-table-view.mui-grid-view.mui-grid-9 img {
    width: 60px;
    height: 60px;
  }
  .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: none;
  }

  .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
    font-size: 13px;
  }
</style>