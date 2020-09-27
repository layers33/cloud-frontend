import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../Login')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../Home')
    }
  ]
})
