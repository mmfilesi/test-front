import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/', redirect: { name: 'login' },
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/viewLogin.vue')
    },
    {
      path: '/userLogged',
      name: 'userLogged',
      component: () => import('./views/viewUserLogged.vue')
    }      
  ]
})
