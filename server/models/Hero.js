const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  // 名称
  name: { type: String },
  // 头像
  avatar: { type: String },
  // 称号
  title: { type: String },
  // 英雄分类
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref:'Category' }],
  // -----复合类型-----
  // 评分：操作难度.技能伤害.攻击力分数.生存能力.
  scores: {
    difficulty: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number }
  },
  // 技能：每个技能的图标，名字，相关描述与应用技巧
  skills: [{
    icon: { type: String },
    name: { type: String },
    description: { type: String },
    tips: { type: String }
  }],
  // 顺风出装
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref:'Item' }],
  // 逆风出装
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref:'Item' }],
  usageTips: { type: String },
  battleTips: { type: String },
  teamTips: { type: String },

  // 搭档
  partners: [{
    hero: { type: mongoose.SchemaTypes.ObjectId, ref:'Hero' },
    description: { type: String }
  }]
})

module.exports = mongoose.model('Hero', schema)