<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入您的评论内容（不多于120字）" maxlength="120"></textarea>

    <mt-button type='primary' size='large'>发表评论</mt-button>
  
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
        <div class="cmt-title">
          第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
        </div>
        <div class="cmt-body">
          {{ item.content === 'undefined' ? '此用户很懒，什么都没留下' : item.content }}
        </div>
      </div>
    </div>

    <mt-button type='danger' size='large' plain>加载更多</mt-button>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  export default {
    data() {
      return {
        pageindex: 1, // 默认展示的是第一页的数据（由于数据接口的问题，有 Bug）
        comments: []
      };
    },
    created() {
      this.getComments();
    },
    methods: {
      getComments() {
        this.$http.get("api/getcomments/" + this.id + "?pageindex=" + this.pageindex).then(res => {
          if (res.body.status === 0) {
            // 获取数据成功，将数据挂载到 data 上
            this.comments = res.body.message;
          } else {
            Toast("获取评论列表失败");
          }
        })
      }
    },

    props: [ "id" ] // 属性绑定从父组件中传递过来的数据 需要先 定义一下
  }
</script>

<style scoped>
  .cmt-container h3 {
    font-size: 18px;
  }

  .cmt-container textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .cmt-list {
    margin-top: 5px;
  }
  .cmt-list .cmt-item{
    font-size: 13px;
  }
  .cmt-list .cmt-item .cmt-title {
    background-color: #ccc;
    line-height: 30px;
  }
  .cmt-list .cmt-item .cmt-body {
    line-height: 35px;
    text-indent: 2em;
  }
</style>