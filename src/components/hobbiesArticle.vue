<template>
  <div class="hobbies-article">
    <div class="article-content-wrapper"
      v-if="
        articleObj.picList
        &&
        articleObj.picList.length > 0">
      <a :href="`/hobbiesArticleDetail/${articleObj._id}`"><img class="article-img"
          :src="avatarSrc"
          alt="">
      </a>

      <p class="article-content">
        <span class="content">{{articleObj.articleContent}}</span>
      </p>
      <div class="article-user-msg">
        <a :href="`/hobbiesArticleDetail/${articleObj._id}`"><img class="user-avatar"
            :src="avatarSrc"><span class="user-name">{{articleObj.author}}</span>
        </a>

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
    // articlePicture() {
    //   return this.articleObj.articlePic
    //     ? `${this.path}${this.articleObj.articlePic}`
    //     : "@/assets/iamges/banner.png";
    // },
    avatarSrc() {
      return this.articleObj.articlePic
        ? `${this.path}${this.articleObj.articlePic}`
        : "../assets/iamges/avater-icon.png";
    },
    imgStyle() {
      let len = this.articleObj.picList.length;
      if (len > 4) {
        return "imgWidth120";
      } else if (len >= 2) {
        return "imgWidth185";
      } else {
        return "normal";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.hobbies-article {
  position: relative;
  display: inline-block;
  margin-bottom: 30px;
  width: 390px;
  padding: 0 10px 10px 0;
  box-sizing: border-box;
  .article-content-wrapper {
    width: 100%;
    height: 100%;
    background-color: #fff;
    a {
      .article-img {
        position: relative;
        width: 380px;
        height: 250px;
        cursor: pointer;
      }
    }

    .article-content {
      margin-top: 20px;
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
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:hover {
          border-color: #be001e;
          color: #be001e;
        }
      }
    }
    .article-user-msg {
      margin-top: 20px;
      margin-bottom: 10px;
      padding-left: 30px;
      vertical-align: top;
      a {
        .user-avatar {
          margin-right: 15px;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          cursor: pointer;
        }
        .user-name {
          line-height: 25px;
          font-size: 14px;
          color: #b1b1b1;
          vertical-align: top;
        }
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

