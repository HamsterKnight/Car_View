<template>
  <div class="person-article">
    <div class="person-article-content">
      <div class="person-article-channel">{{articleObj.channelName}}</div>
      <a :href="articleUrl">
        <img v-if="articleObj.articlePic"
          class="person-article-img"
          :src="`${path}${articleObj.articlePic}`"
          alt="">
        <div v-else
          class="person-article-img"></div>
      </a>
      <div class="person-article-title">
        <span class="title-flag"
          v-if="articleObj.state !== 1">{{articleObj.state === 2 ? '草稿' : (articleObj.state === 3 ? '审核中' :(articleObj.state === 4 ? '审核不通过' : ''))}}</span>
        <a :href="articleUrl"><span class="title">{{articleObj.articleTitle ? articleObj.articleTitle:'兴趣部落'}}</span></a>
      </div>
      <div class="person-article-digest">
        <a :href="articleUrl">{{articleObj.articleDigest ? articleObj.articleDigest :articleObj.articleContent}}</a>
      </div>
      <div class="edit-btn"
        v-if="isEdit === 0"
        @click="editArticle(articleObj._id)">
      </div>
    </div>
  </div>
</template>
<script>
import { path } from "@/http.js";
export default {
  props: {
    articleObj: {
      type: Object,
      default() {
        return {
          channelName: "",
          articlePic: "",
          articleTitle: "",
          articleDigest: "",
          state: -1
        };
      }
    },
    // 0表示显示编辑小图标
    isEdit: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      path: path
    };
  },
  computed: {
    articleUrl() {
      return this.articleObj.isHobbies
        ? `/hobbiesArticleDetail/${this.articleObj._id}`
        : `/articleDetail/${this.articleObj._id}`;
    }
  },
  methods: {
    editArticle(id) {
      if (this.articleObj.isHobbies) {
        this.$router.push({
          path: "/publishHobbiesArticle",
          query: { id }
        });
      } else {
        this.$router.push({ path: "/person/publishEssay", query: { id } });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.person-article {
  margin-top: 30px;
  display: inline-block;
  width: 380px;
  height: 380px;
  background-color: #fff;
  .person-article-content {
    position: relative;
    width: 380px;
    height: 380px;
    .person-article-channel {
      position: absolute;
      z-index: 1;
      top: 10px;
      left: 10px;
      width: 90px;
      padding-right: 5px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      background: url("../../assets/images/tag_bg.png") no-repeat center;
      background-size: 100%;
    }
    .person-article-img {
      display: inline-block;
      width: 380px;
      height: 280px;
      cursor: pointer;
      background-color: #ccc;
      vertical-align: top;
    }
    .person-article-title {
      margin-top: 22px;
      position: relative;
      width: 100%;
      height: 30px;
      padding-left: 20px;
      line-height: 30px;
      box-sizing: border-box;
      border-left: 3px solid #e4e4e4;
      &:hover {
        border-color: #be101e;
      }
      .title-flag {
        margin-right: 11px;
        display: inline-block;
        width: 80px;
        height: 30px;
        font-size: 12px;
        color: #fff;
        background: url("../../assets/images/person-tab.png") center no-repeat;
        background-size: 100%;
        text-align: center;
        cursor: pointer;
      }
      .title {
        display: inline-block;
        width: 60%;
        height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 18px;
        color: #000;
        cursor: pointer;
        vertical-align: top;

        &:hover {
          color: #be101e;
        }
      }
    }
    .person-article-digest {
      display: inline-block;
      margin-top: 10px;
      box-sizing: border-box;
      padding-left: 20px;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      text-indent: 14px;
      color: #5b5b5b;
      cursor: pointer;
      a {
        color: #000;
        &:hover {
          color: #be101e;
        }
      }
      &:hover {
        color: #be101e;
      }
    }
    .edit-btn {
      position: absolute;
      right: 10px;
      bottom: 10px;
      width: 20px;
      height: 20px;
      background: url("../../assets/images/edit-btn.png") center no-repeat;
      background-size: 100%;
      cursor: pointer;
    }
  }
}
</style>

