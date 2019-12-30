<template>
  <div class="card bg-white border-y-1" :class="[paddingClass]">
    <div v-if="title" class="header d-flex ai-center pb-3 border-b-1">
      <div class="iconfont" :class="icon"></div>
      <h3 class="flex-1 pl-1 fs-xl">{{title}}</h3>
      <div class="iconfont iconmore"></div>
    </div>
    <slot name="banner"></slot>
    <div class="nav pt-3 pb-2" :class="[tabAlignClass]">
      <div
        class="nav-item"
        v-for="(item, index) of cardCategories"
        :key="index">
        <div
          class="nav-link" 
          :class="currentCard===index?'active': ''"
          @click="$refs.cardSwiper.swiper.slideTo(index)">
          {{item.name}}
        </div>
      </div>
    </div>
    <div class="card-body">
      <!-- 插槽内容 -->
      <swiper ref="cardSwiper" :options="swiperOptions" @slideChange="() => {currentCard = $refs.cardSwiper.swiper.activeIndex}">
        <!-- 创建n个分类卡片 -->
        <swiper-slide v-for="(category, index) in cardCategories" :key="index">
          <!-- 命名插槽 -->
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardList',
  props: {
    icon: {
      type: String,
      require: true,
      default: ''
    },
    paddingClass: {
      type: String,
      default: 'p-4'
    },
    tabAlignClass: {
      type: String,
      default: 'jc-between'
    },
    title: {
      type: String,
      require: true,
      default: ''
    },
    cardCategories: {
      type: Array,
      require: true,
      default () {
        return []
      }
    }
  },
  data() {
    return {
      currentCard: 0,
      swiperOptions: {
        autoHeight: true,
        observer:true,
        observeParents:true
      }
    }
  }
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
