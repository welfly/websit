// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import less from 'less'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/reset.css'
import 'bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import Api from '../api/index'
import 'babel-polyfill'

Vue.prototype.$api = Api

Vue.use(ElementUI)
Vue.use(less)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.path === '/home/login') {
    next()
  } else { // 进入的不是登录路由
    if (to.meta.requiresAuth && sessionStorage.getItem('isLogin') !== '0') {
      next({ path: '/home/login' })
    } else {
      next()
    } // 下一跳路由需要登录验证，并且还未登录，则路由定向到  登录路由
  } // 如果不需要登录验证，或者已经登录成功，则直接放行
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
