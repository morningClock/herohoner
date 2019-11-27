<template>
  <div class="home">
    <!-- banner start -->
    <div class="banner">
      <swiper :options="swiperOptions">
        <swiper-slide>
          <img src="../assets/images/banner/1.jpeg" width="100%" height="165px">
        </swiper-slide>
        <swiper-slide>
          <img src="../assets/images/banner/2.jpeg" width="100%" height="165px">
        </swiper-slide>
        <swiper-slide>
          <img src="../assets/images/banner/3.jpeg" width="100%" height="165px">
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination pagination-banner pr-3 pb-2" slot="pagination"></div>
      </swiper>
    </div>
    <!-- banner end -->
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      swiperOptions:{
        slidesPerView: 'auto',
        pagination: {
          el: '.pagination-banner',
          clickable: true
        }
      }
    }
  },
}
</script>

<style lang="scss">
@import '../assets/sass/variable';
  .banner {
    height: 0;
    padding-bottom: 44%;
    background: map-get($colors, 'gray');
    .pagination-banner {
      text-align: right;
      .swiper-pagination-bullet {
        opacity: 1;
        border-radius: 25%;
        background: map-get($colors, 'white');
        &.swiper-pagination-bullet-active{
          background: map-get($colors, 'blue-1');
        }
      }
    }
  }
</style>