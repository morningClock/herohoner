const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String },
  // type为mongoose的唯一id标识mongoose.SchemaTypes.ObjectId
  // ref为需要关联的model
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
  content: { type: String }
}, {
  // 自动携带时间戳 create 和 update时间
  timestamps: true
})

module.exports = mongoose.model('Article', schema)