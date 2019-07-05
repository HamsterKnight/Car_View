<template>
  <div class="search_wrapper">
    <div class="search_header">
      <common-head></common-head>
    </div>
    <div class="search_content">
      <div class="search_input_nav">
        <el-input v-model="searchContent"></el-input><button class="search_btn"
          @click="search">搜索</button>
      </div>
      <div class="search_main_content">
        <div class="search_main_nav">
          <p class="search_title"><i class="img"></i>搜索<span class="redColor">“{{tempContent}}”</span>的结果</p>
        </div>
        <div class="search_list">
          <div class="search_list_left">
            <ul>
              <li v-if="articleList.length <= 0"
                class="seacr_no">暂时没有该类文章</li>
              <li v-for="(article, index) in articleList"
                :key="index"
                class="search_list_left_li">
                <div class="
                img_wrapper">
                  <a :href="`/articleDetail/${article._id}`">
                    <img :src="`${path}${article.articlePic}`"
                      alt="文章图片">
                  </a>

                </div>
                <div class="search_item">
                  <a :href="`/articleDetail/${article._id}`">
                    <p class="search_title"
                      v-if="article.articleTitle !== 'hobbies'"
                      v-html="article.articleTitle"></p>
                  </a>
                  <div class="search_line">
                    <span class="one"></span><span class="two"></span>
                  </div>
                  <a :href="`/articleDetail/${article._id}`">
                    <div class="des"
                      v-html="article.articleDigest">
                    </div>
                  </a>
                  <div class="userMsg">
                    <div class="avatar"
                      @click.stop="toBloger(article.authorId)">
                      <div>
                        <img v-if="article.authorAvatar"
                          :src="` ${path}${article.authorAvatar}`"
                          alt="用户头像图片">
                        <img v-else
                          src="../assets/images/avater-icon.png"
                          alt="用户头像图片">
                        <span class="name">{{article.author}}</span>
                      </div>
                      <span class="search_line">|</span>
                    </div>
                    <div class="channel">{{article.channelName}}</div>
                    <div class="time"
                      v-text="article.createTime.slice(2,10)"></div>
                  </div>
                </div>
              </li>
              <li class="page-wrapper"
                v-if="articleList.length>0">
                <page :limit="10"
                  :page-count="allPage"
                  @pageChange="handleCurrentChange"></page>
              </li>
            </ul>
          </div>
          <div class="search_list_right">
            <ul class="search_list_ul">
              <li class="search_ad">
                <img src="../assets/images/ad1.png"
                  alt="广告图片">
              </li>
              <li class="search_ad">
                <img src="../assets/images/banner.png"
                  alt="广告图片">
              </li>
              <li class="search_ad">
                <img src="../assets/images/ad1.png"
                  alt="广告图片">
              </li>
              <li class="search_ad">
                <img src="../assets/images/banner.png"
                  alt="广告图片">
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import commonHead from "@/components/header";
import page from "@/components/page.vue";
import { path, searchArticle } from "@/http.js";
export default {
  name: "search",

  metaInfo: {
    // 设置 title
    title: "search列表",
    // 设置 meta
    meta: [
      {
        name: "keyWords",
        content: "vue "
      }
    ],
    // 设置 link
    link: [
      {
        rel: "asstes",
        href: "https://assets-cdn.github.com/"
      }
    ]
  },
  async mounted() {
    this.searchContent = this.$route.params.searchContent;
    this.tempContent = this.$route.params.searchContent;
    searchArticle(this.searchContent).then(res => {
      this.articleList = res.data.data;
      this.allPage = res.data.allPage;
    });
  },
  data() {
    return {
      path,
      searchObj: {},
      pageObj: {},
      articleList: [],
      searchContent: "",
      tempContent: "",
      defaultParams: {
        pageSize: "6",
        pageNo: "1"
      },
      type: "w"
    };
  },
  methods: {
    isAddBg(i) {
      if (i < 3) {
        return "search_special";
      } else {
        return "";
      }
    },
    toBloger(id) {
      this.$router.push(`/blogerDetail/${id}`);
    },
    handleCurrentChange(val) {
      /* this.defaultParams.page = val */
      this.$router.push({
        path: `/search/${this.searchContent}/${val}`
      });
      searchArticle(this.$route.params.searchContent, val).then(res => {
        this.articleList = res.data.data;
        this.allPage = res.data.allPage;
      });
    },
    // 执行搜索方法
    search() {
      if (!this.searchContent) {
        this.$message("请输入搜索内容");
      }
      this.defaultParams.page = this.$route.params.page || "1";
      this.tempContent = this.searchContent;
      this.$router.push({ path: `/search/${this.searchContent}/1` });
      searchArticle(this.searchContent).then(res => {
        this.articleList = res.data.data;
        this.allPage = res.data.allPage;
      });
    }
  },
  components: {
    "common-head": commonHead,
    page
  }
};
</script>
<style lang="less">
.search_wrapper {
  background: #f6f6f6;
  .search_content {
    margin: 0 auto;
    width: 1200px;
    background: #f6f6f6;
    .search_input_nav {
      position: relative;
      display: inline-block;
      margin-top: 46px;
      width: 800px;
      height: 50px;
      .el-input {
        width: 680px;
        height: 100%;
        input {
          width: 100%;
          height: 100%;
          color: #000;
          box-sizing: border-box;
          &:focus {
            border-color: #be001e;
          }
          &:hover {
            border-color: #be001e;
          }
        }
      }
      .search_btn {
        position: relative;
        margin-left: -10px;
        margin-top: -4px;
        width: 120px;
        height: 100%;
        border: none;
        cursor: pointer;
        box-sizing: border-box;
        outline: none;
        line-height: 50px;
        vertical-align: middle;
        color: #fff;
        background: url("../assets/images/search-btn.png") no-repeat !important;
      }
    }
    .search_des {
      position: relative;
      width: 100%;
      height: 200px;
      padding: 28px 0 0 0;
      background: #fff;
      &:after {
        content: "";
        display: block;
        clear: both;
      }
      .search_des_img {
        float: left;
        margin: 0 11px 27px 9px;
        width: 180px;
        height: 135px;
        background: #777;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .search_des_content {
        position: absolute;
        right: -10px;
        bottom: -10px;
        margin: 10px 0 0 10px;
        width: 990px;
        height: 160px;
        box-sizing: border-box;
        border-right: 10px solid #be001e;
        border-bottom: 10px solid #be001e;
        .search_title {
          height: 24px;
          font-size: 24px;

          font-weight: bold;
          color: rgba(18, 18, 18, 1);
          line-height: 24px;
        }
        .search_description {
          padding-right: 45px;
          width: 990px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(91, 91, 91, 1);
          line-height: 24px;
        }
      }
    }
    .search_main_content {
      background: #f6f6f6;
      .search_main_nav {
        padding-top: 40px;
        background: #f6f6f6;
        .search_title {
          margin-bottom: 31px;
          height: 42px;
          font-size: 26px;

          vertical-align: top;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
          line-height: 42px;
          .img {
            display: inline-block;
            margin-right: 15px;
            vertical-align: top;
            width: 8px;
            height: 42px;
            background: url("../assets/images/hot-news.png") no-repeat center;
          }
          .redColor {
            color: #c63f4e;
          }
        }
      }
      .search_list {
        position: relative;
        &:after {
          content: "";
          display: block;
          clear: both;
        }
        width: 1200px;
        .search_list_left {
          float: left;
          width: 820px;
          padding-right: 30px;
          box-sizing: border-box;
          .seacr_no {
            font-size: 18px;
          }
          .page-wrapper {
            text-align: center;
          }
          .search_list_left_li {
            margin-bottom: 30px;
            width: 100%;
            height: 280px;
            overflow: hidden;
            cursor: pointer;
            &:last-child {
              margin-bottom: 0;
            }
            .img_wrapper {
              float: left;
              width: 380px;
              height: 100%;
              a {
                img {
                  width: 100%;
                  height: 100%;
                }
              }
            }
            .img_wrapper:hover + .search_item {
              .search_title {
                color: #be001e;
              }
            }
            .search_item {
              position: relative;
              display: inline-block;
              padding: 29px 42px 30px 40px;
              box-sizing: border-box;
              background: #fff;
              width: 410px;
              height: 100%;
              a {
                .search_title {
                  margin: 0 auto;
                  width: 328px;
                  height: 26px;
                  font-size: 26px;
                  font-weight: 600;
                  color: rgba(18, 18, 18, 1);
                  line-height: 26px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  &:hover {
                    color: #be001e;
                  }
                }
              }

              .search_line {
                position: relative;
                width: 100%;
                height: 65px;
                .one {
                  position: absolute;
                  width: 65px;
                  height: 1px;
                  border-top: 1px solid #ccc;
                }
                .one {
                  position: absolute;
                  left: 10px;
                  top: 30px;
                  width: 45px;
                  height: 1px;
                  border-top: 1px solid #ccc;
                }
                .two {
                  position: absolute;
                  width: 45px;
                  height: 1px;
                  left: 20px;
                  top: 32px;
                  border-top: 1px solid #ccc;
                }
              }
              a {
                .des {
                  width: 331px;
                  height: 38px;
                  font-size: 14px;
                  font-weight: 400;
                  color: rgba(18, 18, 18, 1);
                  text-overflow: -o-ellipsis-lastline;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                  &:hover {
                    color: #be001e;
                  }
                }
              }
            }
            .userMsg {
              margin-top: 67px;
              height: 25px;
              width: 100%;
              font-size: 14px;
              div {
                display: inline-block;
              }
              .avatar {
                max-width: 120px;
                padding-right: 25px;
                height: 25px;
                cursor: pointer;
                vertical-align: top;
                &::after {
                  content: "";
                  display: "block";
                  clear: both;
                }
                div {
                  display: inline-block;
                }
                img {
                  margin-right: 6px;
                  width: 25px;
                  height: 25px;
                  border-radius: 50%;
                  vertical-align: top;
                }
                .name {
                  display: inline-block;
                  vertical-align: top;
                  font-size: 14px;
                  font-weight: 300;
                  max-width: 80px;
                  cursor: pointer;
                  color: rgba(177, 177, 177, 1);
                  line-height: 25px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
                .search_line {
                  float: right;
                  margin-left: 10px;
                  width: 1px;
                  height: 11px;
                  line-height: 25px;
                  color: rgba(177, 177, 177, 1);
                }
              }
              .channel,
              .time {
                color: rgba(177, 177, 177, 1);
                line-height: 25px;
              }
              .channel {
                max-width: 90px;
              }
              .time {
                float: right;
              }
            }
          }
        }
        .search_list_right {
          position: relative;
          display: inline-block;
          width: 380px;
          .search_list_ul {
            .search_ad {
              position: relative;
              margin-bottom: 30px;
              height: 280px;
              background-color: #e7e7e7;
              background-image: url("/static/images/defaultLogo.png");
              background-repeat: no-repeat;
              background-position: center;
              img {
                width: 100%;
                height: 100%;
              }
              .ad_des {
                position: absolute;
                right: 10px;
                bottom: 10px;
                width: 40px;
                border: 1px solid rgba(255, 255, 255, 0.5);
                background: transparent;
                text-align: center;
                font-size: 14px;
                cursor: pointer;
                color: rgba(255, 255, 255, 0.5);
                line-height: 20px;
              }
            }
          }
        }
      }
    }
    .advertise_wrapper {
      position: relative;
      margin: 20px 0;
      width: 100%;
      height: 200px;
      background-color: #e7e7e7;
      background-image: url("/static/images/defaultLogo.png");
      background-repeat: no-repeat;
      background-position: center;
      .ad_des {
        position: absolute;
        right: 10px;
        bottom: 10px;
        width: 40px;
        border: 1px solid rgba(255, 255, 255, 0.5);
        background: transparent;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
        color: rgba(255, 255, 255, 0.5);
        line-height: 20px;
      }
    }
    .advertise_wrapper > a {
      display: block;
      width: 100%;
      height: 100%;
    }
    .advertise_wrapper > a > img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .el-tabs__nav-scroll {
    width: 360px !important;
    box-sizing: border-box;
    padding: 10px 7px !important;
  }
  .el-tabs__nav-wrap::after {
    width: 100%;
    height: 0;
    border: 1px solid #000;
  }
  .el-tabs__active-bar {
    width: 90px !important;
    height: 6px;
    top: 110%;
    margin-left: -8px;
    background: url("/static/images/tag_scroll.png") no-repeat !important;
  }
  .btn-prev,
  .btn-next {
    width: 80px;
    height: 40px;
    color: #000 !important;
    background: rgba(255, 255, 255, 1) !important;
    box-shadow: 0px 3px 0px 0px rgba(228, 228, 228, 1) !important;
  }
  .btn-prev:hover,
  .btn-next:hover {
    color: #fff !important;
    background: #000 !important;
    box-shadow: 0px 3px 0px 0px rgb(180, 32, 32) !important;
  }
  .el-pagination {
    margin: 30px auto;
    color: #000;
    text-align: center;
  }
  .el-pager {
    .number,
    li.btn-quicknext,
    li.more {
      width: 40px;
      height: 40px;
      color: #000;
      line-height: 40px;
      background: rgba(255, 255, 255, 1) !important;
      box-shadow: 0px 3px 0px 0px rgb(228, 228, 228, 1) !important;
      &.active {
        background: #000 !important;
        box-shadow: 0px 3px 0px 0px rgb(180, 32, 32) !important;
      }
    }
  }
  #ad_1 {
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
