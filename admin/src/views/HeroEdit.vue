<template>
  <div>
    <h1>{{id? '编辑': '新建'}}英雄</h1>
    <el-form label-width="50px" @submit.native="save">
      <el-tabs type="border-card" value="relation">
        <el-tab-pane label="英雄信息">
          <el-form-item>
            <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              :headers="getAuthHeader()"
              :action="$http.defaults.baseURL + '/upload'"
              :on-success="afterUpload"
              :before-upload="beforeUpload">
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="版图">
            <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              :headers="getAuthHeader()"
              :action="$http.defaults.baseURL + '/upload'"
              :on-success="(res) => $set(model, 'banner', res.url)"
              :before-upload="beforeUpload">
              <img v-if="model.banner" :src="model.banner" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="分类">
            <el-select v-model="model.categories" placeholder="英雄分类" multiple >
              <el-option
                v-for="item of categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
            style="margin-top: 0.7rem"
            v-model="model.scores.difficulty"
            :max="9"
            show-score></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate
            style="margin-top: 0.7rem"
            v-model="model.scores.skills"
            :max="9"
            show-score></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate
            style="margin-top: 0.7rem"
            v-model="model.scores.attack"
            :max="9"
            show-score></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
            style="margin-top: 0.7rem"
            v-model="model.scores.survive"
            :max="9"
            show-score></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" placeholder="顺风出装" multiple >
              <el-option
                v-for="item of items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" placeholder="逆风出装" multiple >
              <el-option
                v-for="item of items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团队思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="英雄技能">
          <el-button @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
          <el-row type="flex-wrap">
            <el-col :md="12" v-for="(item, index) of model.skills" :key="'skill'+index">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span style="font-weight: 700">技能{{index+1}}</span>
                  <el-button style="float: right; padding: 3px 0;color: #606266" type="text" @click="model.skills.splice(index,1)">删除技能</el-button>
                </div>
                <el-form-item label="图标">
                <!-- 重要 -->
                <el-upload
                  class="avatar-uploader"
                  :show-file-list="false"
                  :headers="getAuthHeader()"
                  :action="$http.defaults.baseURL + '/upload'"
                  :on-success="res => $set(item, 'icon', res.url)"
                  :before-upload="beforeUpload">
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                </el-form-item>
                <el-form-item label="名称">
                  <el-input type="text" v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item label="消耗">
                  <el-input type="text" v-model="item.consume"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input type="textarea" v-model="item.description"></el-input>
                </el-form-item>
                <el-form-item label="提示">
                  <el-input type="textarea" v-model="item.tips"></el-input>
                </el-form-item>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="英雄关系" name="relation">
          <el-button @click="model.partners.push({})"><i class="el-icon-plus"></i>增加英雄</el-button>
          <el-row>
            <el-col :md="12" v-for="(item, index) of model.partners" :key="'partner'+index">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>搭档</span>
                  <el-button style="float: right; padding: 3px 0;color: #606266" type="text" @click="model.partners.splice(index,1)">删除技能</el-button>
                </div>
                <div class="heroAvatar">
                  <img :src="heroesAvatar[index]">
                </div>
                <el-form-item label="英雄">
                  <el-select filterable v-model="item.hero" @change="getHeroAvatar($event, index)">
                    <el-option 
                      v-for="hero of heroes"
                      :key="hero._id"
                      :value="hero._id"
                      :label="hero.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="关系">
                  <el-select v-model="item.relationship">
                    <el-option
                      v-for="(item,index) of relationship"
                      :key="'relationshipType' + index"
                      :label="item.name"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input type="textarea" v-model="item.description"></el-input>
                </el-form-item>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button type="primary" native-type="submit" style="margin-top: 1rem;">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data () {
    return {
      // 查询列表使用数据
      categories: [],
      heroes: [],
      items: [],
      // 表单数据
      model: {
        name: '',
        avatar: '',
        scores:{
          difficulty: 0,
          skills: 0,
          attack: 0,
          survive: 0,
        },
        items1: [],
        items2: [],
        skills: [],
        partners: [],
      },
      relationship: [
        {name:'最佳搭档',value:'0'},
        {name:'被克制',value:'1'},
        {name:'克制',value:'2'},
      ],
      heroesAvatar: []
    }
  },
  methods: {
    async save () {
      if (this.id) {
        // 编辑
        await this.$http.put(`rest/heroes/${this.id}`, this.model)
      } else {
        // 新建
        await this.$http.post('rest/heroes', this.model)
      }
      this.$message({
        type: 'success',
        message: '保存成功'
      })
      this.$router.push('/heroes/list')
    },
    async fetchDetail () {
      // 获取详情
      const res = await this.$http.get(`rest/heroes/${this.id}`)
      // mixin混合属性
      this.model = Object.assign({}, this.model, res.data)
      console.log(this.model)
      // 编辑页面时获取搭档头像
      await this.fetchPartners()
    },
    async fetchCategories () {
      // 获取分类列表
      const res = await this.$http.get(`rest/categories`)
      this.categories = res.data
    },
    async fetchItems () {
      // 获取装备列表
      let res = await this.$http.get(`rest/items`)
      this.items = res.data
    },
    async fetchHeros () {
      // 获取英雄列表
      let res = await this.$http.get(`rest/heroes`)
      this.heroes = res.data
    },
    async fetchPartners () {
      // 初始化获取搭档头像
      for(let i = 0; i < this.model.partners.length; i++){
        const res = await this.$http.get(`rest/heroes/${this.model.partners[i].hero}`)
        this.heroesAvatar.push(res.data.avatar)
      }
    },
    async getHeroAvatar (heroId,index) {
      // 获取搭档英雄头像
      const res = await this.$http.get(`rest/heroes/${heroId}`)
      this.$set(this.heroesAvatar, index, res.data.avatar)
    },
    afterUpload (res) {
      // 添加响应式属性
      this.model.avatar = res.url
    },
    beforeUpload () {
      console.log('开始上传')
    }
  },
  created () {
    this.fetchCategories()
    this.fetchItems()
    this.fetchHeros()
    this.id && this.fetchDetail()
  }
}
</script>

<style scoped>
  .box-card {
    margin: 5px;
  }
  .heroAvatar{
    overflow: hidden;
    width: 90px;
    height: 90px;
    margin: 0 0 25px 60px;
    text-align: center;
    background-color: #eef1f6;
    border-radius: 15px;
  }
  .heroAvatar img{
    width: 100%;
    height: 100%;
  }
</style>