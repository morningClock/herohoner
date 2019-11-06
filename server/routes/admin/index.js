module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  })
  const inflection = require( 'inflection' )
  // 接口
  /**
   * 新建分类
   */
  router.post('/', async(req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

   /**
   * 编辑分类
   */
  router.put('/:id', async(req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  /**
   * 删除分类
   */
  router.delete('/:id', async(req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  /**
   * 获取分类列表
   */
  router.get('/', async(req, res) => {
    const queryOptions = {}
    if(req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    // populate关联字段
    // populate指定的字段会继续找到指定的字段它的model对象
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })

  /**
  * 获取分类详情
  */
  router.get('/:id', async(req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  // 输出
  // 根据resource请求不同接口
  app.use('/admin/api/rest/:resource',(req,res,next) => {
    // 挂载在req对象上
    const modelName = require('inflection').classify(req.params.resource);
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)
}