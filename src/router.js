// 从 main.js 中抽离出来的路由模块

import VueRouter from 'vue-router';

// 导入各个组件
import HomeContainer from './components/tabbar/HomeContainer.vue';
import MemberContainer from './components/tabbar/MemberContainer.vue';
import SearchContainer from './components/tabbar/SearchContainer.vue';
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue';
import NewsList from './components/news/NewsList.vue';
import NewsInfo from './components/news/NewsInfo.vue';
import PhotoList from './components/photos/PhotoList.vue';
import PhotoInfo from './components/photos/PhotoInfo.vue';
import GoodsList from './components/goods/GoodsList.vue';
import GoodsInfo from './components/goods/GoodsInfo.vue';
import GoodsDesc from './components/goods/GoodsDesc.vue';
import GoodsComment from './components/goods/GoodsComment.vue';


// 创建路由对象
var router = new VueRouter({
  routes: [ // 路由匹配规则
    { path: '', redirect: '/home'},
    { path: '/home', component: HomeContainer },
    { path: '/member', component: MemberContainer },
    { path: '/search', component: SearchContainer },
    { path: '/shopcar', component: ShopcarContainer },
    { path: '/home/newslist', component: NewsList },
    { path: '/home/newsinfo/:id', component: NewsInfo }, // :id 表示这是传进来的一个参数
    { path: '/home/photolist', component: PhotoList },
    { path: '/home/photoinfo/:id', component: PhotoInfo },
    { path: '/home/goodslist', component: GoodsList },
    { path: '/home/goodsinfo/:id', component: GoodsInfo, name: 'goodsinfo' },
    { path: '/home/goodsdesc/:id', component: GoodsDesc, name: 'goodsdesc' },
    { path: '/home/goodscomment/:id', component: GoodsComment, name: 'goodscomment' }
  ],
  linkActiveClass: 'mui-active' // 指定当前路由高亮的类样式，默认为 router-link-active
});

// 向外暴露路由对象
export default router;