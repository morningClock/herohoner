module.exports = app => {
  const mongoose = require('mongoose')
  const keys = require('../config/keys')
  mongoose.connect(keys.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })

  // 解决相互引用时，找不到模型的问题
  // const libs = require('require-all')(__dirname+ '/../models')
}