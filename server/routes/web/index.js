const express = require('express')
const router = express.Router({
  // 合并接口到一个整合的接口文件中
  mergeParams: true
})

module.exports = app => {
  // 获取数据库中的相关模型
  const Category = require('../../models/Category')
  const Article = require('../../models/Article')
  const Hero = require('../../models/Hero')
  /**
   * GET /news/init
   * [导入初始化新闻相关数据]
   * @return 
   */
  router.get('/news/init', async (req, res) => {
    // 1.获得要插入的所有文章内容
    // .lean() 将mongoose DOM转换为JS DOM，使得返回的对象 属性可以修改
    // 找出parent为新闻分类的子分类
    const parent = await Category.find({
      name: '新闻分类'
    })
    const cats = await Category.find().where({
      parent: parent
    }).lean()
    const newTitle = require('../../config/mock').newTitle
    const newsList = newTitle.map(title => {
      // 随机正负打乱
      const randomCats = cats.slice(0).sort(() => Math.random() - 0.5)
      return {
        categories: randomCats.slice(0, 2),
        title: title,
      }
    })
    // 2.将文章内容插入数据库
    // 清空所有文章
    await Article.deleteMany({})
    await Article.insertMany(newsList)
    res.send(newsList)
  })

  /**
   * GET /news/list
   * 获取所有新闻文章内容
   */
  router.get('/news/list', async (req,res) => {
    // 1.找出当前分类（热门、新闻、公告等之一）的分类
    // 2.查询出关联的文章
    
    // 找出新闻分类下的子分类
    // 方法1： 关联查询
    // lean()进行关联查询
    // const cats = await Category.findOne({
    //   name: '新闻分类'
    // }).populate({
    //   path: 'children',
    //   populate: {
    //     path: 'newsList'
    //   }
    // }).lean()
    // res.send(cats)

    // 方法2：聚合查询
    // 理解为所有查询结果聚合在一起
    const parent = await Category.findOne({
      name: '新闻分类'
    })
    const cats = await Category.aggregate([
      {$match: {parent: parent._id}},
      // 查询另外一个模型Article的Schema
      { 
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'newsList'
        }
      },
      // 限制查询出来的条数
      {
        $addFields: {
          // 裁切返回5条数据
          newsList: {$slice:['$newsList', 5]}
        }
      }
    ])
    // 获取每个分类名称，用于catrgoryName的设置
    subCatsIDs = cats.map(category => category._id)
    // 增加热门分类
    // 此处必需用lean()，否则无法使用jsDOM方法来修改获得对象cats
    cats.unshift({
      name: '热门',
      newsList: await Article.find().where({
        // 查询分类为subcats下的分类的文章
        categories: {$in: subCatsIDs}
      }).populate('categories').limit(5).lean()
    })
    
    // 增加categoryName字段
    cats.map(cat => {
      cat.newsList.map(async news => {
        if(cat.name === '热门') {
          news.categoryName = news.categories[0].name;
        } else {
          news.categoryName = cat.name
        }
      })
    })

    // 3.整理返回前端
    res.send(cats)
  })

  /**
   * GET /news/init
   * [导入初始化英雄相关数据]
   * @return 
   */
  router.get('/heroes/init', async (req, res) => {
    const parent = await Category.findOne({
      name: '英雄分类'
    })
    
    // 1.清空英雄分类子分类
    await Category.deleteMany().where({parent:parent})
    // 2.插入mock数据
    heroesData = await require('../../config/mock').heroes
    // 整理
    heroesData.map(async (cat) => {
      // 3.根据mock新建分类
      const category = await Category.findOne({name: cat.categoryName, parent:parent})
      // 如果不存在分类，插入新分类
      if (!category) {
        await Category.insertMany({
          name: cat.categoryName,
          parent: parent._id
        })
      }
      const cats = await Category.find({
        parent: parent
      })
      // 4.英雄数据处理
      // 插入英雄数据
      await Hero.deleteMany({})
      // 此处坑了很久
      // 注意async不使用时，增加了的话会导致数据格式错误。
      // 返回对象中导致增加了 Promise{}
      let heroList = cat.heroes.map(catHeroes => {
        const randomCats = cats.slice(0).sort(()=>(Math.random()-0.5))
        // 增加每个英雄所属分类（随机）
        catHeroes.categories = randomCats.slice(0, 2)
        return catHeroes
      })
      
      await Hero.insertMany(heroList)
    })
    res.send(heroesData)
    
  })

    /**
   * GET /news/list
   * 获取所有新闻文章内容
   */
  router.get('/heroes/list', async (req, res) => {
    // 返回数据格式
    // const heroCats = [
    //   {
    //     name: '坦克',
    //     heroList: [
    //       {
    //         name: '廉颇',
    //         avatar: ''
    //       }
    //     ]
    //   }
    // ]
    
    // 1.找到英雄分类下所有的子分类
    const parent = await Category.findOne({name: '英雄分类'})
    let cats = await Category.aggregate([
      // 找出英雄分类所有子分类
      {$match: {parent: parent._id}},
      // 连接数组，查询子分类所有英雄
      {
        $lookup: {
          // 查询的document
          from: 'heroes',
          localField: '_id',
          // 找出字段
          foreignField: 'categories',
          // 查询结果放入heroList，并连接到每个分类
          as: 'heroList'
        }
      },
      {
        $addFields: {
          'heroList': {$slice:['$heroList', 20]}
        }
      }
    ])
    // 2.增加热门选项
    const hotList = await Hero.find().populate('categories').limit(10)
    cats.unshift({
      name: '热门',
      heroList: hotList
    })
    // 4.按照格式返回到前端
    res.send(cats)
  })
  // 导出接口
  app.use('/web/api',router)
}