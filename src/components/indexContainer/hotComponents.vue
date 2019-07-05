<template>
  <div class="hots-container">
    <div class="hots-left-header">
      <span class="header-bg"></span>
      <div class="news">热点资讯</div>
    </div>
    <div class="hots-content">
      <article-example class="margin-right30px"
        v-for="(item, index) in hotArticleList"
        v-if="index < 2"
        :key="index"
        :articleObj="item"></article-example>
      <div class="hots-news-ad">
        <mostHotContainer :hots-list="hotArticleList"></mostHotContainer>
      </div>
      <div class="tag-wrapper">
        <tag v-for="(item, index) in hotTagList"
          :key="index"
          :tag-obj="item"></tag>
      </div>
    </div>
  </div>
</template>
<script>
import article from "@/components/indexArticle.vue";
import mostHotContainer from "@/components/indexContainer/mostHotContainer.vue";
import tag from "@/components/indexContainer/tag.vue";
import { getHotArticleList, getHotTagList } from "@/http.js";
export default {
  data() {
    return {
      hotArticleList: [],
      hotTagList: []
    };
  },
  async created() {
    let result = await getHotArticleList();
    this.hotArticleList = result.data.data;
    let hotTagList = await getHotTagList();
    this.hotTagList = hotTagList.data.data;
    console.log(this.hotTagList);
  },
  components: {
    "article-example": article,
    mostHotContainer,
    tag
  }
};
</script>
<style lang="less">
.hots-container {
  position: relative;
  margin: 0 auto;
  width: 1200px;
  .hots-left-header {
    margin-bottom: 10px;
    width: 100%;
    .header-bg {
      display: inline-block;
      width: 8px;
      height: 27px;
      float: left;
      background: url("../../assets/images/hot-news.png") no-repeat;
    }
    .news {
      height: 100%;
      display: inline-block;
      font-size: 22px;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
      line-height: 27px;
      margin-left: 15px;
    }
  }
  .hots-content {
    .margin-right30px {
      margin-right: 30px;
    }
    .hots-news-ad {
      display: inline-block;
      margin-top: -40px;
      vertical-align: top;
    }
    .tag-wrapper {
      margin-top: 40px;
      width: 100%;
      text-align: center;
    }
  }
}
</style>
