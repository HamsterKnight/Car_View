<template>
  <div class="hobbies-container">
    <div class="center-left-bg"></div>
    <div class="center-right-bg"></div>
    <div>
      <indexHeaderTitle title="兴趣部落">
      </indexHeaderTitle>
    </div>
    <div class="hobbies-content-red-bg">
      <div class="hobbies-content">
        <div class="coursel-container">
          <coursel :banner-list="bannerList"
            swiper-name="hobbies-swiper"></coursel>
        </div>
        <div class="hobbies-list">
          <hobbies-article :article-obj="indexHotHobbiesArticleList[0]"></hobbies-article>
        </div>
      </div>
    </div>

    <div class="hobbies-article">
      <!-- 加个overflow类去剪掉没有标题的高度 -->
      <hobbies-article class="hobbies-article-overflow"
        v-for="(item, index) in indexHotHobbiesArticleList"
        :key="index"
        v-if="index > 0"
        :article-obj="item"
        :class="index%3 !== 0 ? 'margin-right30px' : ''"></hobbies-article>
    </div>
    <div class="ad-wrapper">
      <adimg></adimg>
    </div>
  </div>
</template>
<script>
import indexHeaderTitle from "@/components/indexContainer/indexHeaderTitle";
import article from "@/components/indexArticle.vue";
import coursel from "@/components/otherCoursel.vue";
import adimg from "@/components/adImg.vue";
import {
  getBannerList,
  getIndexNewsArticleList,
  getIndexChannelArticleList
} from "@/http.js";
export default {
  data() {
    return {
      bannerList: [],
      indexNewsArticleList: [],
      indexHotHobbiesArticleList: []
    };
  },
  components: {
    indexHeaderTitle,
    coursel,
    "hobbies-article": article,
    adimg
  },
  async created() {
    let res = await getBannerList("secondChannel", "14");
    this.bannerList = res.data.data;
    // let indexNewsArticleList = await getIndexNewsArticleList();
    // this.indexNewsArticleList = indexNewsArticleList.data.data;
    // console.log(this.indexNewsArticleList);
    this.changeIndexNewsArticleList();
    let indexHotHobbiesArticleList = await getIndexChannelArticleList("5", 7);
    this.indexHotHobbiesArticleList = indexHotHobbiesArticleList.data.data;
  },
  methods: {
    async changeIndexNewsArticleList() {
      let indexNewsArticleList = await getIndexNewsArticleList();
      this.indexNewsArticleList = indexNewsArticleList.data.data;
    }
  }
};
</script>
<style lang="less">
.hobbies-container {
  margin-top: 30px;
  position: relative;
  background-size: 100% 540px;

  .center-left-bg {
    position: absolute;
    z-index: 1;
    top: -35px;
    left: 0;
    width: 114px;
    height: 110px;
    background: url("../../assets/images/center_left.png") center no-repeat;
    background-size: 100%;
  }
  .center-right-bg {
    position: absolute;
    z-index: 1;
    top: -30px;
    right: 0;
    width: 114px;
    height: 110px;
    background: url("../../assets/images/center_right.png") center no-repeat;
    background-size: 100%;
  }
  .coursel-container {
    display: inline-block;
    width: 790px;
    height: 450px;
    background: rgba(166, 0, 11, 0.9);
  }
  .hobbies-content-red-bg {
    height: 400px;
    margin-bottom: 78px;
    background-color: #be001e;
    .hobbies-content {
      width: 1200px;
      margin: 0 auto;
      .hobbies-list {
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        margin-left: 30px;
        width: 380px;
        height: 416px;
        vertical-align: top;
        .change-list {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 36px;
          height: 12px;
          font-size: 12px;
          font-weight: 300;
          color: rgba(255, 255, 255, 1);
          opacity: 0.3;
          cursor: pointer;
        }
      }
    }
  }

  .hobbies-article {
    margin: 0 auto;
    position: relative;
    width: 1200px;
    .margin-right30px {
      margin-right: 30px;
      margin-bottom: 30px;
    }
    .hobbies-article-overflow {
      height: 340px;
      overflow: hidden;
    }
  }
  .ad-wrapper {
    margin-top: 30px;
  }
}
</style>
