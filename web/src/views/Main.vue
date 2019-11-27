<template>
  <div id="app">
    <!-- 头部 -->
    <div id="header" class="d-flex bg-black py-2 px-3 ai-center">
      <img src="../assets/logo.png" height="30">
      <div class="pl-2 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-gray-1 fs-xxs">团队成就更多</div>
      </div>
      <button type="button" class="btn bg-primary fs-xxs">
        立即下载
      </button>
    </div>
    <!-- 导航 -->
    <div class="nav d-flex jc-around pt-3 pb-2 bg-primary fs-md">
      <div class="nav-item active">
        <router-link to="/home" tag="div" class="nav-link text-white">首页</router-link>
      </div>
      <div class="nav-item">
        <router-link to="/about" tag="div" class="nav-link text-white">攻略中心</router-link>
      </div>
      <div class="nav-item">
        <router-link to="/home" tag="div" class="nav-link text-white">客服中心</router-link>
      </div>
    </div>
    <!-- 内容 -->
    <router-view/>
  </div>
</template>

<style>

</style>