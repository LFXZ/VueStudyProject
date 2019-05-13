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

- 需要借助 MUI 的 tab-top-webview-main.html 
- 需要把 slider 区域的 mui-fullscreen 类去掉
- 滑动条无法正常触发滑动，通过检查官方文档，发现需要 初始化一个 JS 组件
  - 导入 mui.js 文件
  - 调用官方提供的方式 初始化控件：

  ```
      mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      });
  ```
- 但是在初始化 滚动条 控件的时候，导入的 mui.js ，控制台报错：`Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode`
  - 经过合理的推测，觉得 可能是 mui.js 中用到了 'caller', 'callee', and 'arguments' 这些非严格模式的代码，但是 webpack 在打包生成 bundle.js 文件的时候，默认是 启用 严格模式的，所以这两者冲突了
  - 解决方案：1. 把 mui.js 中的非严格模式的代码改掉，但是明显这是不现实的； 2. 把 webpack 打包时候的严格模式禁用掉
  - 最终是使用 第二种方式，使用 transform-remove-strict-mode 这个插件 将 webpack 打包的时候默认启用的严格模式 禁用
- 第一次 进入图片分享页面的时候，滑动条无法正常工作，经过认真的分析，发现 如果要初始化滑动条，必须要等到 DOM 元素加载完毕（因为只有 元素先被渲染并放到 页面中去后，才能通过选择器获取到这个元素），所以 要将 初始化控件 的代码 搬到组件的 mounted 生命周期函数中
  - *****************************************但是并没有解决是为什么？？？？？？？？
- 当滑动条 调试OK后，tabbar 无法正常工作了，事实上 应该是 包内部 每个 tabbar 的类： mui-tab-item 类名 和导入的 mui文件 冲突了的问题，这时，我们可以 把每个 tabbar 按钮的 类样式中 'mui-tab-item'类 改一个名字，将所有这个类对应的样式复制到 组件的 style 标签中
- 渲染分类列表的数据：数据接口中规定了 要手动在获取到的数据数组的第一个添加一个id 为0 的元素，表示“全部”

2. 制作底部的图片列表
- 图片列表需要使用懒加载技术，我们可以使用 MintUI 提供的现成的组件 'lazy-load'
- 根据 'lazy-load' 使用文档，尝试使用
- 渲染图片列表数据

### 实现 图片的懒加载改造和样式美化
- 关于 懒加载图标显示不出来的问题：是 按需导入的问题，就是如果 MintUI 是按需导入的，就不会显示 懒加载的图标，如果是 全部导入的 就可以显示

### 实现点击图片 跳转到图片详情页面
1. 在改造 li 成 router-link 的时候，需要使用 tag 属性指定要渲染为哪种标签

### 实现详情页面的布局和美化，同时获取数据渲染页面

### 实现图片详情的 缩略图
- 有现成的 插件：[vue-preview](https://github.com/LS1231/vue-preview)
- 获取到所有的图片列表，然后使用 v-for 指令渲染数据
- 注意使用 vue-preview 插件的时候 需要注意的一些问题，如 获取到的图片列表数组中的 图片有一些属性是必须的，所有需要先 使用  for-each 语句 遍历一些图片列表，具体做法看 官方文档
- ****************出现一个问题：就是 vue-preview 默认渲染出来的标签，自己无法获取到 然后为其 设置样式？？？？？

### 绘制 商品列表 页面基本结构 并美化
- 改造 商品列表 路由
- 实现商品列表的 经典两列布局
- 注意CSS3布局的使用
- 注意：实现 两列 中间的距离和各自距离左边和右边的距离 相等，使用的是：给外盒子左右 两边设置相同的 padding ，然后 中间 的两个 使用弹性布局 设置为 两个 两端对齐；垂直方向，可以先改变主轴的方向（flex-direction: column），然后设置 元素在 垂直方向 两端对齐

### 尝试在手机上 进行项目的预览和测试
1. 保证自己的手机可以正常运行
2. 保证 手机和开发项目的电脑 处于同一个 WIFI 环境中，即 手机可以访问到电脑的 ip（可以使手机连接到电脑的wifi）
3. 打开自己的项目中的 package.json 文件，在 dev 脚本中添加 --host 指令，把当前电脑的 wifi IP地址，设置为 --host 指令的值
  - 如：`"dev": "webpack-dev-server --port 3000 --open --contentBase src --hot --host 192.168.253.1"`
  - 如何查看自己电脑所处的 wifi 的IP呢？ 在 cmd 终端中运行 'ipconfig' 命令，查看 无线网的 ip地址
  - 这里实现的做法是：电脑打开 360免费wifi，手机连接电脑的 wifi，然后 手机浏览器 访问 电脑的 wifi IP地址（电脑可能要关闭防火墙之后 手机才能访问）


### 编程式导航
- 使用 a 标签的方式 实现跳转的，叫 标签跳转
- 使用 JS 代码的方式 实现跳转的，叫 编程式导航

### 后退按钮怎么实现
- this.$router.go(-1),this.$router.back()
- 后退按钮，但是这个按钮是在 有 前一页的时候 才会出现，没有前一页的时候 不会出现，这个怎么实现？？？？？？？？

### 抽离轮播图组件
- 由于轮播图 在多个页面中都有使用，所以将 轮播图抽离出为一个 单独的子组件
- 解决轮播图宽度的问题：首页的轮播图 是希望 宽度和高度都是 100%的，但是 图片详情页面的 轮播图 应该只是 高度为100%，宽度应该让其自适应
  - 解决方法：将 图片的宽度是否 应该是100%，使用一个参数 传进给 轮播图子组件
  
### 商品详情页面布局和数据渲染

### 编程式导航实现 图文介绍和商品评论跳转

### 使用 钩子函数实现 购物车小球的半场动画
- 从 https://cubic-bezier.com 这个网站中 可以获取更多的动画效果
- 实现小球动画适配不同的滚定位置和分配率

### 实现每当 numbox 的值改变立即把购买数量传给父组件
- 涉及到 子组件 向 父组件传值

### 实现 根据库存量 设置 numbox 的最大值

### 启动 vuex 并设计购物车数据存储方式
- 先安装：cnpm i vuex -S  
- 导入--注册--创建实例--挂载

### 实现 点击加入购物车的功能 以及 徽标数值的自动更新

### 实现购物车商品的 本地持久存储
- localStorage.setItem('car', JSON.stringify(state.car));
  - JSON.stringify 是将一个数组 转为 字符串
- 每次在一打开网站的时候，肯定会执行 main.js ，在一打开网站的时候，先从 本地存储中 将 购物车数据读取出来，放到 store 中，读取到 需要转为 数组，不存在 car 就是一个空数组
  - var car = JSON.parse(localStorage.getItem('car') || '[]');
  - JSON.parse 是将字符串转为数组

### 绘制 购物车页面 商品列表布局

### 实现 购物车中商品的数量 同步到 numbox 中
- 利用数据请求 请求过来的数据中，是没有 购物车商品的数量的，这个值存储在 store 中
- 现在的问题是 购物车页面中的商品列表数据 是 发送请求获取到的，得到的数据中没有商品的数量信息，现想要 将 对应商品的 数量信息 显示在 对应的 numbox 上
- 解决办法：创建一个空对象，遍历 store 中的 商品数据，将商品数据的 id 设置为 创建的对象的属性名，将对应商品的数量 设置为对应属性的 属性值，然后 提供 一个 getters 方法 用以 获取到这个对象
- 这样外面在 获取到这个对象之后 可以 通过 id 直接得到 对应的 count 商品数量的值

### 实现 购物车商品数量 数据同步到 store 中
- 获取 numbox 文本框中的数据，连同商品的id 传递给 store 的 mutation 中更新数据的方法 即可

### 实现 购物车页面 中的 删除 功能
- 需要同时删除 store 中的数据 和 购物车页面中显示的 商品列表的数据

### 把 购物车中商品 的 store 中的选中状态 同步到 页面中
- 创建一个空对象，遍历 store 中的 商品数据，将商品数据的 id 设置为 创建的对象的属性名，将对应商品的 选中状态 设置为对应属性的 属性值，然后 提供 一个 getters 方法 用以 获取到这个对象
- 这样外面在 获取到这个对象之后 可以 通过 id 直接得到 对应的 商品的选中状态

### 同步商品的 勾选状态 保存到 store 中
- 监听 按钮状态的改变，将 选中状态改变的商品的 id 和 选中的状态 传递给 store 中 mutation 中 提供的修改 状态的方法


### 实现 勾选商品的 数量 和 总价的自动计算
- 遍历 store 中 购物车中的所有 商品，把 选中状态为 正确的 数量 和 价格 都 加和起来，提供一个  getters 给外部 即可

### 实现返回按钮

### 将项目托管到 apache 并启用 Gzip 压缩



