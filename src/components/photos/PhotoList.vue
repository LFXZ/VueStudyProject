<template>
  <div>
    
    <div id="slider" class="mui-slider">
        <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
          <div class="mui-scroll">
            <a class="mui-control-item mui-active" href="#item1mobile" data-wid="tab-top-subpage-1.html">
              推荐
            </a>
            <a class="mui-control-item" href="#item2mobile" data-wid="tab-top-subpage-2.html">
              热点
            </a>
            <a class="mui-control-item" href="#item3mobile" data-wid="tab-top-subpage-3.html">
              北京
            </a>
            <a class="mui-control-item" href="#item4mobile" data-wid="tab-top-subpage-4.html">
              社会
            </a>
            <a class="mui-control-item" href="#item5mobile" data-wid="tab-top-subpage-5.html">
              娱乐
            </a>
          </div>
        </div>

      </div>

  </div>
</template>

<script>
  // 顶部滚动区域的实现 官方文档规定 需要 初始化一个控件：
  // 1. 导入 mui.js 文件
  import mui from '../../lib/js/mui.min.js';
  

  export default {
    data() {
      return {};
    },

    mounted() { // 当 组件中的DOM 结构被渲染好 放到页面中后，会执行这个钩子函数，所以 如果要操作元素，最好是在 mounted 里面进行
      // .mui-scroll-wrapper 表示 类选择器，只有当 DOM树被渲染好 放到页面中后 才能通过属性选择器 获取到 DOM 元素
      // 2. 初始化 JS 空间（实现动画的基础）
      mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      });
    },

    methods: {

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
</style>