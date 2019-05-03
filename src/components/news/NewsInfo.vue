<template>
  <div class="newsinfo-container">
    <h3 class="title">{{ newsinfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ newsinfo.add_time | dateFormat }}</span>
      <span>点击：{{ newsinfo.click }}次</span>
    </p>

    <hr>

    <div class="content" v-html="newsinfo.content"></div>

    <!-- 评论子组件 -->
    <!-- 3. 将组件注册是的名称以标签的形式 引用 -->
    <!-- 父组件向子组件传值，这里使用 属性绑定的形式实现 -->
    <comment-box :id="this.id"></comment-box>

  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  // 1. 导入评论组件
  import comment from '../subcomponents/comment.vue';

  export default {
    data() {
      return {
        id: this.$route.params.id, // 将URL地址中传递过来的id值，挂载到data上，方便以后调用
        newsinfo: {} // 新闻对象
      };
    },
    created() {
      this.getNewsInfo();
    },
    methods: {
      getNewsInfo() {
        this.$http.get('api/getnewsinfo/' + this.id).then(res => {
          if (res.body.status === 0) {
            // 获取数据成功，将数据保存到 data 上
            this.newsinfo = res.body.message[0]; // 请求到的新闻数据对象 在 message 的第一个(message 数组中也只有一个元素)
          } else {
            // 获取数据失败提示
            Toast("获取新闻详情失败");
          }
        })
      }
    },
    components: { // 用于注册子组件的节点
      // 2. 将评论组件注册为子组件
      'comment-box': comment
    }
  }
</script>

<style scoped>
  .newsinfo-container {
    padding: 0 6px;
  }

  .newsinfo-container .title {
    font-size: 16px;
    color: red;
    margin: 15px 0;
    text-align: center;
  }
  
  .newsinfo-container .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }

  .newsinfo-container .content {
    font-size: 14px;
    color: #666;
  }
</style>