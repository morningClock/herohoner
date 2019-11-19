const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: { type: String },
  name: { type: String },
  password: { 
    type: String,
    // 不返回该字段查询结果
    select: false,
    set(val){
      // set 自定义数据处理，此处用bcrypt进行密码散列加密
      // 每次散列加密的效果不一样
      // 参数1:加密字符串,参数2:加密等级(次数)
      return require('bcrypt').hashSync(val, 10)
    }
  }
})

module.exports = mongoose.model('AdminUser', schema)