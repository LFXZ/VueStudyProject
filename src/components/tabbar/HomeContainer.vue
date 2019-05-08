<template>
  <div>
    <!-- 轮播图区域 -->
    <swiper :lunbotuList='lunbotuList' :isFull='true'></swiper><!-- 通过属性绑定的方式，实现父组件向子组件传值 -->
    
    <!-- 六宫格区域改造工程 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
        <img src="../../images/menu1.jpg">
        <div class="mui-media-body">新闻资讯</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
        <img src="../../images/menu2.jpg">
        <div class="mui-media-body">图片分享</div></router-link></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
        <img src="../../images/menu3.jpg">
        <div class="mui-media-body">商品购买</div></router-link></li>
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
  // 导入轮播图子组件
  import swiper from '../subcomponents/swiper.vue';

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
    },

    // 导入的子组件要先注册一下，然后以标签的形式在页面中引用
    components: {
      swiper
    }
  }
</script>

<style scoped>

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