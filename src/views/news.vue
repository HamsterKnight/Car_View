<template>
  <div class="news-container">
    <nav-header index="1"></nav-header>
    <div class="news-header-swiper">
      <coursel :banner-list="newsBannerList"
        swiper-name="new-swiper"></coursel>
    </div>
    <div class="news-title">
      <indexHeaderTitle retangle-type="0"></indexHeaderTitle>
    </div>
    <div class="tag-wrapper">
      <tag v-for="(tag, index) in tagList "
        :key="index"
        :tag-obj="tag"> </tag>
    </div>
    <div class="news-article-content">
      <ul class="news-article-content-ul">
        <li class="news-article-content-li"
          v-for="(item ,index) in articleList "
          :key="index">
          <commonArticle :article-obj="item"></commonArticle>
        </li>
        <li class="page-control">
          <page :page-count="msgObj.allPage"></page>
        </li>
      </ul>
      <div class="news-column"
        v-if="columnList[0]">
        <div class="margin-bottom45px">
          <div class="news-left-header">
            <span class="news-bg"></span>
            <div class="news-column-title">{{columnList[0].columnTitle}}</div>
          </div>
          <columnCoursel swiper-name="first-column-swiper"
            :column-list="columnList[0].picList"
            class="limit-width"></columnCoursel>
        </div>
        <div v-if="columnList[1]">
          <div class="news-left-header">
            <span class="news-bg"></span>
            <div class="news-column-title">{{columnList[1].columnTitle}}</div>
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
      newsBannerList: [],
      articleList: [],
      msgObj: {},
      tagList: {},
      columnList: []
    };
  },
  async created() {
    let res = await getBannerList("firstChannel", "2");
    this.newsBannerList = res.data.data;
    let articleMsgObj = await getChannelArticleList("2", this.page);
    this.msgObj = articleMsgObj.data;
    this.articleList = articleMsgObj.data.list;
    let tagList = await getChannelTag(2);
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
.news-container {
  position: relative;
  width: 100%;
  .news-header-swiper {
    position: relative;
    width: 100%;
    height: 580px;
  }
  .news-title {
    margin: 0 auto;
    width: 1200px;
  }
  .tag-wrapper {
    margin: 0 auto;
    width: 1200px;
    text-align: center;
  }

  .news-article-content {
    position: relative;
    margin: 41px auto 0 auto;
    width: 1200px;
    .news-article-content-ul {
      display: inline-block;
      width: 790px;
      margin-right: 30px;
      .news-article-content-li {
      }
      .page-control {
        text-align: center;
      }
    }
    .news-column {
      display: inline-block;
      padding: 30px;
      background-color: #fff;
      vertical-align: top;
      .margin-bottom45px {
        margin-bottom: 45px;
      }
      .news-left-header {
        margin-bottom: 21px;
        width: 100%;
        .news-bg {
          display: inline-block;
          width: 8px;
          height: 27px;
          float: left;
          background: url("../assets/images/hot-news.png") no-repeat;
        }
        .news-column-title {
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

