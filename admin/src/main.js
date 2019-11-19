import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

import 'element-ui/lib/theme-chalk/index.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import './assets/iconfont/iconfont.css'
import './assets/common.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueQuillEditor)

// 全局混入方法
Vue.mixin({
  methods:{
    getAuthHeader () {
      return {
        Authorization: localStorage.getItem('token') || ''
      }
    }
  }
})

// 引入axios
import http from './http'
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
