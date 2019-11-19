module.exports = app => {
  const mongoose = require('mongoose')
  const keys = require('../config/keys')
  mongoose.connect(keys.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
}