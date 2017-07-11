// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import axios from 'axios';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';

import './common/stylus/index.styl';

// Vue.config.productionTip = false;

/* eslint-disable no-new */

Vue.use(VueRouter);
Vue.prototype.$ajax = axios;

// 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，

const routes = [
    { path: '/goods', component: goods },
    { path: '/ratings', component: ratings },
    { path: '/seller', component: seller }
];
// 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
    routes, // (缩写)相当于routes:routes
    linkActiveClass: 'active'
});
// 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
new Vue({
    el: '#app',
    router,
    render: h => h(App),
    data: {
        eventHub: new Vue()
    }
});
router.push('/goods'); // 页面一进来就加载