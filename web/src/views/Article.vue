<template>
  <div class="article" v-if="model">
    <div class="d-flex ai-center border-b-1 px-2">
      <router-link to="/home">
        <span class="iconfont iconarrowback text-blue pr-2"></span>
      </router-link>
      <h1 class="d-iblock flex-1 fs-xl text-blue text-ellipsis pr-4">{{model.title}}</h1>
      <span class="fs-xs text-gray text-nowrap">{{model.updateAt | date}}</span>
    </div>
    <!-- 内容 -->
    <div class="content px-3" >
      <div v-if="model.content" v-html="model.content" class="text-drak fs-lg ql-editor article-detail border-b-1"></div>
      <p v-else class="text-gray fs-xl pb-3 border-b-1">文章不小心弄丢了~~</p>
      <!-- 相关资讯 -->
      <div class="pt-3 pb-5 px-2">
        <h3 class="py-2">相关资讯</h3>
        <router-link
          v-for="item of model.related"
          :to="`/articles/${item._id}`"
          :key="item._id"
          class="d-flex pt-2 text-nowrap fs-lg">
          <span class="flex-1 text-ellipsis mr-4">{{item.title}}</span>
          <span class="text-gray">{{item.updateAt | date}}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'Article',
  props: {
    id:{
      require: true
    }
  },
  filters: {
    date (val) {
      return dayjs(val).format('YYYY-MM-DD')
    }
  },
  data () {
    return {
      model: null
    }
  },
  watch: {
    // id() {
    //   this.fetch()
    // }
    // 简写成
    id: 'fetch'
  },
  methods: {
    async fetch () {
      let res = await this.$http.get(`/articles/${this.id}`)
      this.model = res.data
      console.log(res.data)
    }
  },
  created () {
    this.fetch()
  }
}
</script>

<style lang="scss">
  .article-detail {
    h1, h2 {
      padding: 0;
      margin: 0;
      line-height: 1.75;
      font-size: 1.3846rem;
      font-weight: 500;
    }
    p{
      line-height: 1.75;
    }
    img{
      width: 100%;
      height: auto;
    }
    iframe{
      width: 100%;
      height: auto;
      min-height: 18.4615rem;
    }
  }
</style>