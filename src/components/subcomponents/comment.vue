<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入您的评论内容（不多于120字）" maxlength="120" v-model="msg"></textarea>

    <mt-button type='primary' size='large' @click='postComment'>发表评论</mt-button>
  
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

    <mt-button type='danger' size='large' plain @click='getMore'>加载更多</mt-button>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  export default {
    data() {
      return {
        pageindex: 1, // 默认展示的是第一页的数据（由于数据接口的问题，有 Bug）
        comments: [], // 获取到的评论的数据
        msg: '' // 评论的内容
      };
    },
    created() {
      this.getComments();
    },
    methods: {
      // 获取评论
      getComments() {
        this.$http.get("api/getcomments/" + this.id + "?pageindex=" + this.pageindex).then(res => {
          if (res.body.status === 0) {
            // 获取数据成功，将数据挂载到 data 上
            // this.comments = res.body.message;
            // 每当获取新的评论数据的时候，不要把 老数据 覆盖，而应该是在 老数据后面 拼接上 新获取的数据
            this.comments = this.comments.concat(res.body.message); // 数组拼接
          } else {
            Toast("获取评论列表失败");
          }
        })
      },
      // 加载更多事件
      getMore() {
        this.pageindex++;
        this.getComments();
      },
      // 发表评论
      postComment() {

        // 校验内容是否为空，字符串的trim()方法是 去掉字符串左右两边的空格的作用
        if (this.msg.trim().length === 0) {
          return Toast("评论内容不能为空"); // return 的作用是阻止后面的代码再执行
        }

        // 发送 post 请求，注意 post 请求有三个参数：
        // 参数1：请求的URL地址
        // 参数2：提交给服务器的数据对象 { content: this.msg }，content 是数据接口API中定义的
        // 参数3：定义提交的时候，表单的数据格式， { emulateJSON: true }，这里在 main.js 中进行了全局配置

        // ***********************************************不明白这里怎么就实现了？？？？？？？还是说这里实现的也只是 假的，也就是远程服务器上并没有我们提交的数据？？？？？ 那 post 请求的参数中的 数据对象的作用是什么？？？？
        
        this.$http
        .post("api/postcomment/" + this.$route.params.id, { 
          content: this.msg.trim()
        })
        .then(function(res) {
          if (res.body.status === 0) {
            var cmt = { // 拼接出一个评论对象
              user_name: "匿名用户",
              add_time: Date.now(),
              content: this.msg.trim()
            };
            this.comments.unshift(cmt);
            this.msg = '';
          } else {
            Toast("评论提交失败");
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