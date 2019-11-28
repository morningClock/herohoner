const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  // type为mongoose的唯一id标识mongoose.SchemaTypes.ObjectId
  // ref为需要关联的model
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}
})

// 虚拟字段，用于populate查询才使用
// 从Category模型中，找出parent为当前id的子分类
schema.virtual('children', {
  // 当前字段
  localField: '_id',
  // 关联字段
  foreignField: 'parent',
  // 查出多个
  justOne: false,
  // 查出的关联模型
  ref: 'Category'
})

// 找出此分类的所有关联文章
// schema.virtual('newsList', {
//   // 当前字段
//   localField: '_id',
//   // 关联字段
//   foreignField: 'categories',
//   // 查出多个
//   justOne: false,
//   // 查出的关联模型
//   ref: 'Article'
// })

module.exports = mongoose.model('Category', schema)