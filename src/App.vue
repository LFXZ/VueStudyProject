<template>
  <div class="app-container">
    <!-- 顶部 header 区域 -->
		<mt-header fixed title="个人Vue项目"></mt-header>
    <!-- 中间内容区域 -->

    <!-- 底部 tabbar 区域 -->
		<nav class="mui-bar mui-bar-tab">
			<a class="mui-tab-item mui-active" href="#tabbar">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-with-chat">
				<span class="mui-icon mui-icon-email"><span class="mui-badge">9</span></span>
				<span class="mui-tab-label">消息</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-with-contact">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">通讯录</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-with-map">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">设置</span>
			</a>
		</nav>


    <h1>这是 App 组件</h1>
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
		margin-top: 40px;
	}
</style>