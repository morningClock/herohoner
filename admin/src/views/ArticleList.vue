<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <el-table-column label="所属分类">
        <!-- 自定义内容 -->
        <template slot-scope="scope">
          <el-tag
            v-for="(item, index) of scope.row.categories"
            :key="'categories'+index"
            type="info"
            effect="dark"
            style="margin-right: 5px;">
            {{item.name}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="文章标题"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push(`/articles/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: []
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('rest/articles')
      this.items = res.data
    },
    async remove (row) {
      this.$confirm(`是否确定删除分类${row.name}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`rest/articles/${row._id}`)
        this.fetch();
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      })
    }
  },
  created () {
    this.fetch()
  }
}
</script>
