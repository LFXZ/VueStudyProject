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

### 实现点击加载更多评论
1. 为加载更多按钮，注册点击事件，在事件中，请求下一页数据
2. 点击加载更多，让 pageindex++ ，然后重新调用 this.getComments() 方法 重新获取最新一页的数据
3. 为了防止 新数据覆盖掉之前的数据，在点击加载更多的时候，应该是使用 数组的 拼接(将新请求到的数据数组，拼接到原有的数组的后面)

### 实现发表评论的功能
1. 把文本框做双向数据绑定
2. 为发表按钮注册一个事件
3. 校验评论内容是否为空，如果为空，则提示用户评论内容不能为空
4. 使用 vue-resource 发送请求，将评论的内容 交给服务器
5. 当发表评论OK之后，重新刷新列表，查看最新的评论，最新的评论放在最上面
  + 如果调用 getComments() 方法重新刷新列表的话，可能只得到最后一页的评论，前几页的评论获取不到
  + 换一种思路：当评论成功后，在客户端，手动拼接出一个评论对象，然后调用数组的 unshift 方法，把 最新的评论，追加到 data 中 comments 数组的开头，这样就能实现刷新评论的需求


### 改造 图片分享 按钮为路由的链接并显示对应的组件页面

### 绘制 图片列表 组件页面结构并美化样式
1. 顶部的滑动条制作
  1.1 需要借助 MUI 的 tab-top-webview-main.html 
  1.2 需要把 slider 区域的 mui-fullscreen 类去掉
  1.3 滑动条无法正常触发滑动，通过检查官方文档，发现需要 初始化一个 JS 组件
    1.3.1 导入 mui.js 文件
    1.3.2 调用官方提供的方式 初始化控件：
    ```
      mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      });
    ```
  1.4 但是在初始化 滚动条 控件的时候，导入的 mui.js ，控制台报错：`Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode`
    1.4.1 经过合理的推测，觉得 可能是 mui.js 中用到了 'caller', 'callee', and 'arguments' 这些非严格模式的代码，但是 webpack 在打包生成 bundle.js 文件的时候，默认是 启用 严格模式的，所以这两者冲突了
    1.4.2 解决方案：1. 把 mui.js 中的非严格模式的代码改掉，但是明显这是不现实的； 2. 把 webpack 打包时候的严格模式禁用掉
    1.4.3 最终是使用 第二种方式，使用 transform-remove-strict-mode 这个插件 将 webpack 打包的时候默认启用的严格模式 禁用
  1.5 第一次 进入图片分享页面的时候，滑动条无法正常工作，经过认真的分析，发现 如果要初始化滑动条，必须要等到 DOM 元素加载完毕，所以 要将 初始化控件 的代码 搬到组件的 mounted 生命周期函数中
  1.6 当滑动条 调试OK后，tabbar 无法正常工作了，事实上 应该是 包内部 每个 tabbar 的类： mui-tab-item 类名冲突了的问题，这时，我们可以 把每个 tabbar 按钮的 类样式中 'mui-tab-item'类 改一个名字，将所有这个类对应的样式复制到 组件的 style 标签中

2. 制作底部的图片列表