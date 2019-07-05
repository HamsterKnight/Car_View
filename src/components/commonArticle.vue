<template>
  <div class="common-article">
    <div class="article-content">
      <a class="img_a"
        :href="articleObj.isHobbies ? `/hobbiesArticleDetail/${articleObj._id}`: `/articleDetail/${articleObj._id}`">
        <img class="article-img"
          :src="articlePicture"
          alt="">
      </a>
      <p class="article-title">
        <span class="content">{{articleObj.articleTitle}}</span>
      </p>
      <p class="article-digest">{{articleObj.articleDigest}}</p>
      <div class="article-user-msg">
        <a :href="`/blogerDetail/${articleObj.authorId}`">
          <img class="user-avatar"
            :src="avatarSrc"
            alt="">
        </a>
        <span class="user-name">{{articleObj.author}}</span>
        <span class="line">|</span>
        <span class="article-channel">{{articleObj.channelName}}</span>
      </div>
    </div>
  </div>

</template>
<script>
import { path } from "@/http.js";
export default {
  props: {
    articleObj: {}
  },
  data() {
    return {
      path: path
    };
  },
  computed: {
    articlePicture() {
      return this.articleObj.articlePic
        ? `${this.path}${this.articleObj.articlePic}`
        : "@/assets/iamges/banner.png";
    },
    avatarSrc() {
      return this.articleObj.articlePic
        ? `${this.path}${this.articleObj.articlePic}`
        : "../assets/iamges/avater-icon.png";
    }
  }
};
</script>

<style lang="less" scoped>
.common-article {
  position: relative;
  margin-bottom: 30px;
  width: 790px;
  height: 674px;
  background-color: #fff;
  .article-content {
    width: 100%;
    height: 100%;
    .img_a {
      display: inline-block;
      width: 100%;
      height: 450px;
    }
    .article-img {
      width: 100%;
      height: 450px;
    }
    .article-title {
      margin-top: 50px;
      height: 26px;
      line-height: 26px;
      cursor: pointer;
      .content {
        display: inline-block;
        padding: 0 30px;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        border-left: 3px solid #ccc;
        font-size: 26px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:hover {
          border-color: #be001e;
          color: #be001e;
        }
      }
    }
    .article-digest {
      margin-top: 30px;
      padding: 0 30px;
      font-size: 14px;
      color: #5b5b5b;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .article-user-msg {
      margin-top: 50px;
      padding-left: 30px;
      vertical-align: top;
      .user-avatar {
        margin-right: 15px;
        width: 25px;
        height: 25px;
        border-radius: 50%;
      }
      .user-name {
        line-height: 25px;
        font-size: 14px;
        color: #b1b1b1;
        vertical-align: top;
      }
      .line {
        margin: 0 15px;
        height: 8px;
        font-size: 14px;
        line-height: 25px;
        color: #b1b1b1;
        vertical-align: top;
      }
      .article-channel {
        font-size: 14px;
        color: #b1b1b1;
        vertical-align: top;
        line-height: 25px;
      }
    }
  }
}
</style>

