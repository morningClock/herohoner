/*
* @Author: Administrator
* @Date:   2019-10-28 22:10:08
* @Last Modified by:   Administrator
* @Last Modified time: 2019-10-28 22:11:15
*/
const express = require('express')

const app = express()

// 解决跨域问题
app.use(require('cors')())
// 使用异步json回调
app.use(express.json())

// 引入admin接口,传入express对象
require('./routes/admin')(app)

// 引入db
require('./plugins/db')(app)

app.listen(3000, () => {
  console.log('http://localhost:3000')
})