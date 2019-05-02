// 项目的入口文件

// 引入 Vue 的包
// import Vue from '../node_modules/vue/dist/vue.js'; // 记住要引入完整的 vue.js 文件，否则默认引入的是 runtime-only 的文件
// 引入完整的 vue.js 文件的另外一个 方法
import Vue from 'vue'; // 在 webpack.config.js 中的 resolve 节点修改 引入的 vue 文件的路径，这种方式比上面的方式更优雅一些
// 还要一种解决方式，既保持使用 import Vue from 'vue' 的方式，也不用在 webpack.config.js 中添加 resolve 节点-----------> 组件写入到 .vue 文件中，使用 vm 实例的 render 函数进行渲染(因为不能再以标签的形式引用了)


// 按需导入 需要用到的 MintUI 中的组件
import { Header } from 'mint-ui';
// 样式文件需要单独导入
import 'mint-ui/lib/style.css'; // 省略 node_modules 目录，因为会自动到这个目录下去找
Vue.component(Header.name, Header); // 手动将导入的组件注册为全局组件

// 引入MUI的样式文件
import './lib/css/mui.min.css';


// 导入 app 组件（在 html 页面中使用的 都是在这里引入）
import app from './App.vue';



// 创建一个 ViewModel 对象
var vm = new Vue({
	el: "#app",
	data: {},
	methods: {},

	/*render: function(createElement) { // render函数默认有一个参数，是一个函数，将导入进来的 app 组件传递给这个函数执行，将执行结果返回，就是将 app 组件中的内容渲染到 el 指定的 vm 实例控制的区域（ id 为 app 的div的内容会被清空）
		return createElement(app);
	}*/
	// render函数的简写：
	render: c => c(app)

});