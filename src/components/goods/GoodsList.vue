<template>
  <div class="goods-list">

    <!-- <router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/' + item.id" tag="div">
      <img :src="item.img_url">
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </router-link> -->

    <!-- 在网页中实现跳转有两种方式： 1. 使用 a 标签的方式，叫做 标签跳转； 2. 使用 BOM 的 window.location.href 的方式，叫做 编程式导航（即 以JS代码的形式实现的跳转） -->
    
    <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
      <img :src="item.img_url">
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </div>

    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>

  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
   export default {
    data() {
      return {
        pageindex: 0, // 当前的页数
        goodslist: [] // 商品列表数据
      };
    },

    created() {
      this.getGoodsList();
    },

    methods: {
      getGoodsList() {
        this.$http.get("api/getgoods?pageindex=" + this.pageindex).then(res => {
          if (res.body.status === 0) {
            // this.goodslist = res.body.message;
            this.goodslist = this.goodslist.concat(res.body.message); // 之前的数据应该保存而不是被覆盖
          }else {
            Toast("获取商品列表数据失败");
          }
        });
      },

      getMore() {
        this.pageindex++;
        this.getGoodsList();
      },

      goDetail(id) {
        // 使用 JS 的方式 实现路由导航
        console.log(this);
        // 上面的代码 打印出来的是一个 Vue 实例，这个 Vue 实例中有两个属性，一个是 $route，一个是 $router，两个都是对象
        // 一定要区分：this.$route 和 this.$router 这两个对象
        // this.$route 是 【 路由参数对象 】 ，所有路由中的参数 params 和 query 都属于它
        // this.$router 是一个 【 路由导航对象 】，用它可以方便地使用JS代码，实现路由的 前进，后退，跳转到新的 URL地址

        // 这里是使用 vue-router 的 相关 API 实现的 编程式导航
        // vue-router 提供的 API 有四种：
        // 1. 最简单的方式，传递路由地址字符串
        // this.$router.push('/home/goodsinfo/' + id);
        // 2. 传递对象
        // this.$router.push({ path: '/home/goodsinfo/' + id });
        // 3. 使用路由的命名， name 属性值 是 路由的名字，在 router.js 中指定了
        // this.$router.push({ name: 'goodsinfo', params: { id: id }});
        // 4. 带查询参数
        this.$router.push({ path: '/home/goodsinfo/' + id, query: { id: id }});

        // this.$router 对象有 go，forward，back 这些方法（是其原型对象的），调用这些方法实现页面的 前进，后退
      }
    }
  }
</script>

<style scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap; /* 设置换行 */
    padding: 8px;
    justify-content: space-between;
  }

  .goods-list .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;

    /* 设置为 弹性布局，改变主轴方向后，让 元素在 垂直方向 两端对齐！！！！ */
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    min-height: 300px;
  }

  .goods-list .goods-item img {
    width: 100%;
  }

  .goods-list .goods-item .title {
    font-size: 14px;
  }

  .goods-list .goods-item .info {
    background-color: #eee;
  }

  .goods-list .goods-item .info .price {

  }

  .goods-list .goods-item .info p {
    margin: 0;
    padding: 5px;
  }

  .goods-list .goods-item .info .price .now {
    color: red;
    font-weight: bold;
    font-size: 16px;
  }

  .goods-list .goods-item .info .price .old {
    text-decoration: line-through;
    font-size: 12px;
    margin-left: 10px;
  }

  .goods-list .goods-item .info .sell {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
</style>