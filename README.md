# 这是一个个人学习Vue过程中开发的项目

## 开发记录

### 制作 App 组件
1. 完成 Header 区域，使用的是 MintUI 的 Header 组件
2. 制作底部的 Tabbar 区域，使用的是 MUI 的 tabbar.html
 + 修改 tabbar 的小图标
3. 在中间区域放置一个 router-view 用于展示路由匹配到的组件

### 改造 tabbar 的 a 链接为 router-link

### 设置路由高亮

### 点击 tabbar 的路由链接，展示对应的路由组件

### 制作首尔轮播图布局

### 加载首页轮播图数据
1. 获取数据，使用 vue-resource，安装 vue-resource，DOS 命令中运行 cnpm i vue-resource -S，然后将 vue-resource 导入并安装
2. 使用 vue-resource 的 this.$http.get 方法获取数据
3. 获取到的数据要保存到 data 身上
4. 使用 v-for 渲染每一个 item 项

### 改造九宫格区域的样式

### 完成组件切换时的动画效果