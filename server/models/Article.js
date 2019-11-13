const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String },
  // type为mongoose的唯一id标识mongoose.SchemaTypes.ObjectId
  // ref为需要关联的model
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
  content: { type: String }
})

module.exports = mongoose.model('Article', schema)