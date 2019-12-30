<template>
  <div>
    <div class="card bg-white border-y-1 p-3">
      <div class="header d-flex ai-center pb-2">
        <div class="iconfont fw-bold" :class="icon"></div>
        <h3 class="flex-1 pl-1 fs-xl fw-bold">{{title}}</h3>
      </div>
      <div class="card-body pt-1">
        <!-- 插槽内容 -->
        <slot></slot>
      </div>
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
