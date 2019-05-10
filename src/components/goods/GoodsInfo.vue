<template>
  <div class="goodsinfo-container">

    <!-- 购物车小球，使用钩子函数实现小球的半场动画 -->
    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:afterEnter="afterEnter"
    >
      <div class="ball" v-show='ballFlag' ref="ball"></div>
    </transition>
    
    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList='lunbotu' :isFull='false'></swiper>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="now-price">￥{{ goodsinfo.sell_price }}</span>
          </p>
          <p>购买数量：<goodsinfo_numbox @getCount="getSelectedCount" :max="goodsinfo.stock_quantity"></goodsinfo_numbox></p>
          <!-- 上面通过属性绑定的方式 将 库存量 传递给 子组件 作为 numbox 的最大值，但是注意一个问题：goodsinfo 默认是一个 空对象，将其设置为 当前商品信息是在 发送请求之后的then 方法里面，而发送数据请求是一个 promise 异步操作，也就是 在渲染完页面的时候 数据还没有请求到，所以 goodsinfo 可能还是一个 空对象，那么 传递给子组件的 就是 undefined -->
          <p>
            <mt-button type='primary' size='small'>立即购买</mt-button>
            <mt-button type='danger' size='small' @click='addIntoShopCart'>加入购物车</mt-button>
            
            <!-- 分析：如何实现点击 加入购物车 的时候，拿到选择的数量 -->
            <!-- 1. 经过分析发现，按钮属于 goodsinfo 页面，数字属于 numberbox 组件 -->
            <!-- 2. 由于涉及到了 父子组件的嵌套，所以无法直接在 goodsinfo 页面中获取到 选择的数量 -->
            <!-- 3. 怎么解决这个问题：涉及到了 子组件向父组件 传值的问题，利用事件调用机制 -->
            <!-- 4. 事件调用的本质：父组件向子组件传递方法，子组件调用这个方法，同时把 数据 当作参数 传递给 这个方法 -->

          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
        <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsinfo.goods_no }}</p>
          <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
          <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type='primary' size='large' plain @click='godesc(id)'>图文介绍</mt-button>
        <!--<br>  这里 br 不起作用，说明父元素使用了 flex 布局，需要改变父元素的 display 的值 -->
        <mt-button type='danger' size='large' plain @click='gocomment(id)'>商品评论</mt-button>
      </div>
    </div>

  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import swiper from '../subcomponents/swiper.vue';
  import goodsinfo_numbox from '../subcomponents/goodsinfo_numbox.vue';

  export default {
    data() {
      return {
        id: this.$route.params.id,
        lunbotu: [], // 获取到的轮播图
        goodsinfo: {}, // 商品详情
        ballFlag: false, // 控制小球是否显示，默认为不显示，点击 “加入购物车” 按钮显示
        selectedCount: 1 // 保存用户选择的商品的数量，默认是 1
      };
    },

    created() {
      this.getLunbotu();
      this.getGoodsInfo();
    },

    methods: {
      getLunbotu() {
        this.$http.get("api/getthumimages/" + this.id).then(res => {
          if (res.body.status === 0) {
            // 获取到的 数据 应该先遍历一下，为每一项都设置 image 属性，因为 轮播图组件中 识别的是 image 为图片的 url 地址，而这里获取到的图片的地址是 src 属性
            res.body.message.forEach(item => {
              item.image = item.src;
            });
            this.lunbotu = res.body.message;
          }else {
            Toast("获取轮播图片失败");
          }
        });
      },

      getGoodsInfo() {
        this.$http.get("api/goods/getinfo/" + this.id).then(res => {
          if (res.body.status === 0) {
            this.goodsinfo = res.body.message[0];
          }else {
            Toast("获取商品详情数据失败");
          }
        });
      },

      godesc(id) {
        // 编程式导航 跳转到 商品图文介绍页面
        this.$router.push({ name: 'goodsdesc', params: { id }});
      },

      gocomment(id) {
        // 编程式导航 跳转到 商品评论页面
        this.$router.push({ name: 'goodscomment', params: { id }});
      },

      addIntoShopCart() {
        // 小球显示切换
        this.ballFlag = !this.ballFlag;

        // { id:商品的id, count:要购买的数量, price:商品的单价, selected:true }
        // 拼接出一个 要保存到 vuex 上的 商品对象
        var goodsinfo = { id: this.id, count: this.selectedCount, price: this.goodsinfo.sell_price, selected: true };

        // 调用 store 中 mutation 中的方法，实现 共享数据的操作
        this.$store.commit('addToCar', goodsinfo);
        
      },

      // 半场动画钩子函数
      beforeEnter(el) {
        // 小球的初始状态
        el.style.transform = "translate(0, 0)";
      },

      enter(el, done) {
        el.offsetWidth; /* 不加这一句 动画不会显示 */

        /* 动画结束小球最终的状态 */
        /* el.style.transform = "translate(90px, 228px)"; */ 
        /* el.style.transition = 'all 1s cubic-bezier(.73,.36,.84,.54)'; */ 
        /* cubic-bezier(.73,.36,.84,.54) 是贝塞尔缓动函数，从 https://cubic-bezier.com 这个网站中复制过来的，可以了解一下 */


        /*
          小球动画优化思路：
          1. 先分析导致小球动画不准确的原因，我们把小球最终位移到的位置，已经局限在了 某一分辨率下的 滚动条未滚动的 情况
          2. 只要 分辨率 和测试的时候不一样，或者 滚动条有了一定的滚动距离的时候，问题就出现了
          3. 因此，经过分析，得到结论：不能把最终位置的 横纵坐标 写固定，而是应该 根据不同的情况，动态计算这个坐标值
          4. 经过分析，得到解题思路：先得到 徽标的横纵坐标，再得到小球的横纵坐标，然后让 y 值求差，x 值也求差
          5. 如何获取 徽标和小球的位置？？？ domObject.getBoundingClientRect() 这个方法返回的是 一个对象，包含四个属性：left, top, right, bottom，分别是DOM对象距离 页面左部 顶部 右部 下部 的距离，这个方法是原生的 JS 方法

        */

        // 获取小球 在页面中的位置（小球是 当前组件中的元素，为小球元素设置了ref 属性之后，使用 this.$refs 可以访问到这个对象 获取到这个DOM元素）
        const ballPosition = this.$refs.ball.getBoundingClientRect();
        // 获取徽标 在页面中的位置（ 徽标是 父组件中的元素，虽然说 Vue不支持直接操作DOM元素，但是主要是针对涉及到数据的时候，有些时候还是可以直接操作DOM 元素的，这里，只要是在一个页面中的元素 都可以通过 document.getElementById() 获取到，无论是 在父组件中的 还是在子组件中的
        const badgePosition = document.getElementById('badge').getBoundingClientRect();

        const xDist = badgePosition.left - ballPosition.left;
        const yDist = badgePosition.top - ballPosition.top;


        el.style.transform = `translate(${ xDist }px, ${ yDist }px)`; /* 动画结束小球最终的状态 */
        el.style.transition = 'all 0.5s cubic-bezier(.73,.36,.84,.54)'; /* cubic-bezier(.73,.36,.84,.54) 是贝塞尔缓动函数，从 https://cubic-bezier.com 这个网站中复制过来的，可以了解一下 */

        done(); // 手动调用 afterEnter 方法
      },

      afterEnter() {
        // 动画结束小球应该消失
        this.ballFlag = false;
      },

      getSelectedCount(count) {
        // count 是 子组件 调用这个方法的时候 向父组件传的值
        this.selectedCount = count;
        console.log(this.selectedCount);
      }
    },

    components: {
      swiper,
      goodsinfo_numbox
    }
  }
</script>

<style scoped>
  .goodsinfo-container {
    background-color: #eee;
    overflow: hidden; /* 外边距塌陷的解决方法：外面的盒子设置溢出隐藏 */
  }

  .now-price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }

  .mui-card-footer {
    display: block;
  }

  .mui-card-footer button {
    margin: 15px 0;
  }

  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 391px;
    left: 148px;
  }
</style>