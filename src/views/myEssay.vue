<template>
  <div class="person-myEssay">
    <div class="common-head">
      <common-head></common-head>
    </div>
    <div class="person-head">
      <person-head active="1"></person-head>
    </div>
    <div class="person-myEssay-content">
      <div class="content-head">
        <div class="article-count">
          <span class="title-bg"></span>共上传
          <span class="red-count"
            v-if="articleList">{{articleList.length}}</span>篇文章
        </div>
        <div class="push-article-btn">
          <span class="article-btn"
            v-if="publishEssayFlag"
            @click="publishArticle"></span>
          <span class="article-btn hobbies"
            @click="publishHobbiesArticle"></span>
        </div>
      </div>
      <div class="person-article-list">
        <pseron-article :class="index !== 2 ? 'margin-right20px':''"
          v-for="(item, index) in articleList"
          :article-obj="item"
          :key="index"></pseron-article>
      </div>
      <div class="person-page-wrapper"
        v-if="articleList">
        <page v-if="articleList.length > 0"
          :limit="9"
          @pageChange="getCurrentPageArticleList"
          :page-count="allPage"></page>
      </div>
    </div>
  </div>
</template>
<script>
import commonHead from "@/components/header";
import personHead from "@/components/personComponent/personHead.vue";
import article from "@/components/personComponent/article.vue";
import page from "@/components/page.vue";
import { getAuthorArticle, getUserDetailMsg } from "@/http.js";
export default {
  data() {
    return {
      authorId: "",
      articleList: null,
      allPage: 1,
      publishEssayFlag: false
    };
  },
  components: {
    "common-head": commonHead,
    "pseron-article": article,
    "person-head": personHead,
    page
  },
  async created() {
    let msg = localStorage.getItem("userMsg")
      ? localStorage.getItem("userMsg")
      : this.getCookie("userMsg")
      ? this.getCookie("userMsg")
      : "";
    // 已经登陆
    if (msg) {
      // 获取当前用户id
      console.log(JSON.parse(msg)[0]);
      this.authorId = JSON.parse(msg)[0].authorId;
      let result = await getAuthorArticle(this.authorId, this.page);
      this.articleList = result.data.list;
      this.allPage = result.data.allPage;
      getUserDetailMsg(this.authorId).then(res => {
        this.publishEssayFlag =
          res.data.data.detailMessage.level === 1 ? true : false;
      });
    }
  },
  methods: {
    publishArticle() {
      this.$router.push({ name: "publishEssay" });
    },
    publishHobbiesArticle() {
      this.$router.push({ name: "publishHobbiesArticle" });
    },
    // 获取不同页的文章列表
    async getCurrentPageArticleList(page) {
      let result = await getAuthorArticle(this.authorId, page);
      this.articleList = result.data.list;
      this.allPage = result.data.allPage;
    },
    // 获取cookie
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    }
  }
};
</script>
<style lang="less">
.margin-right20px {
  margin-right: 20px;
}
.person-myEssay {
  .person-myEssay-content {
    position: relative;
    margin: 40px auto 0 auto;
    width: 1200px;
    overflow: hidden;
    .content-head {
      overflow: hidden;
      .article-count {
        float: left;
        line-height: 30px;
        vertical-align: top;
        font-size: 26px;
        font-weight: bold;
        color: rgba(18, 18, 18, 1);
        .title-bg {
          margin-right: 11px;
          display: inline-block;
          width: 10px;
          height: 30px;
          background: url("../assets/images/hot-news.png") center no-repeat;
          vertical-align: top;
        }
        .red-count {
          color: #be101e;
          line-height: 30px;
        }
      }
      .push-article-btn {
        float: right;
        .article-btn {
          display: inline-block;
          width: 150px;
          height: 40px;
          background: url("../assets/images/publish-article-btn.png") center
            no-repeat;
          cursor: pointer;
          &.hobbies {
            background: url("../assets/images/publish-hobbies-article.png")
              center no-repeat;
          }
        }
      }
    }
    .person-article-list {
      margin-top: 40px;
    }
    .person-page-wrapper {
      text-align: center;
    }
  }
}
</style>

