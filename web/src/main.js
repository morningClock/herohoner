import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import './assets/sass/style.scss'
import 'swiper/dist/css/swiper.css'
import './assets/iconfont/iconfont.css'

import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper, /* { default global options } */)

// axios实例
import http from './http/http'
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
