<template>
  <div>
    
    <!-- 顶部滑动区域 -->
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <!-- 这里通过属性绑定的方式为 元素添加属性，可以使用数组的方式，同时可以使用三元表达式，只为id为0的那一项添加样式 -->
          <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id" @click="getPhotoListByCateId(item.id)">
            {{ item.title }}
          </a>
        </div>
      </div>
    </div>

    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="info-header">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>

  </div>
</template>

<script>
  // 顶部滚动区域的实现 官方文档规定 需要 初始化一个控件：
  // 1. 导入 mui.js 文件
  import mui from '../../lib/js/mui.min.js';
  

  export default {
    data() {
      return {
        cates: [], // 图片分类列表
        list: [] // 图片列表
      };
    },

    created() {
      this.getAllCategory();
      this.getPhotoListByCateId(0); // 进入到 页面之后 首先加载 “全部” 的图片列表
    },

    mounted() { // 当 组件中的DOM 结构被渲染好 放到页面中后，会执行这个钩子函数，所以 如果要操作元素，最好是在 mounted 里面进行
      // .mui-scroll-wrapper 表示 类选择器，只有当 DOM树被渲染好 放到页面中后 才能通过属性选择器 获取到 DOM 元素
      // 2. 初始化 JS 空间（实现动画的基础）
      mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      });
    },

    methods: {

      getAllCategory() {
        this.$http.get("api/getimgcategory").then(res => {
          if (res.body.status === 0) {
            res.body.message.unshift({
              "title": "全部",
              "id": 0
            });
            this.cates = res.body.message;
          } else {
            Toast("获取图片分类列表失败");
          }
        });
      },

      getPhotoListByCateId(cateid) {
        // 根据 分类id 获取图片列表
        this.$http.get("api/getimages/" + cateid).then(res => {
          if (res.body.status === 0) {
            this.list = res.body.message;
          } else {
            Toast("获取图片列表失败");
          }
        });
      }

    }
  }
</script>

<style>
/* 在 滑动 顶部的滑动区域的时候，如果报错：
[Intervention] Unable to preventDefault inside passive event listener due to target being treated as passive. 
则 添加下面的样式可以解决 
原因：是 Chrome 为提高页面的流畅度而折腾出来的东西，自己到 MDN 查
*/
  * {
    touch-action: pan-y;
  }

  .photo-list {
    list-style: none;
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
  }

  .photo-list li {
    text-align: center;
    background-color: grey;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #ccc;
    position: relative;
  }
  .photo-list li img { 
    width: 100%;
    vertical-align: middle; /* 取消图片下面的3像素的方法 */
  }

  /* 懒加载图片的样式（文档中规定的） */
  .photo-list li img[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
  }

  .photo-list li .info {
    color: #fff;
    text-align: left;
    position: absolute;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    max-height: 90px;
  }

  .photo-list li .info .info-header {
    font-size: 14px;
  }

  .photo-list li .info .info-body {
    font-size: 13px;
  }
</style>