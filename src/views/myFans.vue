<template>
  <div class="person-fans">
    <div class="common-head">
      <common-head></common-head>
    </div>
    <div class="person-head">
      <person-head active="2"></person-head>
    </div>
    <div class="person-fans-content">
      <div class="content-head">
        <div class="article-count">
          <span class="title-bg"></span>您拥有
          <span class="red-count">{{fansList.length}}</span>位粉丝
        </div>
        <div class="search-input">
          <input class="search-content"
            v-model="searchContent" />
          <span class="search-btn"
            @click="search">搜索</span>
        </div>
      </div>
      <div class="person-fans-list"
        v-if="fansList.length > 0">
        <div class="fans-wrapper"
          v-for="(fans,index) in fansList"
          :key="index">
          <a :href="`/blogerDetail/${fans.authorId}`">
            <img v-if="!fans.authorAvatar"
              src="../assets/images/avater-icon.png"
              alt="">
            <img v-else
              :src="`${path}${fans.authorAvatar}`"
              alt="">
          </a>
          <div class="fans-msg">
            <div class="fans-name">{{fans.author}}</div>
            <div class="fans-other-msg">
              <span class="margin-right40px">粉丝 {{fans.fensCount}}</span>
              <span class="margin-right40px">关注 {{fans.focusCount}}</span>
              <span>文章 {{fans.articleCount}}</span>
            </div>
            <div :class="['operate-btn',fansListFlag[index] ? 'isFocus': '']"
              @click="isFocusBloger(index)">{{fansListFlag[index] ? '已关注':'关注'}}</div>
          </div>
        </div>
      </div>
      <div v-if="fansTip"
        class="not-found-tip">没有找到该粉丝用户</div>
      <div class="person-page-wrapper"
        v-if="allPage > 0">
        <page :limit="10"
          @pageChange="getCurrentPageBlogerList"
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
import { path, getUserDetailMsg, getBlogerFans, focusBloger } from "@/http.js";
export default {
  data() {
    return {
      path: path,
      authorId: "", //当前登陆作者id
      allFansList: [], // 所有粉丝简单信息数组
      fansList: [], // 第一页粉丝详细信息
      fansPart: [], // 第一页粉丝简单信息
      fansListFlag: [], // 第一页粉丝的关注按钮样式决定
      allPage: 0,
      searchContent: "", // 搜索内容,
      fansTip: false
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
      this.authorId = JSON.parse(msg)[0].authorId;
      let result = await getUserDetailMsg(this.authorId);
      //简单粉丝信息
      this.allFansList = result.data.data.fensList;
      // 计算页数
      this.allPage = Math.ceil(this.allFansList.length / 10);
      //循环获取第一页粉丝的详细信息
      this.fansPart = this.allFansList.slice(0, 10);
      this.fansPart.map(item => {
        result.data.data.focusList.map(focus => {
          this.fansListFlag.push(focus.authorId == item.authorId);
        });
        getUserDetailMsg(item.authorId).then(res => {
          this.fansList.push(res.data.data);
        });
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
    async search() {
      //精准查询
      let userResult = await getUserDetailMsg(this.authorId);

      getBlogerFans(this.authorId, this.searchContent).then(res => {
        let result = res.data.data;
        this.allPage = Math.ceil(result.length / 10);
        //循环获取第一页粉丝的详细信息
        this.fansPart = result.slice(0, 10);
        this.fansTip = this.allPage <= 0;
        this.fansListFlag = [];
        this.fansList = [];
        this.fansPart.map(item => {
          userResult.data.data.focusList.map(focus => {
            this.fansListFlag.push(focus.authorId == item.authorId);
          });
          // 获取粉丝详细信息
          getUserDetailMsg(item.authorId).then(res => {
            this.fansList.push(res.data.data);
          });
        });
      });
    },
    isFocusBloger(index) {
      let obj = {
        _id: this.authorId,
        author: this.fansList[index].author,
        authorId: this.fansList[index].authorId,
        isFocus: !this.fansListFlag[index]
      };
      focusBloger(obj).then(res => {
        this.fansListFlag.splice(index, 1, !this.fansListFlag[index]);
        this.$message({ type: "success", message: "操作成功" });
      });
    },
    // 获取不同页的文章列表
    async getCurrentPageBlogerList(page) {
      let result = await getUserDetailMsg(this.authorId);
      this.fansPart = this.allFansList.slice((page - 1) * 10, page * 10);

      this.fansList = [];
      this.fansListFlag = [];
      this.fansPart.map(item => {
        result.data.data.focusList.map(focus => {
          this.fansListFlag.push(focus.authorId == item.authorId);
        });
        getUserDetailMsg(item.authorId).then(res => {
          this.fansList.push(res.data.data);
        });
      });
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
.person-fans {
  .person-fans-content {
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
      .search-input {
        float: right;
        .search-content {
          position: absolute;
          width: 330px;
          height: 30px;
          right: 120px;
          top: 0;
          font-size: 18px;
          outline: none;
        }
        .search-btn {
          position: absolute;
          right: 0;
          top: 0;
          width: 120px;
          height: 36px;
          line-height: 36px;
          color: #fff;
          font-size: 16px;
          text-align: center;
          cursor: pointer;
          background: url("../assets/images/search-btn.png") center no-repeat;
        }
      }
    }
    .not-found-tip {
      margin-top: 30px;
      font-size: 32px;
      font-weight: 500;
    }
    .person-fans-list {
      margin-top: 40px;
      .fans-wrapper {
        position: relative;
        padding-top: 50px;
        height: 180px;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
        a {
          img {
            height: 100px;
            width: 100px;
            border-radius: 50%;
            vertical-align: top;
          }
          cursor: pointer;
        }

        .fans-msg {
          margin-left: 30px;
          display: inline-block;
          height: 100%;
          .fans-name {
            font-size: 24px;
            font-weight: bold;
            color: rgba(18, 18, 18, 1);
            line-height: 50px;
          }
          .fans-other-msg {
            .margin-right40px {
              margin-right: 40px;
            }
            font-size: 14px;
            font-weight: 500;
            color: rgba(91, 91, 91, 1);
            line-height: 50px;
          }
        }
        .operate-btn {
          display: inline-block;
          position: absolute;
          right: 10px;
          top: 90px;
          width: 70px;
          height: 30px;
          background: url("../assets/images/focus-bg.png") center no-repeat;
          background-size: 100%;
          line-height: 30px;
          color: #fff;
          text-align: center;
          cursor: pointer;
          &.isFocus {
            background: none;
            color: #ccc;
            border: 1px solid #ccc;
          }
        }
      }
    }
    .person-page-wrapper {
      text-align: center;
    }
  }
}
</style>

