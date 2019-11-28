<template>
  <div id="main">
    <el-container style="height: 100vh; border: 1px solid #eee;">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router :default-active="$route.path" unique-opened>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>内容管理</template>
            <el-menu-item-group >
              <template slot="title">分类</template>
              <el-menu-item index="/categories/list">分类列表</el-menu-item>
              <el-menu-item index="/categories/create">新建分类</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group >
              <template slot="title">物品</template>
              <el-menu-item index="/items/list">物品列表</el-menu-item>
              <el-menu-item index="/items/create">新建物品</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group >
              <template slot="title">英雄</template>
              <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
              <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group >
              <template slot="title">文章</template>
              <el-menu-item index="/articles/list">文章列表</el-menu-item>
              <el-menu-item index="/articles/create">新建文章</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-message"></i>运营设置</template>
            <el-menu-item-group >
              <template slot="title">分类</template>
              <el-menu-item index="/categories/list">分类列表</el-menu-item>
              <el-menu-item index="/categories/create">新建分类</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group >
              <template slot="title">文章</template>
              <el-menu-item index="/articles/list">文章列表</el-menu-item>
              <el-menu-item index="/articles/create">新建文章</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group >
              <template slot="title">广告</template>
              <el-menu-item index="/ads/list">广告列表</el-menu-item>
              <el-menu-item index="/ads/create">新建广告</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-message"></i>系统设置</template>
            <el-menu-item-group >
              <template slot="title">管理员</template>
              <el-menu-item index="/admin_users/list">账号列表</el-menu-item>
              <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <template slot-scope="">
                  <span @click="logout">退出</span>
                </template>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{name}}</span>
        </el-header>
        <el-main>
          <router-view :key="$router.path"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: localStorage.getItem('name')
    }
  },
  methods: {
    logout () {
      // 清空登录数据
      console.log("logout")
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      this.$router.push('login')
    }
  }
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.el-aside::-webkit-scrollbar {
    display: none;
}
</style>
