<template>
  <div>
    <h1>{{id? '编辑': '新建'}}管理员</h1>
    <el-form label-width="120px" @submit.native="save">
      <el-form-item label="账号">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password"></el-input>
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
      model: {},
    }
  },
  methods: {
    async save () {
      if (this.id) {
        // 编辑
        await this.$http.put(`rest/admin_users/${this.id}`, this.model)
      } else {
        // 新建
        await this.$http.post('rest/admin_users', this.model)
      }
      this.$message({
        type: 'success',
        message: '保存成功'
      })
      this.$router.push('/admin_users/list')
    },
    async fetchDetail () {
      // 获取详情
      const res = await this.$http.get(`rest/admin_users/${this.id}`)
      this.model = res.data
    }
  },
  created () {
    this.id && this.fetchDetail()
  }
}
</script>
