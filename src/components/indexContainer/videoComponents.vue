<template>
  <div class="video-container">
    <div>
      <indexHeaderTitle title="视频"
        retangle-type="0"
        alpha-title="VIDEO"></indexHeaderTitle>
    </div>
    <div class="video-cointent">
      <div class="coursel-container">
        <coursel :banner-list="bannerList"
          swiper-name="video-swiper"></coursel>
      </div>
      <div class="video-hot-article">
        <ul class="video-hot-article-list">
          <li class="video-hot-article-list-li"
            v-for="(item, index) in indexHotVideoArticleList"
            :key="index">
            <a :href="`/articleDetail/${item._id}`">
              <img :src="`${path}${item.articlePic}`"
                alt="">
            </a>
            <div class="video-hot-article-title">
              <a :href="`/articleDetail/${item._id}`"><span class="title">{{item.articleTitle}}</span></a>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="tag-wrapper">
      <tag v-for="(tag, index) in tagList"
        :key="index"
        :tag-obj="tag"></tag>
    </div>
    <div class="ad-wrapper">
      <adimg></adimg>
    </div>

  </div>
</template>
<script>
import indexHeaderTitle from "@/components/indexContainer/indexHeaderTitle";
import coursel from "@/components/otherCoursel.vue";
import adimg from "@/components/adImg.vue";
import tag from "@/components/indexContainer/tag.vue";
import {
  path,
  getBannerList,
  getIndexChannelArticleList,
  getChannelTag
} from "@/http.js";
export default {
  data() {
    return {
      path: path,
      bannerList: [],
      indexHotVideoArticleList: [],
      tagList: []
    };
  },
  async created() {
    let res = await getBannerList("secondChannel", "15");
    this.bannerList = res.data.data;
    let indexHotVideoArticleList = await getIndexChannelArticleList("4");
    this.indexHotVideoArticleList = indexHotVideoArticleList.data.data;
    let tag = await getChannelTag(4);
    this.tagList = tag.data.data;
  },
  components: {
    indexHeaderTitle,
    coursel,
    adimg,
    tag
  }
};
</script>
<style lang="less">
.video-container {
  position: relative;
  height: 540px;
  .coursel-container {
    display: inline-block;
    width: 953px;
    height: 536px;
  }
  .video-cointent {
    width: 1200px;
    margin: 0 auto;
    .video-hot-article {
      display: inline-block;
      vertical-align: top;
      width: 217px;
      margin-top: 0;
      margin-left: 20px;
      .video-hot-article-list {
        width: 217px;
        .video-hot-article-list-li {
          margin-top: 10px;
          position: relative;
          width: 217px;
          height: 172px;
          &:first-of-type {
            margin-top: 0;
          }
          a {
            img {
              width: 100%;
              height: 122px;
            }
          }

          .video-hot-article-title {
            width: 100%;
            height: 50px;
            line-height: 50px;
            a {
              color: #000;
              .title {
                display: inline-block;
                box-sizing: border-box;
                padding-left: 19px;
                width: 200px;
                height: 16px;
                font-size: 16px;
                line-height: 16px;
                border-left: 3px solid #ccc;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-weight: bold;
                cursor: pointer;
                &:hover {
                  color: #be001e;
                  border-color: #be001e;
                }
              }
            }
          }
        }
      }
    }
  }
  .video-article {
    margin: 30px auto 0 auto;
    position: relative;
    width: 1200px;
    .margin-right30px {
      margin-right: 30px;
    }
  }
  .ad-wrapper {
    margin-top: 30px;
  }
  .tag-wrapper {
    margin-top: 40px;
    width: 100%;
    text-align: center;
  }
}
</style>
