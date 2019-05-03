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

### 改造新闻资讯路由链接

### 新闻资讯页面制作
1. 绘制界面，使用MUI中的 media-list.html
2. 使用 vue-resource 获取数据
3. 渲染真实的数据

### 实现新闻资讯列表 点击跳转到新闻详情
1. 把列表中的每一项改造为router-link，同时在跳转的时候提供唯一的id标识符
2. 创建新闻详情组件页面 NewsInfo.vue
3. 在路由模块中，将 新闻详情 路由地址 和 组件页面对应起来

### 实现新闻详情的页面布局和数据渲染

### 单独封装一个 comment.vue 评论子组件
1. 先创建一个单独的 comment.vue 组件模板
2. 在需要使用 comment 组件的页面中，先手动导入 comment 组件
  + `import comment from './comment.vue'`
3. 在父组件中，使用 components 属性，将刚才导入的 comment 组件，注册为自己的子组件
4. 将注册子组件的时候，注册名称 以标签形式 在页面中引用即可

### 获取所有的评论数据，显示到页面中
