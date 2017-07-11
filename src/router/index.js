import Vue from 'vue';
import VueRouter from 'vue-router';
// import App from '@/components/App';
import App from '@/App';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [{
        path: '/',
        name: 'App',
        component: App
    }]
});