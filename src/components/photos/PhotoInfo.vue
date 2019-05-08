<template>
  <div class="photoinfo-container">
    <h3>{{ photoinfo.title }}</h3>
    <div class="subtitle">
      <span>发表时间：{{ photoinfo.add_time | dateFormat }}</span>
      <span>评论：{{ photoinfo.click }}次</span>
    </div>

    <hr>
    
    <!-- 缩略图区域，使用了 vue-preview 插件 -->
    <div class="thumimages">
      <vue-preview :slides="slide"></vue-preview>
    </div>

    <!-- 图片内容区域 -->
    <div class="content" v-html='photoinfo.content'></div>

    <!-- 放置一个 现成的评论子组件 -->
    <!-- 3. 在页面中以 标签的行是引用 -->
    <cmt-box :id='id'></cmt-box>

  </div>
</template>

<script>
  import { Toast } from 'mint-ui';

  // 1. 先导入 评论子组件
  import comment from '../subcomponents/comment.vue';

  export default {
    data() {
      return {
        id: this.$route.params.id, // 路由地址 获取到的参数
        photoinfo: {}, // 图片详情
        slide: [] // 图片缩略图
      };
    },
    created() {
      this.getPhotoInfo();
      this.getThumImages();
    },
    methods: {
      getPhotoInfo() {
        this.$http.get("api/getimageInfo/" + this.id).then(res => {
          if (res.body.status == 0) {
            // 将获取到的数据挂载到 data 身上
            this.photoinfo = res.body.message[0]; // 一个图片详情页面 其实就只是显示一个 图片的详情
          } else {
            Toast("获取图片详情数据失败");
          }
        });
      },

      getThumImages() {
        this.$http.get("api/getthumimages/" + this.id).then(res => {
          if (res.body.status === 0) {
            // 先遍历 获取到的图片列表中的每一项，为 其设置 图片的一些属性（这些属性 可能是获取到的图片列表中的 数据没有的）
            res.body.message.forEach(item => {
              item.msrc = item.src; // 注意： src 属性指定的是 大图，msrc 指定的是 小图，两个属性都要 给出
              item.w = 600; // w 和 h 都是必须要指定的
              item.h = 400;
              item.title = "标题";
              item.alt = "加载失败";
            });

            // 挂载到 data 身上
            this.slide = res.body.message;
          } else {
            Toast("获取图片缩略图失败");
          }
        });
      }
    },

    // 2. 注册子组件
    components: {
      "cmt-box": comment
    }

  }
</script>

<style scoped>
  .photoinfo-container {
    padding: 5px;
  }

  .photoinfo-container h3 {
    font-size: 15px;
    color: #26A2FF;
    text-align: center;
  }

  .photoinfo-container .subtitle {
    font-size: 13px;
    /* 弹性盒子布局 */
    display: flex;
    justify-content: space-between;
  }

  .photoinfo-container .content {
    font-size: 14px;
    line-height: 30px;
  }

  /* 下面的元素 不知道 为什么获取不到，所设置的样式 没有被读取到？？？？？？？？？？？？？？？？？ */
  .photoinfo-container .thumimages figure {
    display: inline-block;
    margin: 10px;
  }
  .photoinfo-container .thumimages img { 
    box-shadow: 0 0 8px #999;
  }
</style>