<template>
  <div class="person-focus">
    <div class="common-head">
      <common-head></common-head>
    </div>
    <div class="person-head">
      <person-head active="3"></person-head>
    </div>
    <div class="person-fans-content">
      <div class="content-head">
        <div class="article-count">
          <span class="title-bg"></span>您关注的博主有
          <span class="red-count">{{allFocusList.length}}</span>位
        </div>
        <div class="search-input">
          <input class="search-content"
            v-model="searchContent" />
          <span class="search-btn"
            @click="search">搜索</span>
        </div>
      </div>
      <div class="person-fans-list"
        v-if="focusList.length > 0">
        <div class="fans-wrapper"
          v-for="(fans,index) in focusList"
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
            <div :class="['operate-btn',focusListFlag[index] ? 'isFocus': '']"
              @click="isFocusBloger(index)">{{focusListFlag[index] ? '已关注':'关注'}}</div>
          </div>
        </div>
      </div>
      <div></div>
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
import { path, getUserDetailMsg, focusBloger, getBlogerFocus } from "@/http.js";
export default {
  data() {
    return {
      path,
      authorId: "", //当前登陆作者id
      allFocusList: [], // 所有被关注者简单信息数组
      focusList: [], // 第一页被关注者详细信息
      focusPart: [], // 第一页被关注者简单信息
      focusListFlag: [], // 第一页被关注者的关注按钮样式决定
      allPage: 0,
      searchContent: "", // 搜索内容,
      focusTip: false
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
      this.allFocusList = result.data.data.focusList;
      // 计算页数
      this.allPage = Math.ceil(this.allFocusList.length / 10);
      //循环获取第一页关注者的详细信息
      this.focusPart = this.allFocusList.slice(0, 10);
      this.focusPart.map(item => {
        // 所有都是已经关注的，所以默认都是已关注
        this.focusListFlag.push(focus.authorId == item.authorId);
        getUserDetailMsg(item.authorId).then(res => {
          this.focusList.push(res.data.data);
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
      // if (!this.searchContent.trim()) {
      //   this.$message("请输入作者名称");
      //   return;
      // }
      //精准查询
      let userResult = await getUserDetailMsg(this.authorId);

      getBlogerFocus(this.authorId, this.searchContent).then(res => {
        let result = res.data.data;
        console.log(result);
        this.allPage = Math.ceil(result.length / 10);
        //循环获取第一页粉丝的详细信息
        this.focusPart = result.slice(0, 10);
        this.focusTip = this.allPage <= 0;
        this.focusListFlag = [];
        this.focusList = [];
        this.focusPart.map(item => {
          this.focusListFlag.push(true);
          // 获取被关注者详细信息
          getUserDetailMsg(item.authorId).then(res => {
            console.log(item);
            this.focusList.push(res.data.data);
          });
        });
      });
    },
    isFocusBloger(index) {
      let obj = {
        _id: this.authorId,
        author: this.focusList[index].author,
        authorId: this.focusList[index].authorId,
        isFocus: !this.focusList[index]
      };
      focusBloger(obj).then(res => {
        this.focusListFlag.splice(index, 1, !this.focusListFlag[index]);
        this.$message({ type: "success", message: "操作成功" });
      });
    },
    // 获取不同页的文章列表
    async getCurrentPageBlogerList(page) {
      this.focusPart = this.allFocusList.slice((page - 1) * 10, page * 10);

      this.focusList = [];
      this.focusListFlag = [];
      this.focusPart.map(item => {
        this.focusListFlag.push(true);
        getUserDetailMsg(item.authorId).then(res => {
          this.focusList.push(res.data.data);
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
.person-focus {
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

