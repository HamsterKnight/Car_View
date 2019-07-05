<template>
  <div class="interest-container">
    <nav-header index="5"></nav-header>
    <div class="interest-header-swiper">
      <coursel :banner-list="interestBannerList"
        swiper-name="new-swiper"></coursel>
    </div>
    <div class="interest-title">
      <indexHeaderTitle title="兴趣部落"
        alpha-title="HOBBIES"
        retangle-type="0"></indexHeaderTitle>
    </div>
    <div class="tag-wrapper">
      <tag v-for="(tag, index) in tagList "
        :key="index"
        :tag-obj="tag"> </tag>
    </div>
    <div class="interest-content">
      <div class="interest-tabs">
        <el-tabs v-model="activeName"
          @tab-click="handleClick">
          <el-tab-pane label="最新"
            name="latest">
            <hobbies-article class="hobbies-pulling"
              v-for="(article, index) in articleList"
              :key="index"
              :article-obj="article"></hobbies-article>
            <div class="interest-page-wrapper">
              <page v-if="allPage"
                :limit="9"
                @pageChange="getNewPageArticleList"
                :page-count="allPage"></page>
            </div>
          </el-tab-pane>
          <el-tab-pane label="最热"
            name="hots">
            <hobbies-article class="hobbies-pulling"
              v-for="(article, index) in articleList"
              :key="index"
              :article-obj="article"></hobbies-article>
            <div class="interest-page-wrapper">
              <page v-if="allPage"
                :limit="9"
                @pageChange="getNewPageArticleList"
                :page-count="allPage"></page>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="interest-bloger"
        v-if="blogerList.length > 0">
        <div class="interest-bloger-header-bg">
          <span class="bloger-header-bg"></span> <span class="tip">热门博主</span> <span class="operate-btn"> <a href="/hotBloger"> 更多></a></span>
        </div>
        <div class="interest-bloger-content"
          v-for="(bloger, index) in blogerList"
          :key="index">
          <a :href="`/blogerDetail/${bloger.authorId}`">
            <img v-if="!bloger.authorAvatar"
              class="bloger-avatar"
              src="../assets/images/avater-icon.png">
            <img v-else
              class="bloger-avatar"
              :src="`${path}${bloger.authorAvatar}`">
            <span class="bloger-name">{{bloger.author}}</span>
            <span :class="['operate-btn', focusListFlag[index] ? 'isFocus' :'']"
              @click.stop.prevent="handleFocusBloger(index)">{{focusListFlag[index] ? '已关注' : '关注'}}</span>
          </a>
        </div>
      </div>
    </div>
    <div class="adImg-wrapper">
      <adImg></adImg>
    </div>
  </div>
</template>
<script>
import header from "@/components/header.vue";
import BigCoursel from "@/components/BigCoursel.vue";
import indexHeaderTitle from "@/components/indexContainer/indexHeaderTitle.vue";
import tag from "@/components/indexContainer/tag.vue";
import hobbiesArticle from "@/components/hobbiesArticle.vue";
import columnCoursel from "@/components/columnCoursel.vue";
import page from "@/components/page.vue";
import adImg from "@/components/adImg.vue";
import {
  path,
  getBannerList,
  getChannelArticleList,
  getChannelTag,
  getHotOrLatesHobbiesArticleList,
  getHotBlogerList,
  getUserDetailMsg,
  focusBloger
} from "@/http.js";
export default {
  data() {
    return {
      path: path,
      interestBannerList: [],
      articleList: [],
      msgObj: {},
      blogerList: [],
      focusListFlag: [],
      activeName: "latest",
      tagList: [
        { tagName: "流浪剑客" },
        { tagName: "流浪剑客" },
        { tagName: "流浪剑客" },
        { tagName: "流浪剑客" },
        { tagName: "流浪剑客" },
        { tagName: "流浪剑客" },
        { tagName: "流浪剑客" },
        { tagName: "流浪剑客" },
        { tagName: "流浪剑客" },
        { tagName: "流浪剑客" }
      ],
      page: 1,
      isHot: true,
      allPage: null
    };
  },
  async created() {
    let res = await getBannerList("firstChannel", "5");
    this.interestBannerList = res.data.data;
    // let tagList = await getChannelTag(2);
    // this.tagList = tagList.data.data;
    this.__init(this.isHot, this.page);
    // 获取热门博主列表
    getHotBlogerList().then(res => {
      this.blogerList = res.data.data;
      this.focusList();
    });
    let tagList = await getChannelTag(5);
    this.tagList = tagList.data.data;
  },
  components: {
    "nav-header": header,
    coursel: BigCoursel,
    indexHeaderTitle,
    tag,
    "hobbies-article": hobbiesArticle,
    columnCoursel,
    page,
    adImg
  },

  methods: {
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
          this.focusListFlag.splice(index, 1, !this.focusListFlag[index]);
        });
      } else {
        this.$message("请先登录");
      }
    },
    getNewPageArticleList(page) {
      this.__init(this.isHot, page);
    },
    handleClick() {
      this.page = 1;
      let isHot = this.activeName === "latest";
      this.__init();
    },
    // 获取最新或最热文章
    async __init(isHot, page) {
      let result = await getHotOrLatesHobbiesArticleList(isHot, page);
      this.articleList = result.data.data;
      this.allPage = result.data.allPage;
    },
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
.interest-container {
  position: relative;
  width: 100%;
  .interest-header-swiper {
    position: relative;
    width: 100%;
    height: 580px;
  }
  .interest-title {
    margin: 0 auto;
    width: 1200px;
  }
  .tag-wrapper {
    margin: 0 auto;
    width: 1200px;
    text-align: center;
  }
  .interest-content {
    margin: 20px auto 0 auto;
    position: relative;
    width: 1200px;
    .interest-tabs {
      display: inline-block;
      position: relative;
      width: 790px;
      #tab-latest,
      #tab-hots {
        font-size: 18px;
        font-weight: 500;
      }
      .is-active {
        color: rgba(190, 0, 30, 1);
      }
      .el-tabs__active-bar {
        background: #be001e;
      }
    }
    .interest-bloger {
      margin-left: 20px;
      margin-top: 55px;
      display: inline-block;
      width: 381px;
      vertical-align: top;
      background-color: #fff;
      overflow: hidden;
      .interest-bloger-header-bg {
        position: relative;
        padding: 35px 0 20px 35px;
        overflow: hidden;
        .bloger-header-bg {
          display: inline-block;
          width: 8px;
          height: 27px;
          float: left;
          background: url("../assets/images/hot-news.png") no-repeat;
        }
        .tip {
          height: 100%;
          display: inline-block;
          font-size: 22px;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
          line-height: 27px;
          margin-left: 15px;
        }
        .operate-btn {
          font-size: 14px;
          font-weight: 400;
          color: #999;
          position: absolute;
          right: 5px;
          top: 40px;
          cursor: pointer;
          a {
            color: #999;
            &:hover {
              color: #be001e;
            }
          }
        }
      }
      .interest-bloger-content {
        padding: 25px 0 0 35px;
        a {
          display: inline-block;
          width: 320px;
          height: 52px;
          padding-bottom: 15px;
          border-bottom: 1px solid #ccc;
          .bloger-avatar {
            margin-right: 21px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            vertical-align: top;
          }
          .bloger-name {
            display: inline-block;
            width: 160px;
            height: 50px;
            font-size: 16px;
            font-weight: 500;
            color: rgba(0, 0, 0, 1);
            line-height: 50px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .operate-btn {
            display: inline-block;
            width: 70px;
            height: 32px;
            text-align: center;
            vertical-align: 15px;
            line-height: 32px;
            cursor: pointer;
            background: url("../assets/images/article-type-bg.png") center
              no-repeat;
            &.isFocus {
              background: none;
              border: 1px solid #ccc;
              color: #999;
            }
          }
        }
      }
    }
  }
  .adImg-wrapper {
    margin-top: 60px;
  }
  .interest-page-wrapper {
    text-align: center;
    .my-pagination {
      display: inline-block;
    }
  }
}
</style>

