<template>
  <div class="app-container">
    <!-- 顶部 header 区域 -->
		<mt-header fixed title="个人Vue项目" class="header">
      <span slot="left" @click="goBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>  
    </mt-header>

    <!-- 中间内容区域 -->
		<transition>
			<router-view></router-view>
		</transition>

    <!-- 底部 tabbar 区域 -->
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item1" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item1" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item1" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge" id='badge'>{{ this.$store.getters.getAllCount }}</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item1" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
// 组件中自己的数据，都是使用 export default 向外暴露出一个对象，在这个对象中写 组件自己的数据
export default {
    data() {
        return {
            msg: '这是app组件中的内容',
            flag: false // 表示 返回按钮 是否显示，默认是 不显示
        }
    },

    created() {
      // 刚以进来页面就 判断一下是不是首页，是首页则隐藏返回按钮，不是首页则显示返回按钮（因为存在刷新页面时不在首页，但是也没有发生路由地址的改变，从而 返回按钮也没有显示的情况）
      this.flag = this.$route.path == '/home' ? false : true;
    },

    methods: {
      goBack() {
        // 点击后退
        this.$router.go(-1);
      }
    },

    watch: {
      // 监听 路由地址的变化，如果 路由地址 变为 首页，则应该隐藏 返回按钮
      '$route.path': function(newVal) {
        if (newVal == '/home') {
          this.flag = false;
        } else {
          this.flag = true;
        }
      }
    }
}
</script>

<style scoped>
	.app-container {
		padding-top: 40px;
		padding-bottom: 50px;
		overflow-x: hidden;  /* 设置水平方向不能出现滚动条 */ 
	}

  .header {
    z-index: 999;  /* 设置标题的层级在最上面 */
  }

	
	/* 组件切换的动画效果 */
	.v-enter{ /* 进入时的状态：在视口的右边，透明度为0 */
		transform: translateX(100%);  /* 100% 指的是设备的宽度 */
		opacity: 0;
	}

	.v-leave-to { /* 离开时的状态：在视口的左边，透明度为0 */
		transform: translateX(-100%);  /* 100% 指的是设备的宽度 */
		opacity: 0;
		position: absolute; /* 离开的时候元素就不占位置了 */
	}

	.v-enter-active,
	.v-leave-active {
		transition: all 0.5s ease;
	}


	/* 将mui-tab-item类名重命名为 mui-tab-item11 解决 使用 顶部滚动区域控件之后 tabbar 无法切换的问题 */
	.mui-bar-tab .mui-tab-item1.mui-active {
    color: #007aff;
	}

	.mui-bar-tab .mui-tab-item1 {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
	}

	.mui-bar-tab .mui-tab-item1 .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
	}

	.mui-bar-tab .mui-tab-item1 .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
	}
</style>