<template>
  <div class="ev-hot-article">
    <div class="red-boreder-bg"></div>
    <div class="article-img"
      v-if="articleObj.articlePic">
      <img :src="`${path}${articleObj.articlePic}`"
        alt="">
    </div>
    <div class="article-title">
      <strong v-text="articleObj.articleTitle"></strong>
    </div>
    <div class="user-msg">
      <a :href="`/blogerDetail/${articleObj.authorId}`">
        <img v-if="articleObj.authorAvatar"
          class="user-avater"
          :src="articleObj.authorPic"
          alt="" />

        <img v-else
          class="user-avater"
          src="../../assets/images/avater-icon.png"
          alt="">
        <span class="user-name">{{articleObj.author}}</span>
      </a>
      <span class="line">|</span>
      <span class="user-channel"
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
      eassyListUrl: {
        photo: "../assets/images/defaultLogo.png",
        title: "我是标题",
        digest: "我是摘要",
        userId: "1",
        userName: "流浪剑客",
        userPhoto: "../assets/images/nav_search.png",
        className: "今日车闻"
      }
    };
  }
};
</script>

<style lang="less">
.ev-hot-article {
  position: relative;
  display: inline-block;
  position: relative;
  width: 390px;
  height: 440px;
  background-color: #fff;
  color: #000;
  .red-boreder-bg {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: -1;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-right: 10px solid #be001e;
    border-bottom: 10px solid #be001e;
  }
  .article-img {
    position: relative;
    width: 390px;
    height: 280px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .article-title {
    margin-top: 20px;
    padding-left: 20px;
    width: 100%;
    height: 22px;
    margin-bottom: 10px;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-left: 3px solid #be001e;
    line-height: 22px;
    font-size: 18px;
    font-weight: bold;
    strong {
      cursor: pointer;
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
    a {
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
        color: #000;
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
