// 从 main.js 中抽离出来的路由模块

import VueRouter from 'vue-router';

// 导入各个组件
import HomeContainer from './components/tabbar/HomeContainer.vue';
import MemberContainer from './components/tabbar/MemberContainer.vue';
import SearchContainer from './components/tabbar/SearchContainer.vue';
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue';


// 创建路由对象
var router = new VueRouter({
  routes: [ // 路由匹配规则
    { path: '', redirect: '/home'},
    { path: '/home', component: HomeContainer },
    { path: '/member', component: MemberContainer },
    { path: '/search', component: SearchContainer },
    { path: '/shopcar', component: ShopcarContainer }
  ],
  linkActiveClass: 'mui-active' // 指定当前路由高亮的类样式，默认为 router-link-active
});

// 向外暴露路由对象
export default router;