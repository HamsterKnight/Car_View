<template>
  <div class="ev-container">
    <div>
      <indexHeaderTitle title="新能源"
        retangle-type="0"
        alpha-title="EV"></indexHeaderTitle>
    </div>
    <div class="ev-cointent">
      <div class="coursel-container">
        <coursel :banner-list="bannerList"
          swiperName="ev-swiper"></coursel>
      </div>
      <div class="ev-hot-article-out">
        <div>
          <evHotArticle :article-obj="indexHotEVArticleList[0]"></evHotArticle>
        </div>
      </div>
    </div>
    <div class="ev-article">
      <ev-article v-for="(item, index) in indexHotEVArticleList"
        :key="index"
        v-if="index !== 0"
        :article-obj="item"
        :class="index !== 3 ? 'margin-right30px' : ''"></ev-article>
    </div>
  </div>
</template>
<script>
import indexHeaderTitle from "@/components/indexContainer/indexHeaderTitle";
import article from "@/components/indexArticle.vue";
import evHotArticle from "@/components/indexContainer/evHotArticle.vue";
import coursel from "@/components/otherCoursel.vue";
import { getBannerList, getIndexChannelArticleList } from "@/http.js";
export default {
  data() {
    return {
      bannerList: [],
      indexHotEVArticleList: []
    };
  },
  async created() {
    let res = await getBannerList("secondChannel", "13");
    this.bannerList = res.data.data;
    let indexHotEVArticleList = await getIndexChannelArticleList("3", 4);

    this.indexHotEVArticleList = indexHotEVArticleList.data.data;
  },
  components: {
    indexHeaderTitle,
    coursel,
    "ev-article": article,
    evHotArticle
  }
};
</script>
<style lang="less">
.ev-container {
  position: relative;
  .coursel-container {
    display: inline-block;
    width: 790px;
    height: 450px;
  }
  .ev-cointent {
    width: 1200px;
    margin: 0 auto;
    .ev-hot-article-out {
      margin-left: 20px;
      display: inline-block;
      vertical-align: top;
      width: 390px;
      margin-top: 0;
    }
  }
  .ev-article {
    margin: 30px auto 0 auto;
    position: relative;
    width: 1200px;
    .margin-right30px {
      margin-right: 30px;
    }
  }
}
</style>
