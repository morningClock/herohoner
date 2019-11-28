import axios from 'axios'

// 创建axios实例
const http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})

// 输出实例
export default http;