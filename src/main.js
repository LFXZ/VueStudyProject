// 项目的入口文件

// 引入 Vue 的包
// import Vue from '../node_modules/vue/dist/vue.js'; // 记住要引入完整的 vue.js 文件，否则默认引入的是 runtime-only 的文件
// 引入完整的 vue.js 文件的另外一个 方法
import Vue from 'vue'; // 在 webpack.config.js 中的 resolve 节点修改 引入的 vue 文件的路径，这种方式比上面的方式更优雅一些
// 还要一种解决方式，既保持使用 import Vue from 'vue' 的方式，也不用在 webpack.config.js 中添加 resolve 节点-----------> 组件写入到 .vue 文件中，使用 vm 实例的 render 函数进行渲染(因为不能再以标签的形式引用了)


/*// 按需导入 需要用到的 MintUI 中的组件
import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';
// 样式文件需要单独导入
import 'mint-ui/lib/style.css'; // 省略 node_modules 目录，因为会自动到这个目录下去找
Vue.component(Header.name, Header); // 手动将导入的组件注册为【全局组件】
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload);*/
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(MintUI);


// 引入MUI的样式文件
import './lib/css/mui.min.css';
import './lib/css/icons-extra.css';


// 引入 vue-router 包
import VueRouter from 'vue-router'; // 因为要建立 Vue 和 VueRouter 之间的联系，所以这里也要导入 VueRouter
// 手动安装 VueRouter 
Vue.use(VueRouter);

// 导入 自定义的 路由模块
import router from './router.js';



// 引入 vue-resource 用于发送数据请求
import VueResource from 'vue-resource';
// 手动安装
Vue.use(VueResource);
// 之后 ViewModel 实例对象就会挂载了一个 $http 对象用于发送数据请求

// 全局配置请求地址的 根地址（数据接口的根域名），注意是在 安装了 VueResource 之后才可以配置
Vue.http.options.root='https://www.easy-mock.com/mock/5ccb061ed905ac333e80c01e/vuestudy';
// 全局设置 post 请求 表单数据组织格式， application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;


// 导入 时间格式化插件 （先安装，DOS命令运行： cnpm i moment -S)
import moment from 'moment';
// 定时 时间格式化 的全局过滤器
Vue.filter("dateFormat", function(dateStr, pattern="YYYY-MM-DD HH:mm:ss") {
  return moment(dateStr).format(pattern);
});


// 导入 缩略图 vue-preview 插件 并 安装
import VuePreview from 'vue-preview';
Vue.use(VuePreview);


// 导入 vuex
import Vuex from  'vuex';
// 注册
Vue.use(Vuex);

// 每次在一打开网站的时候，肯定会执行 main.js ，在一打开网站的时候，先从 本地存储中 将 购物车数据读取出来，放到 store 中，读取到 需要转为 数组，不存在 car 就是一个空数组
var car = JSON.parse(localStorage.getItem('car') || '[]');

// 创建 Vuex.Store 实例
var store = new Vuex.Store({
	state: {
		car: car // 将购物车中商品的数据，用一个数组存储起来，在 car 数组中，存储一些商品的对象，这些商品对象可以暂时设计成： { id:商品的id, count:要购买的数量, price:商品的单价, selected: true }
	},
	mutations: {
		addToCar(state, goodsinfo) { // 第一个参数固定是 state，第二个参数是 commit 传递进来的唯一的参数
			// 点击 加入购物车，把商品信息，保存到 store 上的 car 上
			// 分析：
			// 1. 如果购物车中，之前就有这个对应的商品，则只需要更新数量 就可以
			// 2. 如果没有，就把 商品对象 push 到 car 数组中

			// 标识商品有没有找到，默认是 没有找到
			var flag = false;

			state.car.some(item => { // some 方法是 遍历，找到满足条件的 就停止
				if (item.id === goodsinfo.id) {
					item.count = parseInt(item.count) + parseInt(goodsinfo.count); // 数组的加减，为防止中间的过程中出现意外的转变为字符串拼接，最好使用 parseInt ， 比如 如果这里的 商品的数量 如果是手动输入的时候 就会被变为 字符串 导致出错
					flag = true; // 标识商品找到了
					return true; // 还需要手动 return 一下值的
				}
			});

			if (!flag) {
				state.car.push(goodsinfo);
			}


			// 当更新完 car 之后，就将 car 数组 存储到本地的 localStorage 中
			localStorage.setItem('car', JSON.stringify(state.car));

		},

		updateGoodsInfo(state, goodsinfo) {
			// 更新购物车中 商品的数量信息
			// 商品 肯定之前在 store 中就已经存在了，这里只要遍历 store 中的商品对象，找到对应id 的商品，修改其 count 即可
			state.car.some(item => {
				if (item.id == goodsinfo.id) {
					item.count = parseInt(goodsinfo.count);
					return true; // 结束遍历
				}
			});

			// 当更新完 car 之后，就将 car 数组 存储到本地的 localStorage 中
			localStorage.setItem('car', JSON.stringify(state.car));
		},

		removeFromCar(state, id) {
			// 从 store 中 删除 对应 id 的数据
			state.car.some((item, i) => {
				if (item.id == id) {
					state.car.splice(i, 1); // 从 i  的位置开始 删掉一个元素
					return true; // 结束遍历
				}
			});

			// 当更新完 car 之后，就将 car 数组 存储到本地的 localStorage 中
			localStorage.setItem('car', JSON.stringify(state.car));
		},

		changeGoodsSelected(state, info) {
			state.car.some(item => {
				if (item.id == info.id) {
					item.selected = info.selected;
				}
			});

			// 当更新完 car 之后，就将 car 数组 存储到本地的 localStorage 中
			localStorage.setItem('car', JSON.stringify(state.car));
		}

	},
	getters: {
		// getters 里面的方法 相当于 计算属性（计算属性也就是说 只要值发生改变 引用这个值的都会自动更新） 也 相当于 filters过滤器
		getAllCount(state) { // 第一个参数也是固定为 state
			var c = 0;
			state.car.forEach(item => {
				c += parseInt(item.count);
			});
			return c;
		},

		getGoodsCount(state) {
			var o = {};
			state.car.forEach(item => {
				o[item.id] = item.count;
			});
			return o;
		},

		getGoodsSelected(state) {
			var o = {};
			state.car.forEach(item => {
				o[item.id] = item.selected;
			});
			return o;
		},

		// 获取 勾选商品的 数量 和 总价
		getGoodsCountAndAmount(state) {
			var o = {
				count: 0, // 所有被选中商品的 总数量
				amount: 0 // 所有被选中商品的 总价
			};
			state.car.forEach(item => {
				if (item.selected == true) {
					o.count += parseInt(item.count);
					o.amount += item.price * item.count;
				}
			});
			return o;
		}

	}
});


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
	render: c => c(app),

  router, // 将路由对象挂载到 vm 对象上


  store // 将 store 对象 挂载到 vm 实例上

});