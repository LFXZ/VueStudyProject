<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
        <router-link :to="'/home/newsinfo/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.image_url">
          <div class="mui-media-body">
            <h1>{{ item.title }}</h1>
            <p class='mui-ellipsis'>
              <span>发表时间：{{ item.add_time | dateFormat }}</span>
              <span>点击：{{ item.click }}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  export default {
    data() {
      return {
        newslist: [] // 保存获取到的新闻列表数据的数组
      };
    },
    created() {
      this.getNewsList();
    },
    methods: {
      getNewsList() {
        this.$http.get('api/getnewslist').then(res => {
          if (res.body.status === 0) {
            // 获取数据成功，将数据保存到 data 身上，方便渲染到页面上
            this.newslist = res.body.message;
          } else {
            Toast('获取新闻列表数据失败');
          }
        })
      }
    }
  }
</script>

<style scoped>
  .mui-table-view li h1 {
    font-size: 14px;
  }
  .mui-table-view li .mui-ellipsis {
    font-size: 12px;
    color: #226aff;
    /* CSS3的方式设置内容左右两边对齐 */
    display: flex;
    justify-content: space-between;
  }
</style>