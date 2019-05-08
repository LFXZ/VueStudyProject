<template>
  <div class="goodsdesc-container">
    <h3>{{ info.title }}</h3>
    <hr>
    <div class="content" v-html='info.content'></div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  export default {
    data() {
      return {
        info: {} // 商品介绍
      };
    },

    created() {
      this.getGoodsDesc();
    },

    methods: {
      getGoodsDesc() {
        this.$http.get("api/goods/getdesc/" + this.$route.params.id).then(res => {
          if (res.body.status === 0) {
            this.info = res.body.message[0];
          } else {
            Toast("获取商品介绍数据失败");
          }
        });
      }
    }
  }
</script>

<style scoped>
  .goodsdesc-container h3 {
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
  }

  .goodsdesc-container .content {
    font-size: 14px;
    color: #666;
    padding: 10px;
    text-indent: 2em;
  }

  /* 如果获取到的 content 的内容 中 有图片，图片 在显示的时候 显示的是过大，则可以把 style 标签的 scoped 属性去掉，然后 设置 对应 img 标签的宽带为 100% */
</style>