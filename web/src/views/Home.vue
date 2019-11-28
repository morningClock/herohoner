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

    <!-- nav-icons start -->
    <div class="nav-home bg-white mt-3 py-1 border-y-1">
      <div class="nav-icons d-flex flex-wrap">
        <router-link tag="div" :to="item.to" class="nav-item my-2 pt-2 pb-1 border-r-1" v-for="(item,index) in navHomes" :key="index">
          <i :class="'sprite sprite-'+ item.icon"></i>
          <div class="pb-1">{{item.title}}</div>
        </router-link>
      </div>
      <div class="text-center fs-sm my-2">
        <i class="sprite sprite-upward"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- nav-icons end -->

    <!-- 新闻资讯 start -->
    <CardList
      class="mt-3"
      icon="iconnews_hot_light"
      title="新闻资讯"
      :cardCategories="newCats">
      <!-- slot插入分类列表内容 -->
      <!-- 获取命名插槽items中传入的category属性数据 -->
      <template #items="{category}">
        <div class="d-flex ai-center fs-lg pt-3" v-for="(news,index) of category.newList" :key="index">
          <div>{{news.categoryName}}</div>
          <div class="flex-1">{{news.title}}</div>
          <div class="fs-sm">{{news.date}}</div>
        </div>
      </template>
    </CardList>
    <!-- 新闻资讯 end -->
    <p>1111</p>
    <p>1111</p>
    <p>1111</p>
    <p>1111</p>
    <p>1111</p>
    <p>1111</p>
    <p>1111</p>
    <p>1111</p>
    <p>1111</p>
    <p>1111</p>
    <p>1111</p>
    <p>1111</p>
    <p>1111</p>
    <p>1111</p>
  </div>
</template>

<script>
import CardList from '../components/CardList'
export default {
  name: 'home',
  components: {
    CardList
  },
  data() {
    return {
      swiperOptions:{
        slidesPerView: 'auto',
        loop: true,
        pagination: {
          el: '.pagination-banner',
          clickable: true
        }
      },
      navHomes: [
        {
          icon: 'news',
          title: '爆料站',
          to: '/'
        }, {
          icon: 'story',
          title: '故事站',
          to: '/'
        }, {
          icon: 'store',
          title: '周边商城',
          to: '/'
        }, {
          icon: 'experience',
          title: '体验服',
          to: '/'
        }, {
          icon: 'novice',
          title: '新人专区',
          to: '/'
        }, {
          icon: 'inherit',
          title: '荣耀传承',
          to: '/'
        }, {
          icon: 'simu',
          title: '模拟战资料库',
          to: '/'
        }, {
          icon: 'camp',
          title: '王者营地',
          to: '/'
        }, {
          icon: 'official',
          title: '公众号',
          to: '/'
        }, {
          icon: 'edition',
          title: '版本介绍',
          to: '/'
        }, {
          icon: 'novice',
          title: '对战环境',
          to: '/'
        }, {
          icon: 'store',
          title: '无限王者团',
          to: '/'
        }
        
      ],
      newCats: [
        {
          name: '热门',
          newList: new Array(5).fill(5).map(item => ({
              categoryName: '公告',
              title: '11月26不停机更新服务公告',
              date: '11/06'
          }))
        }, {
          name: '新闻',
          newList: new Array(5).fill(5).map(item => ({
              categoryName: '公告',
              title: '11月26不停机更新服务公告',
              date: '11/06'
          }))
        }, {
          name: '公告',
          newList: new Array(5).fill(5).map(item => ({
              categoryName: '公告',
              title: '11月26不停机更新服务公告',
              date: '11/06'
          }))
        }, {
          name: '活动',
          newList: new Array(5).fill(5).map(item => ({
              categoryName: '公告',
              title: '11月26不停机更新服务公告',
              date: '11/06'
          }))
        }, {
          name: '赛事',
          newList: new Array(5).fill(5).map(item => ({
              categoryName: '公告',
              title: '11月26不停机更新服务公告',
              date: '11/06'
          }))
        }
      ]
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
  .nav-icons {
    .nav-item {
      width: 25%;
      text-align: center;
      &:nth-child(4n){
        border-right: none;
      }
      .sprite{
        height: 0;
        padding-bottom: 26.7%;
      }
    }
  }
</style>