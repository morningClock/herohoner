import Vue from 'vue'
import axios from 'axios'
import router from './router'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 发送请求前，携带token
  // console.log('请求前')
  config.headers.Authorization = localStorage.getItem('token')
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log('请求后')
  return response;
}, function (error) {
  if(error.response.data.message){
    Vue.prototype.$message.error(error.response.data.message)
  }
  // 清空token
  localStorage.removeItem('token')
  router.push({path: '/login'})
  return Promise.reject(error);
});

export default http