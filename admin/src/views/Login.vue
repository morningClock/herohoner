<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="font-weight: 700">请先登录</span>
    </div>
    <el-form @submit.native.prevent="doLogin">
      <el-form-item label="用户名">
        <el-input type="text" v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">登录</el-button>
      </el-form-item>   
    </el-form>
  </el-card>
</template>
<script>
  export default{
    data () {
      return {
        model: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      async doLogin () {
        const res = await this.$http.post('/login', this.model)
        // 获取登录后的token验证
        localStorage.setItem("token", `Bearer ${res.data.token}`)
        localStorage.setItem("name", res.data.name)
        // 跳转到管理系统
        this.$message.success('登录成功')
        this.$router.push('/')
      }
    }
  }
</script>
<style scoped>
  .box-card{
    width: 25rem;
    margin: 10rem auto;
  }
</style>
