import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass: '',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        {path:'home', component: Home},
        {path:'about', component: () => import(/* webpackChunkName: "about" */ './views/About.vue')},
      ]
    }
  ]
})
