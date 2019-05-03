<template>
  <div class="app-container">
    <!-- 顶部 header 区域 -->
		<mt-header fixed title="个人Vue项目"></mt-header>

    <!-- 中间内容区域 -->
		<transition>
			<router-view></router-view>
		</transition>

    <!-- 底部 tabbar 区域 -->
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge">0</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
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
            msg: '这是app组件中的内容'
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

</style>