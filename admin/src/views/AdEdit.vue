<template>
  <div>
    <h1>{{id? '编辑': '新建'}}广告位</h1>
    <el-form label-width="120px" @submit.native="save">
      <el-form-item label="广告位名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告位图片">
        <el-button
          type="primary"
          plain
          @click="model.items.push({})">
          添加图片
        </el-button>
        <div v-for="(ad, index) of model.items" :key="'ad'+ index">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span style="font-weight: 700">图片{{index+1}}</span>
              <el-button
                style="float: right;"
                type="text"
                icon="el-icon-delete"
                @click="model.items.splice(index,1)">
                删除
              </el-button>
            </div>
            <el-form-item label="标题">
              <el-input v-model="ad.title"></el-input>
            </el-form-item>
            <el-form-item label="链接">
              <el-input v-model="ad.link"></el-input>
            </el-form-item>
            <el-form-item label="图片">
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                :headers="getAuthHeader()"
                :action="$http.defaults.baseURL + '/upload'"
                :on-success="(res) => $set(ad, 'image', res.url)"
                :before-upload="beforeUpload">
                <img v-if="ad.image" :src="ad.image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-card>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
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
      model: {
        items:[]
      }
    }
  },
  methods: {
    async save () {
      if (this.id) {
        // 编辑
        await this.$http.put(`rest/ads/${this.id}`, this.model)
      } else {
        // 新建
        await this.$http.post('rest/ads', this.model)
      }
      this.$message({
        type: 'success',
        message: '保存成功'
      })
      this.$router.push('/ads/list')
    },
    async fetchDetail () {
      // 获取详情
      const res = await this.$http.get(`rest/ads/${this.id}`)
      this.model = res.data
    },
    beforeUpload () {
      console.log('开始上传')
    }
  },
  created () {
    this.id && this.fetchDetail()
  }
}
</script>

<style scoped>
  .box-card{
    margin-top: 2rem;
  }
  .box-card .el-form-item{
    margin-bottom: 2rem;
  }
</style>