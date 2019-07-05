<template>
  <div class="video-container">
    <nav-header index="4"></nav-header>
    <div class="video-header-swiper">
      <coursel :banner-list="videoBannerList"
        swiper-name="new-swiper"></coursel>
    </div>
    <div class="video-title">
      <indexHeaderTitle retangle-type="0"
        title="视频"
        alpha-title="VIDEOS"></indexHeaderTitle>
    </div>
    <div class="tag-wrapper">
      <tag v-for="(tag, index) in tagList "
        :key="index"
        :tag-obj="tag"> </tag>
    </div>
    <div class="video-article-content">
      <ul class="video-article-content-ul">
        <li class="video-article-content-li"
          v-for="(item ,index) in articleList "
          :key="index">
          <commonArticle :article-obj="item"></commonArticle>
        </li>
        <li class="page-control">
          <page></page>
        </li>
      </ul>
      <div class="video-column"
        v-if="columnList[0]">
        <div class="margin-bottom45px">
          <div class="video-left-header">
            <span class="video-bg"></span>
            <div class="video-column-title">{{columnList[columnList.length-1].columnTitle}}</div>
          </div>
          <columnCoursel swiper-name="first-column-swiper"
            :column-list="columnList[0].picList"
            class="limit-width"></columnCoursel>
        </div>
        <div v-if="columnList[1]">
          <div class="video-left-header">
            <span class="video-bg"></span>
            <div class="video-column-title">{{columnList[columnList.length-2].columnTitle}}</div>
          </div>
          <columnCoursel swiper-name="second-column-swiper"
            class="limit-width"
            :column-list="columnList[1].picList"></columnCoursel>
        </div>
      </div>
    </div>
    <div class="adImg-wrapper">
      <adImg></adImg>
    </div>
  </div>
</template>
<script>
import header from "@/components/header.vue";
import BigCoursel from "@/components/BigCoursel.vue";
import indexHeaderTitle from "@/components/indexContainer/indexHeaderTitle.vue";
import tag from "@/components/indexContainer/tag.vue";
import commonArticle from "@/components/commonArticle.vue";
import columnCoursel from "@/components/columnCoursel.vue";
import page from "@/components/page.vue";
import adImg from "@/components/adImg.vue";
import {
  getBannerList,
  getChannelArticleList,
  getChannelTag,
  getColumnList
} from "@/http.js";
export default {
  data() {
    return {
      videoBannerList: [],
      articleList: [],
      msgObj: {},
      tagList: {},
      columnList: []
    };
  },
  async created() {
    let res = await getBannerList("firstChannel", "4");
    console.log(res);
    this.videoBannerList = res.data.data;
    let articleMsgObj = await getChannelArticleList("4", this.page);
    this.msgObj = articleMsgObj.data;
    this.articleList = articleMsgObj.data.list;
    let tagList = await getChannelTag(4);
    this.tagList = tagList.data.data;
    getColumnList("2").then(res => {
      this.columnList = res.data.data;
    });
  },
  components: {
    "nav-header": header,
    coursel: BigCoursel,
    indexHeaderTitle,
    tag,
    commonArticle,
    columnCoursel,
    page,
    adImg
  }
};
</script>
<style lang="less">
.video-container {
  position: relative;
  width: 100%;
  .video-header-swiper {
    position: relative;
    width: 100%;
    height: 580px;
  }
  .video-title {
    margin: 0 auto;
    width: 1200px;
  }
  .tag-wrapper {
    margin: 0 auto;
    width: 1200px;
    text-align: center;
  }

  .video-article-content {
    position: relative;
    margin: 41px auto 0 auto;
    width: 1200px;
    .video-article-content-ul {
      display: inline-block;
      width: 790px;
      margin-right: 30px;
      .video-article-content-li {
      }
      .page-control {
        text-align: center;
      }
    }
    .video-column {
      display: inline-block;
      padding: 30px;
      background-color: #fff;
      vertical-align: top;
      .margin-bottom45px {
        margin-bottom: 45px;
      }
      .video-left-header {
        margin-bottom: 21px;
        width: 100%;
        .video-bg {
          display: inline-block;
          width: 8px;
          height: 27px;
          float: left;
          background: url("../assets/images/hot-news.png") no-repeat;
        }
        .video-column-title {
          height: 100%;
          display: inline-block;
          font-size: 22px;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
          line-height: 27px;
          margin-left: 15px;
        }
      }
      .limit-width {
        width: 320px;
        height: 260px;
      }
    }
  }
  .adImg-wrapper {
    margin-top: 60px;
  }
}
</style>

