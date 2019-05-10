<template>
  <div class="shopcar-container">
    
    <div class="goods-list" v-for="(item, i) in goodslist" :key="item.id">
      
      <!-- 商品列表区域 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">

            <mt-switch
              v-model="$store.getters.getGoodsSelected[item.id]"
              @change="selectedChange(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path">
            <div class="info">
              <h1>{{ item.title }}</h1>
              <p>
                <span class="price">￥{{ item.sell_price }}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <!-- 问题：如何在购物车中获取到商品的数量 并显示到 numbox 中？？ -->
                <!-- 我们可以创建一个空对象，然后循环购物车中所有商品的数据，把 当前循环的这条商品的 id ，作为对象的属性名，count 值作为对象的属性值，这样把所有的商品都循环了一遍之后，就会得到一个对象：{ 88： 1， 89： 2， 90： 3} -->
                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
              </p>
            </div>

          </div>
        </div>
      </div>

    </div>

    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>已勾选商品<span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span>件，总价<span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import numbox from '../subcomponents/shopcar_numbox.vue';
  import { Toast } from 'mint-ui';

  export default {
    data() {
      return {
        goodslist: [] // 购物车中的商品列表
      };
    },

    created() {
      this.getGoodsList();
    },

    methods: {
      getGoodsList() {
        // 1. 获取到 store 中 所有商品的id，然后 拼接出一个 用逗号分隔的 字符串
        var idArr = [];
        this.$store.state.car.forEach(item => idArr.push(item.id));

        // 如果 store 中没有数据，则不应该发送请求，否则会报错
        if (idArr.length <= 0) {
          return;
        }

        // 获取购物车商品列表
        this.$http.get('api/goods/getshopcarlist/' + idArr.join(',')).then(res => {
          if (res.body.status === 0) {
            this.goodslist = res.body.message;
          }else {
            Toast('获取购物车商品列表数据失败');
          }
        });
      },

      remove(id, index) {
        // 根据id 删除 store 中对应的对象，根据 index 删除 goodslist 中的对象
        this.goodslist.splice(index, 1);

        this.$store.commit('removeFromCar', id);
      },

      selectedChange(id, val) {
        // console.log(id+'---'+val);
        // 调用 store 中 mutations 中提供的方法 修改 商品选中的状态
        this.$store.commit('changeGoodsSelected', { id:id, selected: val });
      }
    },

    components: {
      numbox
    }
  }
</script>

<style scoped>
  p {
    margin: 0;
    padding: 0;
  }
  .shopcar-container {
    background-color: #eee;
    overflow: hidden;
  }

  .shopcar-container .goods-list img {
    width: 60px;
    height: 60px;
  }

  .shopcar-container .goods-list .info {
    /* 让子元素在 垂直方向 两端对齐 */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .shopcar-container .goods-list .info h1 {
    font-size: 13px;
  }

  .shopcar-container .goods-list .info .price {
    color: red;
    font-weight: bold;
  }

  .shopcar-container .goods-list .mui-card-content-inner {
    display: flex;
    align-items: center; /* 设置为纵向居中 */
  }


  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center; /* 垂直居中 */
  }

  .jiesuan .red {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
</style>