<template>
  <div class="other-swiper-wrapper">
    <div class="swiper-container">
      <swiper v-if="bannerList.length > 1"
        :options="swiperOption"
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
  </div>

</template>

<script>
import { sPath, path } from "@/http.js";
export default {
  name: "carrousel",
  props: {
    swiperName: {
      type: String,
      default: "other-swiper"
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
        loop: true,
        autoplay: true,
        // effect: "cube",
        pagination: {
          el: `.swiper-pagination${this.swiperName}`,
          clickable: true
        }
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
    let that = this;
    this.interVal = setInterval(function() {
      if (that.swiper) {
        that.changeSlide();
        clearInterval(that.interVal);
      }
    }, 3000);
  },
  methods: {
    changeSlide() {
      for (let i = 0; i < this.swiper.pagination.bullets.length; i++) {
        this.swiper.pagination.bullets[i].onmouseover = function() {
          this.click();
        };
      }
    }
  }
};
</script>
<style lang="less">
.other-swiper-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  .swiper-container {
    margin: 0 auto;
    position: relative;
    width: 100% !important;
    height: 100% !important;
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
    height: 100%;
  }
  .slide-title {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 76px;
    color: #fff;
    font-size: 26px;
    background: rgba(0, 0, 0, 0.3);
    text-align: center;
    line-height: 100px;
    &::before {
      content: "";
      position: absolute;
      width: 33px;
      height: 100%;
      left: 0;
      top: 0;
      background: url("../assets/images/carsouel-title-bg.png") center no-repeat;
    }
  }
  .swiper-pagination {
    position: absolute;
    right: 0;
    bottom: 30px;
    .swiper-pagination-bullet {
      margin-right: 10px;
      width: 15px;
      height: 15px;
      background: url("../assets/images/carsouel.png") center no-repeat;
      background-size: 100%;
      opacity: 1;
    }
    .swiper-pagination-bullet-active {
      background-image: url("../assets/images/carsouelIndex.png");
    }
  }
}
</style>
