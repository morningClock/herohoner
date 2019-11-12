const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String },
  title: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref:'Category' }],
  // 复合类型
  scores: {
    difficulty: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number }
  },
  skills: [{
    icon: { type: String },
    name: { type: String },
    description: { type: String },
    tips: { type: String }
  }],
  // 顺风
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref:'Item' }],
  // 逆风
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