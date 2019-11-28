<template>
  <div class="card bg-white p-4 border-y-1">
    <div class="header d-flex ai-center pb-3 border-b-1">
      <div class="iconfont" :class="icon"></div>
      <h3 class="flex-1 pl-1 fs-xl">{{title}}</h3>
      <div class="iconfont iconmore"></div>
    </div>
    <div class="nav pt-3 pb-2 jc-between">
      <div
        class="nav-item"
        :class="current===index?'active': ''"
        v-for="(item, index) of menu"
        :key="index">
        <div class="nav-link" @click="current=index">{{item}}</div>
      </div>
    </div>
    <div class="card-body">
      <!-- 插槽内容 -->
      <slot></slot>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    icon: {
      type: String,
      require: true,
      default: ''
    },
    title: {
      type: String,
      require: true,
      default: ''
    },
    menu: {
      type: Array,
      require: true,
      default () {
        return []
      }
    }
  },
  data() {
    return {
      current: 0
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/variable';
  .card{
    .card-header{
      border-color:map-get($colors, 'light-1')
    }
  }
</style>
