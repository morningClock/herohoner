<template>
  <div class="banner" v-if="images.length">
    <swiper :options="swiperOptions">
      <swiper-slide v-for="(item, index) of images" :key="index">
        <img :src="item.url" alt="">
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-scrollbar"   slot="scrollbar"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  props: {
    images: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      swiperOptions: {
        
      }
    }
  },
}
</script>
