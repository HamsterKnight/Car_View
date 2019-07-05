<template>
  <div class="hobbies-swiper-wrapper">
    <div class="hobbies-swiper-container">
      <swiper class="my-hobbies-swiper"
        :options="swiperOption"
        :ref="swiperName"
        @slideChange="swiperChange"
        v-if="picList.length > 0">
        <swiper-slide class="my-hobbies-swiper-slide"
          v-for="(pic, index) in picList"
          :key="index">
          <div class="swiper-content">
            <img :src="`${path}${pic.url}`">
          </div>
        </swiper-slide>
        <!-- Optional controls -->
        <div :class="['swiper-button-prev' ,index == 0 ?'btn-show' :'']"
          slot="button-prev"
          @click="prev"
          v-if="picList.length > 1"></div>
        <div :class="['swiper-button-next' , index == picList.length-1 ? 'btn-show' :'']"
          slot="button-next"
          @click="next"
          v-if="picList.length > 1"></div>
      </swiper>
    </div>
    <div class="hobbies-thumbs-swiper">
      <swiper :ref="`${swiperName}2`"
        :options="galleryOptions"
        @slideChange="thumbsChange"
        @click="click"
        v-if="picList.length >= 2">
        <swiper-slide class="hobbies-thumbs-swiper-slide"
          v-for="(pic, index) in picList"
          :key="index">
          <div class="swiper-content">
            <img :src="`${path}${pic.url}`">
          </div>
        </swiper-slide>

        <!-- Optional controls -->
      </swiper>
    </div>

  </div>

</template>

<script>
import { path } from "@/http.js";
export default {
  name: "carrousel",
  props: {
    swiperName: {
      type: String,
      default: "hobbies-detail-swiper"
    },
    picList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      path: path,
      index: 0,
      swiperOption: {},
      galleryOptions: {
        centeredSlides: true,
        slidesPerView: 9,
        watchSlidesVisibility: true //防止不可点击
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs[this.swiperName]
        ? this.$refs[this.swiperName].swiper
        : null;
    },
    gallery() {
      return this.$refs[this.swiperName + "2"]
        ? this.$refs[this.swiperName + "2"].swiper
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
      this.index = this.swiper.activeIndex;
      // this.index = this.swiper.activeIndex;
    },
    prev() {
      if (this.swiper == null) {
        this.swiper = this.$refs[this.swiperName].swiper;
      }
      this.swiper.slidePrev();
      // this.index = this.swiper.activeIndex;
      this.index = this.swiper.activeIndex;
    },
    swiperChange() {
      this.gallery.slideTo(this.swiper.activeIndex);
      this.index = this.swiper.activeIndex;
    },
    thumbsChange() {
      this.swiper.slideTo(this.gallery.activeIndex);
      this.index = this.swiper.activeIndex;
    },
    click() {
      this.swiper.slideTo(this.gallery.clickedIndex);
      this.index = this.swiper.activeIndex;
    }
  }
};
</script>
<style lang="less">
.hobbies-swiper-wrapper {
  .swiper-button-prev {
    width: 50px;
    height: 77px;
    background: url("../assets/images/right.png") center no-repeat !important;
  }
  .swiper-button-next {
    width: 50px;
    height: 77px;
    background: url("../assets/images/left.png") center no-repeat !important;
  }
}
.my-hobbies-swiper {
  max-width: 700px;
  margin-bottom: 50px;
}
.my-hobbies-swiper-slide {
  max-width: 700px;
  img {
    max-width: 700px;
  }
}
.hobbies-thumbs-swiper-slide {
  opacity: 0.6;
  img {
    // max-width: 100px !important;
  }
  &.swiper-slide-active {
    opacity: 1;
  }
}
.btn-show {
  opacity: 0.5;
}
</style>
