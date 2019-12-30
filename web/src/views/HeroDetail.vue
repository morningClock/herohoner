<template>
  <div>
    <div id="herodetail" v-if="hero.name" class="pb-4">
      <div class="header bg-black text-white d-flex ai-center px-4 py-2">
        <img src="../assets/logo.png" height="30">
        <div class="flex-1">
          <span class="pl-2">王者荣耀</span>
          <span class="pl-2">攻略站</span>
        </div>
        <a>更多英雄<i class="iconfont iconarrowback arrow-right"></i></a>
      </div>
      <div class="banner bg-gray">
        <img :src="hero.banner" alt="英雄特写">
        <div class="banner-desc-wrapper">
          <div class="banner-desc text-white p-3">
            <p>{{hero.title}}</p>
            <p class="fs-xl fw-bold">{{hero.name}}</p>
            <p>{{heroLocation}}</p>
            <div class="d-flex">
              <div class="flex-1 mt-1">
                <span>难度<span class="c-num mx-2 text- bg-brown">1</span></span>
                <span>技能<span class="c-num mx-2 text- bg-blue-3">2</span></span>
                <span>攻击<span class="c-num mx-2 text- bg-red-drak">3</span></span>
                <span>生存<span class="c-num mx-2 text- bg-drak-1">4</span></span>
              </div>
              <a class="fs-sm text-light-1">皮肤: 4</a>
            </div>
          </div>
        </div>
      </div>
      <div class="nav jc-around pt-2">
        <div class="nav-item pt-1 pb-1" v-for="(nav, index) of navTab" :key="nav+index">
          <div class="nav-link" :class="{active: activeNavTab === index}">{{nav}}</div>
        </div>
      </div>
      <div class="px-3 bg-white">
        <div class="content border-t-1">
          <div class="mt-2 d-flex ai-center jc-around">
            <span class="border-1 px-5 py-2 bg-light-2"><i class="iconfont iconnews_hot_light"></i>英雄介绍视频</span>
            <span class="border-1 px-5 py-2 bg-light-2"><i class="iconfont iconnews_hot_light"></i>一图识英雄</span>
          </div>
          <ul class="skill d-flex mt-3">
            <li 
              v-for="(item, index) of hero.skills"
              :key="item._id"
              class="p-3"
              :class="{active: activeSkill===index}"
              @click="activeSkill=index"
            >
              <img :src="item.icon" width="100%">
            </li>
          </ul>
          <div class="pb-3">
            <span class="d-iblock fs-xl fw-bold text-drak-1 pb-3">{{hero.skills[activeSkill].name}}</span>
            <span class="d-iblock text-gray ml-4">{{hero.skills[activeSkill].consume}}</span>
            <p class="pb-3 border-b-1 fs-lg text-drak-1">{{hero.skills[activeSkill].description}}</p>
            <p class="py-3 fs-lg text-gray">小提示: {{hero.skills[activeSkill].tips}}</p>
          </div>
        </div>
      </div>
      <div class="mt-3">
        <Card title="出装推荐" icon="iconnews_hot_light">
          <template>
            <div class="fs-lg text-gray-1">
              <div class="pb-3 border-b-1">
                <div class="pb-3">顺风出装</div>
                <div class="d-flex">
                  <div
                    v-for="(item, index) of hero.items1"
                    :key="'items1' + index">
                    <div class="border-circle mx-2">
                      <img :src="item.icon" width="100%" height="100%">
                    </div>
                    <p class="fs-xs text-center mt-1">{{item.name}}</p>
                  </div>
                </div>
                <div class="mt-3">
                  小提示：全防御出装，能够成为团队的前排，为队友争取到输出空间，红莲斗篷能帮助亚瑟快速清线，霸者重装让其恢复能力大幅上升
                </div>
              </div>
              <div class="pb-3">
                <div class="pt-3 pb-3">逆风出装</div>
                <div class="d-flex">
                  <div
                    v-for="(item, index) of hero.items2"
                    :key="'items2' + index">
                    <div class="border-circle mx-2">
                      <img :src="item.icon" width="100%" height="100%">
                    </div>
                    <p class="fs-xs text-center mt-1">{{item.name}}</p>  
                  </div>
                </div>
                <div class="mt-3">
                  小提示：全防御出装，能够成为团队的前排，为队友争取到输出空间，红莲斗篷能帮助亚瑟快速清线，霸者重装让其恢复能力大幅上升
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>
      <div class="mt-3">
        <Card title="使用技巧" icon="iconnews_hot_light">
          <template>
            <div class="fs-lg text-gray-1">
              {{hero.usageTips}}
            </div>
          </template>
        </Card>
      </div>
      <div class="mt-3">
        <Card title="对抗技巧" icon="iconnews_hot_light">
          <template>
            <div class="fs-lg text-gray-1">
              {{hero.battleTips}}
            </div>
          </template>
        </Card>
      </div>
      <div class="mt-3">
        <Card title="团队技巧" icon="iconnews_hot_light">
          <template>
            <div class="fs-lg text-gray-1">
              {{hero.teamTips}}
            </div>
          </template>
        </Card>
      </div>
      <div class="mt-3">
        <Card title="英雄关系" icon="iconnews_hot_light">
          <template>
            <div 
              class="fs-lg text-gray-1 border-b-1 py-1"
              v-for="(item, index) of heroRelation"
              :key="'relation' + index">
              <div class="pb-3">{{item.name}}</div>
              <div
                v-for="partner of item.partners"
                :key="partner._id"
                class="d-flex mb-3">
                <!-- <img :src="partner.hero.avatar"> -->
                <div class="partner-avatar flex-shrink">
                  <img :src="partner.hero.avatar">
                </div>
                <div class="flex-1 pl-3">{{partner.description}}</div>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
    <div v-else class="mt-5 py-5 text-center bg-white">
      <router-link class="fs-xl text-blue" to="/">英雄资料缺失，点击返回</router-link>
    </div>
  </div>
</template>

<script>
import Card from '../components/Card'
export default {
  name: 'HeroDetail',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    Card
  },
  data () {
    return {
      hero: {},
      heroLocation: '',
      navTab: ['英雄初识','英雄进阶'],
      activeNavTab: 0,
      activeSkill: 0,
      heroRelation: [
        // 0: 最佳搭档
        // 1: 被克制
        // 2: 克制
        {
          name: '最佳搭档',
          partners: []
        },
        {
          name: '被谁克制',
          partners: []
        },
        {
          name: '克制谁',
          partners: []
        }
      ]
    }
  },
  methods: {
    async fetchDetail () {
      let res = await this.$http.get(`heroes/${this.id}`)
      this.hero = res.data
      console.log(this.hero)
      // 整理英雄定位
      this.heroLocation = this.getHeroLocation()
      // 整理英雄关系
      this.getRelationIndex()
    },
    getHeroLocation() {
      let temp = []
      for(let item of this.hero.categories) {
        temp.push(item.name)
      }
      return temp.join('/')
    },
    getRelationIndex() {
      let heroPartners = this.hero.partners
      for(let partner of heroPartners) {
        this.heroRelation[partner.relationship].partners.push(partner)
      }
    }
  },
  created () {
    this.fetchDetail()
    console.log(this.id)
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/variable';
  .header{
    position: sticky;
    top: 0;
    z-index: 999;
    .arrow-right {
      display: inline-block;
      transform: rotate(180deg);
    }
  }
  .banner{
    overflow: hidden;
    position: relative;
    height: 0;
    padding-bottom: 51%;
    img {
      width: 100%;
      height: 14.6154rem;
      transform: scale(1.05)
    }
    .banner-desc-wrapper{
      z-index: 99;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      padding-top: 20%;
      background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
      .banner-desc{
        position: absolute;
        bottom: 0;
        width: 100%;
        .c-num{
          display: inline-block;
          width: 1rem;
          height: 1rem;
          line-height: 1rem;
          font-size: 0.7692rem;
          border-radius: 50%;
          text-align: center;
        }
      }
    }
  }
  .content{
    .skill {
      li img{
        border-radius: 50%;
        border: 0.2308rem solid #fff;
      }
      li.active img{
        border-color: map-get($colors, 'primary');
      }
    }
  }
  .partner-avatar {
    display: inline-block;
    width: 3.8462rem;
    height: 0;
    padding-bottom: 3.8462rem;
    background:map-get($colors, 'light-1');
    img {
      width: 100%;
      min-width: 100%;
      min-height: 3.8462rem;
    }
  }
</style>