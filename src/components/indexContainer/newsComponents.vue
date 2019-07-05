<template>
  <div class="news-container">
    <div class="center-left-bg"></div>
    <div class="center-right-bg"></div>
    <div>
      <indexHeaderTitle></indexHeaderTitle>
    </div>
    <div class="news-content-red-bg">
      <div class="news-cointent">
        <div class="coursel-container">
          <coursel :banner-list="bannerList"
            swiper-name="news-swiper"></coursel>
        </div>
        <div class="news-list">
          <span class="change-list"
            @click="changeIndexNewsArticleList">换一换</span>
          <ul class="news-list-ul"
            v-if="indexNewsArticleList.length > 0">
            <li class="news-list-li"
              v-for="(item, index) in indexNewsArticleList"
              :key="index">
              <a :href="`/articleDetail/${item._id}`">
                {{item.articleTitle}}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="news-article">
      <news-article v-for="(item, index) in indexHotNewsArticleList"
        :key="index"
        :article-obj="item"
        :class="index !== 2 ? 'margin-right30px' : ''"></news-article>
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
      indexHotNewsArticleList: []
    };
  },
  components: {
    indexHeaderTitle,
    coursel,
    "news-article": article,
    adimg
  },
  async created() {
    let res = await getBannerList("secondChannel", "12");
    this.bannerList = res.data.data;
    // let indexNewsArticleList = await getIndexNewsArticleList();
    // this.indexNewsArticleList = indexNewsArticleList.data.data;
    // console.log(this.indexNewsArticleList);
    this.changeIndexNewsArticleList();
    let indexHotNewsArticleList = await getIndexChannelArticleList("2");
    this.indexHotNewsArticleList = indexHotNewsArticleList.data.data;
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
.news-container {
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
    background: rgba(790, 0, 30, 0.9);
  }
  .news-content-red-bg {
    height: 415px;
    margin-bottom: 63px;
    background-color: #be001e;
    .news-cointent {
      width: 1200px;
      margin: 0 auto;
      .news-list {
        display: inline-block;
        position: relative;
        box-sizing: border-box;
        margin-left: 30px;
        width: 380px;
        height: 416px;
        border: 1px solid rgba(255, 255, 255, 1);
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
        .news-list-ul {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          padding: 45px 81px 0 51px;
          .news-list-li {
            position: relative;
            padding-left: 20px;
            height: 45px;
            width: 100%;
            line-height: 45px;
            font-size: 14px;

            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: pointer;

            a {
              color: rgba(255, 255, 255, 0.8);
              &:hover {
                color: rgba(255, 255, 255, 1);
              }
            }
            &::before {
              content: "";
              z-index: 2;
              position: absolute;
              left: 0px;
              top: 20px;
              width: 8px;
              height: 8px;
              background: url("../../assets/images/carous_white.png");
              background-size: 100%;
            }
          }
        }
      }
    }
  }

  .news-article {
    margin: 0 auto;
    position: relative;
    width: 1200px;
    .margin-right30px {
      margin-right: 30px;
    }
  }
  .ad-wrapper {
    margin-top: 30px;
  }
}
</style>
