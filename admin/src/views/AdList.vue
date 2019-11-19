<template>
  <div>
    <h1>广告列表</h1>
    <el-table :data="ads">
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <el-table-column prop="name" label="广告位名称" width="150"></el-table-column>
      <el-table-column prop="items" label="广告位图标">
        <template slot-scope="scope">
          <div v-if="scope.row.items[0]">
            <img :src="scope.row.items[0].image ? scope.row.items[0].image: '' " style="height: 4rem; ">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push(`/ads/edit/${scope.row._id}`)">编辑</el-button>
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
      ads: []
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get('rest/ads')
      this.ads = res.data
      console.log(this.ads)
    },
    async remove (row) {
      this.$confirm(`是否确定删除物品${row.name}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`rest/ads/${row._id}`)
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
