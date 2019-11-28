const express = require('express')
const router = express.Router({
  // 合并接口到一个整合的接口文件中
  mergeParams: true
})

module.exports = app => {
  // 获取数据库中的相关模型
  const Category = require('../../models/Category')
  const Article = require('../../models/Article')
  /**
   * GET /news/init
   * [初始化数据库新闻相关数据]
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
    const newTitle = ["以数字之美探索文化 TGC腾讯数字文创节海南站即将开幕", "KPL限定皮肤爆料丨天狼星创始人，幕后老板即将登场", "腾讯游戏品牌全新升级：Spark More去发现，无限可能", "圣斗士联动！信物熔铸赢【圣斗士系列皮肤】", "张靓颖西施英雄主打歌翻唱大赛，参与活动打榜赢靓颖签名照！", "11月28日全服不停机更新公告", "11月28日体验服停机更新公告", "11月26日全服不停机更新公告", "11月22日体验服停机更新公告", "11月20日体验服不停机更新公告", "感恩节快乐 新英雄鲁班大师登场", "KPL限定皮肤天狼征服者全服6折特权开启！", "KPL限定天狼星计划系列皮肤——天狼征服者预定开启！", "感恩节活动周来袭 KPL限定皮肤天狼征服者预定即将开启", "张良-黄金白羊座登场 参与活动抽永久英雄", "王者荣耀城市赛：电竞赛事的另一种打开方式", "高校区域联赛校间积分赛第二场落幕，本周末六大赛区将再燃战火", "11月29日KPL秋季赛总决赛售票开启 购票福利惊喜大曝光", "王者高校赛区域联赛第二站，各地精彩不断！", "本周高校海选赛即将来临，你准备好了吗？"]
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
   * GET /news/lisr
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


  // 导出接口
  app.use('/web/api',router)
}