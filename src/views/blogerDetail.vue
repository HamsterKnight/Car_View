<template>
  <div class="bloger-myEssay">
    <div class="common-head">
      <common-head></common-head>
    </div>
    <div class="bloger-head">
      <div class="person-components-header">
        <div class="person-components-content">
          <div class="img-wrapper">
            <img v-if="userMsg && userMsg.authorAvatar"
              :src="`${path}${userMsg.authorAvatar}`"
              alt="">
            <img v-else
              src="../assets/images/avater-icon.png"
              alt="">
          </div>
          <div class="name-wrapper"> <span v-if="userMsg"
              class="name">{{userMsg.author}}</span> </div>
          <div class="focus-wrapper"> <span :class="['word' , focusFlag ? 'isFocus' : '']"
              @click="handleFocusBloger">{{focusFlag?'已关注':"关注"}}</span></div>
          <div class="other-msg">
            <div class="articleCount">
              <span class="tip">文章</span>
              <span class="count"
                v-if="userMsg">{{totalCount}}</span>
            </div>
            <div class="focusCount">
              <span class="tip">关注</span>
              <span class="count"
                v-if="userMsg">{{userMsg.focusCount ? userMsg.focusCount: 0}}</span>
            </div>
            <div class="fensCount">
              <span class="tip">粉丝</span>
              <span class="count"
                v-if="userMsg">{{userMsg.fensCount ? userMsg.fensCount : 0}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="person-myEssay-content"
      v-if="articleList">
      <div class="content-head">
        <div class="article-count">
          <span class="title-bg"
            v-if="userMsg"></span>{{userMsg.author}}的
          <span class="red-count">{{totalCount}}</span>篇文章
        </div>
      </div>
      <div class="person-article-list">
        <pseron-article :class="index !== 2 ? 'margin-right20px':''"
          v-for="(item, index) in articleList"
          :article-obj="item"
          :is-edit="1"
          :key="index"></pseron-article>
      </div>
      <div class="person-page-wrapper">
        <page :limit="9"
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
import {
  getBlogerArticleList,
  getUserDetailMsg,
  focusBloger,
  path
} from "@/http.js";
export default {
  data() {
    return {
      authorId: "",
      blogerId: "",
      articleList: null,
      allPage: 1,
      totalCount: 0,
      userMsg: null,
      focusFlag: false,
      path
    };
  },
  components: {
    "common-head": commonHead,
    "pseron-article": article,
    "person-head": personHead,
    page
  },
  async created() {
    this.blogerId = this.$route.params.id;
    this.__init();
    // 当前博主详细信息
    let userResult = await getUserDetailMsg(this.blogerId);
    this.userMsg = userResult.data.data;
    let result = await getBlogerArticleList(this.blogerId, this.page);
    this.articleList = result.data.list;
    this.allPage = result.data.allPage;
    this.totalCount = result.data.totalCount;
  },
  methods: {
    handleFocusBloger(index) {
      if (this.authorId == this.blogerId) {
        this.$message("不能关注自己");
        return false;
      }
      if (this.authorId) {
        let obj = {
          _id: this.authorId,
          author: this.userMsg.author,
          authorId: this.userMsg.authorId,
          isFocus: !this.focusFlag
        };
        focusBloger(obj).then(res => {
          this.focusFlag = !this.focusFlag;
        });
      } else {
        this.$message("请先登录");
      }
    },
    // 获取不同页的文章列表
    async getCurrentPageArticleList(page) {
      let result = await getBlogerArticleList(this.authorId, page);
      this.articleList = result.data.list;
      this.allPage = result.data.allPage;
    },
    // 获取cookie
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    },
    async __init() {
      let msg = localStorage.getItem("userMsg")
        ? localStorage.getItem("userMsg")
        : this.getCookie("userMsg")
        ? this.getCookie("userMsg")
        : "";
      // 获取用户authorId
      if (msg) {
        this.authorId = JSON.parse(msg)[0].authorId;
        //当前登陆用户id的详细信息
        let result = await getUserDetailMsg(this.authorId);
        let focusList = result.data.data.focusList;
        if (this.authorId !== this.blogerId) {
          let index = focusList.findIndex(item => {
            return this.blogerId == item.authorId;
          });
          this.focusFlag = index >= 0 ? true : false;
        }
      }
    }
  }
};
</script>
<style lang="less">
.margin-right20px {
  margin-right: 20px;
}
.bloger-myEssay {
  .bloger-head {
    .person-components-header {
      .person-components-content {
        height: 400px;
        background: url("../assets/images/person-bg.png") center no-repeat;
        .img-wrapper {
          display: inline-block;
          width: 100%;
          margin-bottom: 20px;
          margin-top: 40px;
          height: 130px;
          text-align: center;
          img {
            height: 130px;
            width: 130px;
            border-radius: 50%;
          }
        }
        .name-wrapper {
          margin-bottom: 15px;
          height: 23px;
          font-size: 24px;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          text-align: center;
          .name {
            line-height: 23px;
          }
        }
        .focus-wrapper {
          margin-bottom: 50px;
          text-align: center;
          cursor: pointer;
          .word {
            display: inline-block;
            width: 80px;
            height: 30px;
            background: url("../assets/images/focus-bg.png") center no-repeat;
            line-height: 30px;
            color: #fff;
            &.isFocus {
              background: none;
              border: 1px solid #ccc;
              color: #999;
            }
          }
        }
        .other-msg {
          text-align: center;
          font-size: 18px;
          color: #fff;
          .articleCount {
            position: relative;
            display: inline-block;
            margin-right: 40px;
            width: 80px;
            height: 80px;
          }
          .focusCount {
            position: relative;
            display: inline-block;
            margin-right: 40px;
            width: 80px;
            height: 80px;
          }
          .fensCount {
            position: relative;
            display: inline-block;
            width: 80px;
          }
          .tip {
            display: inline-block;
            width: 100%;
            margin-bottom: 15px;
            opacity: 0.6;
          }
        }
      }
      .person-components-tab-wrapper {
        background-color: #fff;
        .person-components-tab {
          position: relative;
          margin: 0 auto;
          width: 1200px;
          height: 50px;
          overflow: hidden;
          text-align: center;
          .person-components-tab-item {
            display: inline-block;
            margin-right: 30px;
            width: 120px;
            height: 100%;
            line-height: 50px;
            font-size: 18px;
            font-weight: 500;
            color: rgba(18, 18, 18, 1);
            text-align: center;
            cursor: pointer;
            a {
              color: #000;
            }
            &:last-child {
              margin-right: 0;
            }
            &.active {
              background: url("../assets/images/person-tab.png") center
                no-repeat;
            }
            &.active a {
              color: #fff;
            }
          }
        }
      }
    }
  }
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

