<template>
  <div class="index-container">
    <nav-header></nav-header>
    <div class="index-header-swiper">
      <coursel :banner-list="indexBannerList"
        swiperName="index-header-swiper"></coursel>
    </div>
    <div class="index-hots-news">
      <hots-news></hots-news>
    </div>
    <div>
      <new-components></new-components>
    </div>

    <div>
      <ev-components></ev-components>
    </div>
    <div>
      <hobbies-components></hobbies-components>
    </div>
    <div>
      <video-components></video-components>
    </div>
  </div>
</template>
<script>
import header from "@/components/header.vue";
import BigCoursel from "@/components/BigCoursel.vue";
import hotsNews from "@/components/indexContainer/hotComponents.vue";
import newsComponents from "@/components/indexContainer/newsComponents.vue";
import hobbiesComponents from "@/components/indexContainer/hobbiesComponents.vue";
import evComponents from "@/components/indexContainer/evComponents.vue";
import videoComponents from "@/components/indexContainer/videoComponents.vue";
import { getBannerList } from "@/http.js";
import axios from "axios";
export default {
  data() {
    return {
      indexBannerList: []
    };
  },
  components: {
    "nav-header": header,
    coursel: BigCoursel,
    "hots-news": hotsNews,
    "new-components": newsComponents,
    "ev-components": evComponents,
    "video-components": videoComponents,
    "hobbies-components": hobbiesComponents
  },
  async created() {
    let res = await getBannerList("secondChannel", "11");
    this.indexBannerList = res.data.data;
  }
};
</script>
<style lang="less">
.index-container {
  position: relative;
  width: 100%;
  .index-header-swiper {
    position: relative;
    width: 100%;
    height: 580px;
  }
  .index-hots-news {
    margin-top: 68px;
    margin-bottom: 57px;
  }
}
</style>

