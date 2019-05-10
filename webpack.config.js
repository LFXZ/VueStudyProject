// webpack 的配置文件，向外暴露一个 配置对象

var path = require('path');

// 引入 html-webpack-plugin ，接收到的是一个构造函数
var htmlWebpackPlugin = require('html-webpack-plugin');
// 引入 vue-loader 伴生的 VueLoaderPlugin，然后要new处理一个插件实例 vue-loader 才能正常使用
var VueLoaderPlugin = require('vue-loader/lib/plugin.js'); // 注意：如果这里写成 node_modules/vue-loader/lib/plugin.js 是错误的，这里 node_modules不能加上，而 import 语句是 node_modules 加上也可以 不加上也可以

// 使用的 node 的语法
module.exports = {
	entry: path.join(__dirname, 'src/main.js'),
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},

	plugins: [
		new htmlWebpackPlugin({ // 创建一个 html-webpack-plugin 插件对象，接收一个配置对象
			template: path.join(__dirname, 'src/index.html'), // 将哪个 html 页面保存到内存中
			filename: 'index.html' // 生成的内存中的页面的名字，和本来的页面同名就可以在打开浏览器的时候访问的就是生成的在内存中的页面了
		}),

		new VueLoaderPlugin()
	],


	module: {
		rules: [
			{ test: /\.vue$/, use: 'vue-loader' },
			{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 注意顺序：加载器的执行顺序是从后往前的，先由css加载器进行处理再由style加载器进行处理
			{ test: /\.(ttf|woff|woff2|eot|svg)$/, use: 'url-loader' }, // 处理字体的加载器
			{ test: /\.(jpg|png|jpeg|gif)$/, use: 'url-loader' }, // 处理图片的加载器也是 url-loader
		]
	}

	// resolve: {
	// 	alias: { // 设置导入的 Vue 的文件是完整的 vue.js 文件
	// 		"vue$": "vue/dist/vue.js"
	// 	}
	// }	
	
}