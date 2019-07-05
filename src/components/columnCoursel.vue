<template>
  <div class="column-swiper-wrapper">
    <div class="swiper-container">
      <swiper :options="swiperOption"
        :ref="swiperName"
        v-if="columnList.length> 0">
        <!-- slides -->
        <swiper-slide v-for="(column, index) in columnList"
          :key="index">
          <div class="swiper-content">
            <a :href="column.imgLink">
              <img :src="`${path}${column.url}`"
                alt="" />
              <div class="slide-title">
                <strong>{{column.imgTitle}}</strong>
              </div>
            </a>
          </div>
        </swiper-slide>
        <!-- Optional controls -->
      </swiper>
    </div>
    <div :class="[`swiper-pagination${swiperName}`,'swiper-pagination']"
      slot="pagination"></div>
  </div>

</template>

<script>
import { path } from "@/http.js";
export default {
  name: "carrousel",
  props: {
    swiperName: {
      type: String,
      default: "column-header-swiper"
    },
    columnList: {
      type: Array
    }
  },
  data() {
    return {
      path,
      swiperOption: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
        loop: true,
        //autoplay: true,
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
      return this.$refs[this.swiperName].swiper;
    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    console.log("this is current swiper instance object", this.swiper);
    this.swiper.autoplay.start();
    this.changeSlide();
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
<style lang="less" scoped>
.column-swiper-wrapper {
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
    height: 50px;
    color: #fff;
    font-size: 18px;
    background: rgba(0, 0, 0, 0.3);
    text-align: center;
    line-height: 50px;
    &::before {
      content: "";
      position: absolute;
      width: 23px;
      height: 100%;
      left: 0;
      top: 0;
      background: url("../assets/images/carsouel-title-bg.png") center no-repeat;
    }
  }
  .swiper-pagination {
    position: absolute;
    right: 0;
    bottom: 10px;
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
