<template>
  <div class="article-example">
    <div class="article-img"
      v-if="articleObj.articlePic">
      <a :href=" isHobbies ? `/hobbiesArticleDetail/${articleObj._id}`:`/articleDetail/${articleObj._id}`">
        <img :src="`${path}${articleObj.articlePic}`">
      </a>
    </div>
    <div class="article-title"
      v-if="
      articleObj.channelId
      !=5">
      <a :href=" isHobbies ? `/hobbiesArticleDetail/${articleObj._id}`:`/articleDetail/${articleObj._id}`">
        <strong v-text="articleObj.articleTitle"></strong>
      </a>

    </div>
    <div class="user-msg">
      <a :href=" articleObj.authorId ? `/blogerDetail/${articleObj.authorId}` : 'javascript:;'">
        <img v-if="articleObj.authorAvatar"
          class="user-avater"
          :src="`${path}${articleObj.authorAvatar}`"
          alt="" />
        <img v-else
          class="user-avater"
          src="../assets/images/avater-icon.png"
          alt="">
      </a>
      <span class="user-name">{{articleObj.author}}</span>
      <span class="line"
        v-if="articleObj.channelId != 5">|</span>
      <span class="user-channel"
        v-if="articleObj.channelId != 5"
        v-text="articleObj.channelName"></span>
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
        return {};
      }
    }
  },
  data() {
    return {
      path: path,
      article: {
        photo: "../assets/images/defaultLogo.png",
        title: "我是标题",
        digest: "我是摘要",
        userId: "1",
        userName: "流浪剑客",
        userPhoto: "../assets/images/nav_search.png",
        className: "今日车闻"
      }
    };
  },
  computed: {
    isHobbies() {
      return this.articleObj.isHobbies ? true : false;
    }
  }
};
</script>

<style lang="less">
.article-example {
  display: inline-block;
  position: relative;
  width: 380px;
  height: 400px;
  background-color: #fff;
  color: #000;
  vertical-align: top;
  .article-img {
    position: relative;
    width: 380px;
    height: 280px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .article-title {
    margin-top: 20px;
    width: 100%;
    height: 22px;
    padding-left: 23px;
    margin-bottom: 10px;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-left: 3px solid #be001e;
    line-height: 22px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    a {
      color: #000;
      &:hover {
        color: #be001e;
      }
    }
  }
  .user-msg {
    margin-top: 20px;
    padding-left: 20px;
    width: 100%;
    height: 25px;
    box-sizing: border-box;
    .user-avater {
      margin-right: 15px;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      vertical-align: top;
      cursor: pointer;
    }
    .user-name {
      display: inline-block;
      max-width: 120px;
      box-sizing: border-box;
      margin-right: 15px;
      font-size: 14px;
      line-height: 24px;
      vertical-align: top;
      cursor: pointer;
      &:hover {
        color: #be001e;
      }
    }
    .user-channel {
      margin-left: 15px;
      font-size: 14px;
      vertical-align: top;
      line-height: 24px;
    }
    .line {
      font-size: 14px;
      line-height: 24px;
      color: #ccc;
      vertical-align: top;
    }
  }
}
</style>
