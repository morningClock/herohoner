// 命名转换
const inflection = require( 'inflection' )

module.exports = (options)=>{
  return (req,res,next) => {
    // 挂载在req对象上
    const modelName = require('inflection').classify(req.params.resource);
    req.Model = require(`../models/${modelName}`)
    next()
  }
}