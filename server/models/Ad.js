const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  // type为mongoose的唯一id标识mongoose.SchemaTypes.ObjectId
  // ref为需要关联的model
  items: [{
    title: { type: String },
    image: { type: String },
    link: { type: String }
  }]
})

module.exports = mongoose.model('Ad', schema)