import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import Home from './views/Home.vue'
import NotFound from './views/404.vue'
import Login from './views/Login.vue'

import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'

import ItemEdit from './views/ItemEdit.vue'
import ItemList from './views/ItemList.vue'

import HeroEdit from './views/HeroEdit.vue'
import HeroList from './views/HeroList.vue'

import ArticleEdit from './views/ArticleEdit.vue'
import ArticleList from './views/ArticleList.vue'

import AdEdit from './views/AdEdit.vue'
import AdList from './views/AdList.vue'

import AdminUserEdit from './views/AdminUserEdit.vue'
import AdminUserList from './views/AdminUserList.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      component: Login,
      meta: { isPublic: true }
    },
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        { path: '/', component: Home },
        { path: '/categories/create', component: CategoryEdit },
        // 注入url参数进入该组件
        { path: '/categories/edit/:id', component: CategoryEdit, props: true },
        { path: '/categories/list', component: CategoryList },

        { path: '/items/create', component: ItemEdit },
        { path: '/items/edit/:id', component: ItemEdit, props: true },
        { path: '/items/list', component: ItemList },

        { path: '/heroes/create', component: HeroEdit },
        { path: '/heroes/edit/:id', component: HeroEdit, props: true },
        { path: '/heroes/list', component: HeroList },

        { path: '/articles/create', component: ArticleEdit },
        { path: '/articles/edit/:id', component: ArticleEdit, props: true },
        { path: '/articles/list', component: ArticleList },

        { path: '/ads/create', component: AdEdit },
        { path: '/ads/edit/:id', component: AdEdit, props: true },
        { path: '/ads/list', component: AdList },

        { path: '/admin_users/create', component: AdminUserEdit },
        { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
        { path: '/admin_users/list', component: AdminUserList },
      ]
    },
    {
      path: '*',
      component: NotFound
    }
    
  ]
})

router.beforeEach((to, from, next) => {
  // to.meta.isPublic表示是否能公开访问
  // 没有token时，限制访问非公开页面
  // 记得执行完后return，不然下面的语句照样执行
  if (!to.meta.isPublic && !localStorage.getItem('token')) {
    Vue.prototype.$message.error('请先登录')
    return next('/login')
  }
  // 如果已经登陆，禁止访问登录页
  if (to.path == '/login' && localStorage.getItem('token')) {
    Vue.prototype.$message.success('登录成功')
    return next(from.path)
  }
  return next()
})

export default router