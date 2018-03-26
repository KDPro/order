// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
Vue.use(Router);
import Vuex from 'vuex'
Vue.use(Vuex)

// 引入UI组件
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);
Object.defineProperty(Vue.prototype, '$mint', { value: Mint });
import '@/assets/font/iconfont.css'



// 引入axios
import Axios from 'axios';
var axiosConfig = Axios.create({
  // baseURL: 'http://192.168.20.112:8080/', //田涛银
  // baseURL: 'http://192.168.20.8:8080/',    //林晨旭
  baseURL: 'http://192.168.20.136:8080/', //服务器
  // baseURL: 'http://192.168.20.128:8080/', //本地
  timeout: 3000, //所有请求30s后过期
  withCredentials: true, //跨域凭证
});
Object.defineProperty(Vue.prototype,'$axios',{value:axiosConfig});

// 封装方法axios的get以及post
import  Server from './server/server'
Object.defineProperty(Vue.prototype,'$g',{value:Server.g});
Object.defineProperty(Vue.prototype,'$p',{value:Server.p});

// 引入store配置文件
import stores from './vuex'
//创建一个store对象
const store = new Vuex.Store(stores);


// 引入路由配置文件
import routes from './router'
// 创建一个路由对象
const router = new Router({
  routes:routes
});

//引入组件
import Header from '@/components/header/header'
Vue.component("or-header",Header);

// 引入公用方法 common.js
import common from './util/common.js'
Object.defineProperty(Vue.prototype,'$common',{value:common});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
