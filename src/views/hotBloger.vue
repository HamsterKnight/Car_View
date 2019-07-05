<template>
  <div class="bloger-wrapper">
    <div class="common-header">
      <common-head index="5"></common-head>
    </div>
    <div class="bloger-header">
    </div>
    <div class="bloger-content-wrapper"
      v-for="(bloger, index) in blogerList"
      :key="index">
      <div class="bloger-left-msg"
        v-if="bloger">
        <div class="bloger-left-img">
          <img v-if="!bloger.authorAvatar"
            src="../assets/images/avater-icon.png">
          <img v-else
            :src="`${path}${bloger.authorAvatar}`"
            alt="">
          <div class="bloger-name">{{bloger.author}}</div>
        </div>
        <div class="bloger-left-focus">
          <span :class="['operate', focusListFlag[index] ? 'isFocus' :'']"
            @click.stop.prevent="handleFocusBloger(index)">{{focusListFlag[index] ? '已关注' : '关注'}}</span>
        </div>
        <div class="bloger-other-msg">
          <div class="article-count">
            <span class="word">粉丝</span>
            <span class="count">{{bloger.fensCount}}</span>
          </div>
          <div class="article-count">
            <span class="word">关注</span>
            <span class="count">{{bloger.focusCount}}</span>
          </div>
          <div class="article-count">
            <span class="word">文章</span>
            <span class="count">{{bloger.articleCount}}</span>
          </div>
        </div>
      </div>
      <div class="bloger-right-msg"
        v-if="articleList[index]">
        <img class="bloger-content-img"
          :src="`${path}${articleList[index].articlePic}`"
          alt="">
        <div class="bloger-right-content">
          <div class="bloger-article-title">{{articleList[index].isHobbies ? articleList[index].articleContent : articleList[index].articleTitle }}</div>
          <div class="bloger-article-line"></div>
          <div class="bloger-ariticle-digest">{{articleList[index].articleDigest}}</div>
          <div class="bloger-msg">
            <img class="bloger-avatar"
              v-if="!bloger.authorAvatar"
              src="../assets/images/avater-icon.png">
            <img v-else
              class="bloger-avatar"
              :src="`${path}${bloger.authorAvatar}`"
              alt="">
            <div class="bloger-name">{{bloger.author}}</div>
            <span class="bloger-line"></span>
            <span class="bloger-channel">{{articleList[index].channelName}}</span>
            <span class="bloger-create-time">{{articleList[index].updateTime.slice(0,10)}} </span>
          </div>
        </div>
      </div>
    </div>
    <div class="hot-bloger-page">
      <page v-if="allPage"
        :limit="10"
        @pageChange="getNewBlogerList"
        :page-count="allPage"></page>
    </div>
  </div>
</template>
<script>
import head from "@/components/header.vue";
import page from "@/components/page.vue";
import {
  path,
  getHotBloger,
  getBlogerHotArticle,
  getUserDetailMsg,
  focusBloger
} from "@/http.js";
export default {
  data() {
    return {
      path: path,
      blogerList: [],
      articleList: [],
      focusListFlag: [],
      allPage: 1
    };
  },
  async created() {
    this.__init();
  },
  methods: {
    // 判断博主的关注状态
    async focusList() {
      let msg = localStorage.getItem("userMsg")
        ? localStorage.getItem("userMsg")
        : this.getCookie("userMsg")
        ? this.getCookie("userMsg")
        : "";
      // 判断用户是否已登陆
      let tempArr = [];
      if (msg) {
        this._id = JSON.parse(msg)[0].authorId;
        //当前登陆用户id和当前文章作者id对比
        let result = await getUserDetailMsg(this._id);
        // 博主已关注列表
        let focusList = result.data.data.focusList;
        for (let i = 0; i < this.blogerList.length; i++) {
          let blogerFlag = false;
          for (let j = 0; j < focusList.length; j++) {
            if (focusList[j].authorId == this.blogerList[i].authorId) {
              tempArr.push(true);
              blogerFlag = true;
              // true表示已关注
            }
          }
          if (!blogerFlag) {
            tempArr.push(false);
          }
        }
        this.focusListFlag = tempArr;
      }
    },
    // 关注或取关
    handleFocusBloger(index) {
      if (this._id == this.blogerList[index].authorId) {
        this.$message("不能关注自己");
        return false;
      }
      if (this._id) {
        let obj = {
          _id: this._id,
          author: this.blogerList[index].author,
          authorId: this.blogerList[index].authorId,
          isFocus: !this.focusListFlag[index]
        };
        focusBloger(obj).then(res => {
          console.log(this.focusListFlag);
          this.focusListFlag.splice(index, 1, !this.focusListFlag[index]);
        });
      } else {
        this.$message("请先登录");
      }
    },
    async getNewBlogerList(page) {
      this.__init(page);
    },

    // 获取cookie
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    },
    async __init(page = 1) {
      let result = await getHotBloger(page);
      this.blogerList = result.data.data;
      this.allPage = result.data.allPage;
      // 获取每个作者的文章
      result.data.data.map(item => {
        getBlogerHotArticle(item.authorId).then(res => {
          this.articleList.push(res.data.data);
        });
        return item;
      });
      this.focusList();
    }
  },
  components: {
    "common-head": head,
    page
  }
};
</script>

<style lang="less">
.bloger-wrapper {
  position: relative;
  width: 100%;
  .common-header {
    width: 100%;
  }
  .bloger-header {
    height: 490px;
    background: url("../assets/images/bloger-header.png") center no-repeat;
    background-position: top;
  }
  .bloger-content-wrapper {
    margin: 30px auto 0 auto;
    width: 1200px;
    .bloger-left-msg {
      position: relative;
      display: inline-block;
      width: 410px;
      height: 280px;
      vertical-align: top;
      background-color: #fff;
      .bloger-left-img {
        margin-top: 30px;
        text-align: center;
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          cursor: pointer;
        }
        .bloger-name {
          margin: 11px 0;
          height: 16px;
          font-size: 16px;
          font-weight: 500;
          color: rgba(18, 18, 18, 1);
          line-height: 24px;
        }
      }
      .bloger-left-focus {
        text-align: center;
        .operate {
          display: inline-block;
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
      .bloger-other-msg {
        margin-top: 27px;
        text-align: center;
        vertical-align: top;

        .article-count {
          display: inline-block;
          width: 100px;
          margin-right: 20px;
          &:nth-child(3) {
            margin-right: 0;
          }
          .word {
            display: inline-block;
            width: 100px;
            font-size: 14px;
          }
          .count {
            margin-top: 5px;
            display: inline-block;
            max-width: 100px;
            font-size: 16px;
            font-weight: bold;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    .bloger-right-msg {
      position: relative;
      display: inline-block;
      width: 790px;
      height: 280px;
      background-color: #fff;
      .bloger-content-img {
        width: 380px;
        height: 280px;
        vertical-align: top;
      }
      .bloger-right-content {
        position: relative;
        display: inline-block;
        width: 410px;
        height: 280px;
        padding: 29px 40px 0 40px;
        box-sizing: border-box;

        .bloger-article-title {
          width: 350px;
          height: 30px;
          font-size: 26px;
          line-height: 30px;
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
          &:hover {
            color: #be001e;
          }
        }
        .bloger-article-line {
          margin-top: 30px;
          height: 4px;
          width: 40px;
          background: url("../assets/images/bloger-article-line.png") center
            no-repeat;
        }
        .bloger-ariticle-digest {
          margin-top: 31px;
          width: 350px;
          height: 38px;
          font-size: 14px;
          line-height: 19px;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          cursor: pointer;
          &:hover {
            color: #be001e;
          }
        }
        .bloger-msg {
          margin-top: 71px;
          .bloger-avatar {
            margin-right: 8px;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            line-height: 25px;
            cursor: pointer;
          }
          .bloger-name {
            display: inline-block;
            font-size: 14px;
            max-width: 100px;
            font-weight: 300;
            line-height: 25px;
            color: rgba(0, 0, 0, 0.5);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
          }
          .bloger-line {
            margin: 0 19px;
            display: inline-block;
            vertical-align: 5px;
            height: 14px;
            border-right: 1px solid #ccc;
            line-height: 25px;
          }
          .bloger-channel {
            margin-right: 43px;
            height: 25px;
            width: 43px;
            font-size: 14px;
            font-weight: 300;
            color: rgba(0, 0, 0, 0.5);
            line-height: 25px;
            vertical-align: 5px;
          }
          .bloger-create-time {
            height: 25px;
            font-size: 14px;
            font-weight: 300;
            color: rgba(0, 0, 0, 0.5);
            line-height: 25px;
            vertical-align: 5px;
          }
        }
      }
    }
  }
  .hot-bloger-page {
    text-align: center;
  }
}
</style>
