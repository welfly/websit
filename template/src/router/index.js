import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/home/indexpage' },
    {
      path: '/home',
      component: Index,
      children: [
        {
          path: 'indexpage',
          component: resolve => require(['@/components/IndexPage'], resolve)
        },
        {
          path: 'freepublish',
          component: resolve => require(['@/components/FreePublish'], resolve),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'registered',
          component: resolve => require(['@/components/Registered'], resolve)
        },
        {
          path: 'login',
          component: resolve => require(['@/components/Login'], resolve)
        },
        {
          path: 'help',
          component: resolve => require(['@/components/Help'], resolve)
        },
        {
          path: 'usercenter',
          component: resolve => require(['@/components/UserCenter'], resolve),
          meta: {
            requiresAuth: true
          }
        }
      ]
    }
  ]
})
