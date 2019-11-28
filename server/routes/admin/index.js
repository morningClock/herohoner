const express = require('express')
const router = express.Router({
  mergeParams: true
})
// 登录校验
const jwt = require('jsonwebtoken')

// 自定义middleware
// 校验
const authMiddleware = require('../../middleware/auth')
// 分配model
const resourceMiddleware = require('../../middleware/resource')

// 公共配置
const keys = require('../../config/keys')

module.exports = app => {
  // 接口
  /** 
  * 获取列表
  * @GET  /admin/api/rest/:modelname
  * @param  {[modelame]}
  * @return {[items]} 
  */
  router.get('/', async(req, res) => {
    // 查找上级分类时才使用populate
    const queryOptions = {}
    if(req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    else if(req.Model.modelName === 'Article') {
      queryOptions.populate = 'categories'
    }
    // populate关联字段
    // populate指定的字段会继续找到指定的字段它的model对象
    const items = await req.Model.find().setOptions(queryOptions)
    return res.send(items)
  })

  /** 
  * 新建
  * @POST  /admin/api/rest/:modelname/
  * @param  {[type]}
  * @return {model}
  */
  router.post('/', async(req, res) => {
    const model = await req.Model.create(req.body)
    return res.send(model)
  })

   /** 
  * 编辑详情
  * @PUT  /admin/api/rest/:modelname/:id
  * @param  {[modelname,id]}
  * @return {[model]}
  */
  router.put('/:id', async(req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    return res.send(model)
  })

  /** 
  * 删除
  * @DELECT  /admin/api/rest/:modelname/:id
  * @param  {[modelname,id]}
  * @return {[model]}
  */
  router.delete('/:id', async(req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    return res.send({
      success: true
    })
  })

  /** 
  * 获取详情
  * @GET  /admin/api/rest/:modelname/:id
  * @param  {[modelname,id]}
  * @return {[model]}
  */
  router.get('/:id', async(req, res) => {
    const model = await req.Model.findById(req.params.id)
    return res.send(model)
  })

  /** 
  * 设置通用请求路由
  * 设置通用请求模型处理
  */
  // 根据resource请求不同接口
  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

  /** 
  * 上传图片处理
  * @POST  /admin/api/upload
  * @param  {[file]}
  * @return {[file_message]}
  */
  const multer  = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads/' })
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), (req,res,next) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    return res.send(file)
  })

  /** 
  * 登录接口
  * @POST  /admin/api/login
  * @param  {[username, password]}
  * @return {[token]}
  */
  app.post('/admin/api/login', async (req, res) => {
    const {username, password} = req.body;
    const AdminUser = require('../../models/AdminUser')
    // 取出默认不取出的password值
    const user = await AdminUser.findOne({username}).select('+password')
    // 1.根据用户查询是否存在用户
    if (!user) {
      return res.status(421).send({message:'用户不存在'})
    }
    // 2.校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    if (!isValid) {
      return res.status(422).send({message:'密码错误'})
    }
    // 3. 登录成功，返回token
    const rules = {
      id: user._id
    }
    const token = await jwt.sign(rules, keys.secret, { expiresIn: 60 * 60 })
    return res.status(200).send({token: token, 'name': user.username})
  })

}