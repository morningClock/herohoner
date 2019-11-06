<template>
  <div>
    <h1>{{id? '编辑': '新建'}}分类</h1>
    <el-form label-width="120px" @submit.native="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent" clearable placeholder="上级分类">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
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
      parents: []
    }
  },
  methods: {
    async save () {
      if (this.id) {
        // 编辑
        await this.$http.put(`rest/categories/${this.id}`, this.model)
      } else {
        // 新建
        await this.$http.post('rest/categories', this.model)
      }
      this.$router.push('/categories/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetchDetail () {
      // 获取详情
      const res = await this.$http.get(`rest/categories/${this.id}`)
      this.model = res.data
    },
    async fetchParents () {
      const res = await this.$http.get(`rest/categories`)
      this.parents = res.data
    }
  },
  created () {
    this.fetchParents()
    this.id && this.fetchDetail()
  }
}
</script>
