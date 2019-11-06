const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  // type为mongoose的唯一id标识mongoose.SchemaTypes.ObjectId
  // ref为需要关联的model
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}
})

module.exports = mongoose.model('Category', schema)