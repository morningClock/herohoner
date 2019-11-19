<template>
  <div>
    <h1>{{id? '编辑': '新建'}}物品</h1>
    <el-form label-width="120px" @submit.native="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :headers="getAuthHeader()"
          :action="$http.defaults.baseURL + '/upload'"
          :on-success="afterUpload"
          :before-upload="beforeUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
      model: {}
    }
  },
  methods: {
    async save () {
      if (this.id) {
        // 编辑
        await this.$http.put(`rest/items/${this.id}`, this.model)
      } else {
        // 新建
        await this.$http.post('rest/items', this.model)
      }
      this.$message({
        type: 'success',
        message: '保存成功'
      })
      this.$router.push('/items/list')
    },
    async fetchDetail () {
      // 获取详情
      const res = await this.$http.get(`rest/items/${this.id}`)
      this.model = res.data
    },
    afterUpload (res) {
      // 添加响应式属性
      this.$set(this.model, 'icon', res.url)
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