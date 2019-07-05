<template>
  <div class="my-swiper-wrapper">
    <div class="my-swiper-container">
      <swiper :options="swiperOption"
        v-if="bannerList.length > 0"
        :ref="swiperName">
        <!-- slides -->
        <swiper-slide v-for="(item ,index) in bannerList"
          :key="index">
          <a :href="`${sPath}${item.bannerLink}`">
            <div class="swiper-content">
              <img :src="`${path}${item.bannerPic}`"
                alt="">
              <div class="slide-title">
                <strong>{{item.bannerName}}</strong>
              </div>
            </div>
          </a>
        </swiper-slide>
        <!-- <swiper-slide>
          <div class="swiper-content">
            <img src="../assets/images/banner.png"
              alt="">
            <div class="slide-title">
              <strong>流浪剑</strong>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="swiper-content">
            <img src="../assets/images/banner.png"
              alt="">
            <div class="slide-title">
              <strong>流浪剑客</strong>
            </div>
          </div>
        </swiper-slide> -->
        <!-- Optional controls -->
      </swiper>
    </div>
    <div :class="[`swiper-pagination${swiperName}`,'swiper-pagination']"
      slot="pagination"></div>
    <div class="swiper-button-prev"
      slot="button-prev"
      @click="prev"></div>
    <div class="swiper-button-next"
      slot="button-next"
      @click="next"></div>
    <div class="swiper-scrollbar"
      slot="scrollbar"></div>
  </div>

</template>

<script>
import { path, sPath } from "@/http.js";
export default {
  name: "carrousel",
  props: {
    swiperName: {
      type: String,
      default: "index-header-swiper"
    },
    bannerList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      sPath,
      path: path,
      swiperOption: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...

        autoplay: true,
        loop: true
        // effect: "cube"
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs[this.swiperName]
        ? this.$refs[this.swiperName].swiper
        : null;
    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
  },
  methods: {
    next() {
      if (this.swiper == null) {
        this.swiper = this.$refs[this.swiperName].swiper;
      }
      this.swiper.slideNext();
      this.swiper.autoplay.stop();
    },
    prev() {
      if (this.swiper == null) {
        this.swiper = this.$refs[this.swiperName].swiper;
      }
      this.swiper.slidePrev();
      this.swiper.autoplay.stop();
    }
  }
};
</script>
<style lang="less" scoped>
.my-swiper-wrapper {
  position: relative;
  width: 100%;
  height: 580px;
  .my-swiper-container {
    margin: 0 auto;
    position: relative;
    width: 100% !important;
    height: 580px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .swiper-slider {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .swiper-content {
    position: relative;
    width: 100%;
    height: 580px;
  }
  .slide-title {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    color: #fff;
    font-size: 26px;
    background: rgba(0, 0, 0, 0.5);
    text-align: center;
    line-height: 100px;
  }
  .swiper-button-prev {
    left: 0;
    top: 4px;
    width: calc((100% - 1200px) / 2);
    height: 598px;
    opacity: 0.5;
  }
  .swiper-button-next {
    right: 0;
    top: 4px;
    width: calc((100% - 1200px) / 2);
    height: 598px;
  }
}
</style>
