<template>
  <div class="article-detail">
    <div class="common-head">
      <common-head></common-head>
    </div>
    <div class="article-content">
      <div class="article-content-left">
        <div class="article-msg-content"
          v-if="articleObj">
          <div class="draft-bg"
            v-if="articleObj.state == 2"></div>
          <div class="article-title-wrapper">
            <span class="article-type-bg">{{articleObj.articleType == 1 ? '原创' : (articleObj.articleType == 2 ? '转载':'翻译')}}</span>
            <span class="article-title">{{articleObj.articleTitle}}</span>
          </div>
          <div class="article-author-msg">
            <img v-if="articleObj.authorAvatar"
              class="article-author-avatar"
              :src="`${path}${articleObj.authorAvatar}`">
            <img v-else
              class="article-author-avatar"
              src="../assets/images/avater-icon.png" />

            <span class="article-author-name">{{articleObj.author}}</span>
            <span class="line"></span>
            <span class="article-author-channel">{{articleObj.channelName}}</span>
            <span class="article-create-time">发布时间：{{createTime}}</span>
          </div>
          <div class="article-content-detail">
            <div v-html="articleObj.articleContent"></div>
            <div class="article-video"
              v-if="articleObj.articleVideo">
              <video :src="`${path}${articleObj.articleVideo}`"
                controls></video>
            </div>
            <div class="article-tag-wrapper">
              <span class="tip">标签</span>
              <tag v-for="(tag, index) in articleObj.articleTag "
                :key="index"
                :tag-obj="{'tagName':tag}"> </tag>
            </div>
          </div>
        </div>
        <div class="article-hot-msg">
          <div class="article-hot-msg-title">
            <span class="hot-msg-bg">相关作品</span>
          </div>
          <div class="article-hot-article-list">
            <div :class="['article-hot-article-item', (index == 3 || index == 7) ? 'margin-right0' : '', index <= 3? 'margin-bottom-10px': '']"
              v-for="(item, index) in similarArticleList"
              :key="index">
              <a :href="`/articleDetail/${item._id}`">
                <img :src="`${path}${item.articlePic}`"
                  alt="">
              </a>
              <div class="msg">
                <div class="title">{{item.articleTitle ?item.articleTitle: item.articleContent}}</div>
                <div class="author-msg">
                  <a :href="`/blogerDetail/${item.authorId}`">
                    <img v-if="!item.authorAvatar"
                      src="../assets/images/avater-icon.png"
                      alt="">
                    <img v-else
                      :src="`${path}${item.authorAvatar}`"
                      alt="">
                  </a>
                  <span class="name">{{item.author}}</span>
                  <span class="line"></span>
                  <span class="channel">{{item.channelName}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="article-comment">
          <div class="article-hot-msg-title">
            <span class="hot-msg-bg">发表评论</span>
            <span class="comment-tip">文明上网理性发言，请遵守评论服务协议</span>
          </div>
          <div class="article-comment-content">
            <!-- 已登录 -->
            <div class="comment-wrapper"
              v-if="loginFlag">
              <div class="article-author"
                v-if="loginObj">
                <a :href="`/blogerDetail/${loginObj.authorId}`">
                  <img v-if="!loginObj.authorAvatar"
                    class="author-avatar"
                    src="../assets/images/avater-icon.png"
                    alt="">
                  <img v-else
                    :src="`${path}${loginObj.authorAvatar}`"
                    alt="">
                </a>
                <span class="author-name">{{loginObj.author}}</span>
              </div>
              <textarea v-model="comment"
                placeholder="请输入评论内容"
                class="article-comment-area">
              </textarea>
              <button class="operate-btn"
                @click="publishComment">发表评论</button>
            </div>
            <!-- 未登录 -->
            <div class="comment-wrapper"
              v-else>
              <div class="article-author">
                <img class="author-avatar"
                  src="../assets/images/avater-icon.png"
                  alt="">
                <!-- <img src="" alt=""> -->
                <span class="author-name">游客</span>
              </div>
              <div class="article-comment-area">
                <span class="tip">登陆后可以发表评论</span>
              </div>
              <button class="operate-btn"> <a href="/login">登陆</a> </button>
            </div>
            <div class="comment-list"
              v-if="commentList.length > 0">
              <div class="comment-count"><span class="tip">全部评论</span><span class="count">{{commentList.length}}条</span></div>
              <div class="comment"
                v-for="(itemComment ,index) in commentContent"
                :key="index">
                <div class="avatar">
                  <a :href="`/blogerDetail/${itemComment.authorId}`">
                    <img v-if="!itemComment.authorAvatar"
                      src="../assets/images/avater-icon.png"
                      alt="">
                    <img v-if="itemComment.authorAvatar"
                      :src="`${path}${itemComment.authorAvatar}`">
                  </a>
                </div>
                <div class="author-msg">
                  <div class="author-name"><span class="name">{{itemComment.author}}</span><span class="creatTime">{{commentList[index].createTime}}</span> </div>
                  <div class="content">{{commentList[index].comment}}</div>
                </div>

              </div>
              <div style="text-align:center">
                <page :page-count="allPage"
                  @pageChange="changeCommentList"></page>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="article-content-right">
        <div class="bloger-msg"
          v-if="authorMsg">
          <div class="bloger-right-bottom-bg"></div>
          <a :href="`/blogerDetail/${authorMsg.authorId}`">
            <img v-if="authorMsg.authorAvatar"
              :src="`${path}${authorMsg.authorAvatar}`"
              alt="">
            <img v-else
              src="../assets/images/avater-icon.png"
              alt="">
          </a>
          <span class="name">{{authorMsg.author}}</span>
          <div class="bloger-operate">
            <span :class="[ 'article-focus',focusFlag ? '' :'article-btn']"
              @click="isFocusBloger">{{focusTip}}</span>
          </div>
          <div class="bloger-count">
            <div class="count">
              <div class="tip">粉丝</div>
              <div class="number">{{authorMsg.fensCount}}</div>
            </div>
            <div class="count">
              <div class="tip">关注</div>
              <div class="number">{{authorMsg.focusCount}}</div>
            </div>
            <div class="count">
              <div class="tip">文章</div>
              <div class="number">{{authorMsg.articleCount}}</div>
            </div>

          </div>
        </div>
        <div class="bloger-other-msg">
          <div class="bloger-ohter-msg-title">
            <div class="ohter-msg-title-content"><span class="tip">热门作品</span>
              <!-- <span class="operate">换一换</span>-->
            </div>
            <div class="bloger-article-list">
              <div class="item"
                v-for="(item, index) in hotArticleList"
                :key="index">
                <a :href="`/articleDetail/${item._id}`">
                  <div class="item-img">
                    <img :src="`${path}${item.articlePic}`">
                  </div>
                  <div class="item-msg">
                    <div class="title">{{item.articleTitle}}</div>
                    <div class="time">{{item.createTime.slice(0,10)}}</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="bloger-other-msg">
          <div class="bloger-ohter-msg-title">
            <div class="ohter-msg-title-content"><span class="tip">更多作品/随机推荐</span><span class="operate"
                @click="changeList">换一换</span></div>
            <div class="bloger-article-list">
              <div class="item"
                v-for="(item, index) in randomList"
                :key="index">
                <a :href="`/articleDetail/${item._id}`">
                  <div class="item-img">
                    <img :src="`${path}${item.articlePic}`">
                  </div>
                  <div class="item-msg">
                    <div class="title">{{item.articleTitle}}</div>
                    <div class="time">{{item.createTime.slice(0,10)}}</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import header from "@/components/header.vue";
import tag from "@/components/indexContainer/tag.vue";
import page from "@/components/page.vue";
import {
  path,
  getArticleDetail,
  focusBloger,
  getUserDetailMsg,
  publishArticleComment,
  getCommentAuthorMsg,
  getBlogerHotestArticleList,
  getBlogerSimilarArticle,
  getRandomArticle
} from "@/http.js";
export default {
  data() {
    return {
      path,
      tagObj: {
        tagName: "流浪剑客"
      },
      _id: "", //保存登陆用户作者id
      articleObj: null,
      authorMsg: null,
      focusFlag: false, //表示未关注
      loginFlag: false, //登陆标志,
      comment: "", //评论内容,
      commentList: [], //所有评论列表作者id,
      commentListPart: [], //部分评论列表
      commentContent: [], //评论列表详细信息,
      loginObj: null,
      allPage: 1,
      hotArticleList: [],
      similarArticleList: [],
      randomList: []
    };
  },
  async created() {
    let id = this.$route.params.id;
    let article = await getArticleDetail(id); // 获取当前文章详细信息
    this.commentList = article.data.data.articleCommentList; // 评论列表
    this.commentListPart = this.commentList.slice(0, 10);
    this.allPage = Math.ceil(this.commentList.length / 10);
    this.commentListPart.map(item => {
      getCommentAuthorMsg(item.authorId).then(res => {
        this.commentContent.push(res.data.author);
      });
    });
    this.articleObj = article.data.data;
    let result = await getUserDetailMsg(this.articleObj.authorId);
    this.authorMsg = result.data.data; //文章作者信息
    getBlogerHotestArticleList(this.authorMsg.authorId).then(res => {
      this.hotArticleList = res.data.data;
    });
    getBlogerSimilarArticle(this.authorMsg.authorId).then(res => {
      this.similarArticleList = res.data.data;
    });
    getRandomArticle().then(res => {
      this.randomList = res.data.data;
    });
    this.__init();
  },
  computed: {
    createTime() {
      let time = this.articleObj.updateTime
        ? this.articleObj.updateTime.slice(2, 10)
        : this.articleObj.createTime.slice(2, 10);
      return time;
    },
    focusTip() {
      return this.focusFlag ? "已关注" : "关注";
    }
  },
  methods: {
    isFocusBloger() {
      if (this._id == this.articleObj.authorId) {
        this.$message("不能关注自己");
        return false;
      }
      if (this._id) {
        this.authorMsg.isFocus = !this.focusFlag;
        this.authorMsg._id = this._id;
        focusBloger(this.authorMsg).then(res => {
          console.log(res);
          this.focusFlag = !this.focusFlag;
        });
      } else {
        this.$message("请先登录");
      }
    },
    //获取相关文章
    getSimilaryArticle() {},
    //发表评论
    async publishComment() {
      if (!this.comment) {
        this.$message("请输入评论内容");
        return false;
      }
      publishArticleComment(this.articleObj._id, this._id, this.comment).then(
        async res => {
          if (res.data.code == 0) {
            this.comment = "";
            this.$message({ type: "success", message: "发表评论成功" });
            let article = await getArticleDetail(this.$route.params.id); // 获取当前文章详细信息
            this.commentList = article.data.data.articleCommentList; // 评论列表
            this.commentListPart = this.commentList.slice(0, 10);
            this.allPage = Math.ceil(this.commentList.length / 10);
            this.commentContent = [];
            this.commentListPart.map(item => {
              getCommentAuthorMsg(item.authorId).then(res => {
                this.commentContent.push(res.data.author);
              });
            });
          }
        }
      );
    },
    //改变评论列表
    changeCommentList(page) {
      this.commentListPart = this.commentList.slice((page - 1) * 10, page * 10);
      this.commentContent = [];
      this.commentListPart.map(item => {
        getCommentAuthorMsg(item.authorId).then(res => {
          this.commentContent.push(res.data.author);
        });
      });
    },
    // 获取cookie
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    },
    changeList() {
      getRandomArticle().then(res => {
        this.randomList = res.data.data;
      });
    },
    async __init() {
      let msg = localStorage.getItem("userMsg")
        ? localStorage.getItem("userMsg")
        : this.getCookie("userMsg")
        ? this.getCookie("userMsg")
        : "";
      // 判断用户是否已登陆
      if (msg) {
        this._id = JSON.parse(msg)[0].authorId;
        this.loginFlag = true;
        //当前登陆用户id和当前文章作者id对比
        let result = await getUserDetailMsg(this._id);
        this.loginObj = result.data.data;
        let focusList = result.data.data.focusList;
        if (this._id !== this.articleObj.authorId) {
          let index = focusList.findIndex(item => {
            return this.articleObj.authorId == item.authorId;
          });
          this.focusFlag = index >= 0 ? true : false;
        }
      }
    }
  },
  components: {
    "common-head": header,
    tag,
    page
  }
};
</script>

<style lang="less">
.article-detail {
  .article-content {
    margin: 0 auto;
    width: 1200px;
    &::after,
    &::before {
      content: "";
      display: block;
      clear: both;
    }
    .article-content-left {
      position: relative;
      float: left;
      margin-top: 34px;
      margin-right: 30px;
      width: 790px;
      box-sizing: border-box;
      .article-msg-content {
        position: relative;
        padding: 40px;
        background-color: #fff;
        .draft-bg {
          position: absolute;
          right: 0;
          top: 0;
          width: 98px;
          height: 60px;
          background: url("../assets/images/draft-bg.png") center no-repeat;
        }
        .article-title-wrapper {
          width: 710px;
          line-height: 32px;

          .article-type-bg {
            margin-right: 8px;
            display: inline-block;
            width: 72px;
            height: 32px;
            color: #fff;
            text-align: center;
            font-size: 16px;
            font-weight: 500;
            background: url("../assets/images/article-type-bg.png") center
              no-repeat;
            vertical-align: top;
          }
          .article-title {
            display: inline-block;
            width: 630px;
            height: 32px;
            font-size: 32px;
            font-weight: 500;
            color: rgba(18, 18, 18, 1);
            line-height: 32px;
          }
        }
        .article-author-msg {
          margin-top: 20px;
          overflow: hidden;

          .article-author-avatar {
            margin-right: 6px;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            vertical-align: top;
          }
          .article-author-name {
            font-size: 14px;
            font-weight: 300;
            color: rgba(177, 177, 177, 1);
            line-height: 25px;
          }
          .line {
            display: inline-block;
            margin: 0 21px;
            height: 14px;
            border-right: 1px solid #ccc;
            line-height: 25px;
          }
          .article-author-channel {
            font-size: 14px;
            font-weight: 300;
            color: rgba(177, 177, 177, 1);
            line-height: 25px;
          }
          .article-create-time {
            float: right;
            font-size: 14px;
            font-weight: 300;
            color: rgba(177, 177, 177, 1);
            line-height: 25px;
          }
        }
        .article-content-detail {
          position: relative;
          margin-top: 36px;
          width: 710px;
          line-height: 26px;
          background-color: #fff;
          .article-video {
            width: 100%;
            video {
              width: 100%;
              min-height: 300px;
            }
          }
          img {
            width: 100%;
          }
          .article-tag-wrapper {
            position: relative;
            margin-top: 80px;
            padding-left: 55px;
            .tip {
              position: absolute;
              left: 0;
              top: 0;
              width: 28px;
              height: 14px;
              font-size: 14px;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              line-height: 36px;
            }
          }
        }
      }
      .article-hot-msg {
        margin-top: 31px;
        .article-hot-msg-title {
          margin-bottom: 30px;
        }
        .article-author-avatar {
          margin-bottom: 30px;
        }
        .hot-msg-bg {
          position: relative;
          padding-left: 25px;
          font-size: 26px;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
          line-height: 35px;
          &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            height: 35px;
            width: 8px;
            background: url("../assets/images/hot-news.png") center no-repeat;
            background-size: 100%;
            vertical-align: top;
          }
        }
        .article-hot-article-list {
          .article-hot-article-item {
            margin-right: 10px;
            display: inline-block;
            width: 190px;
            height: 218px;
            background-color: #fff;
            cursor: pointer;
            &.margin-bottom-10px {
              margin-bottom: 10px;
            }
            a {
              display: inline-block;
              width: 190px;
              height: 140px;
              img {
                width: 100%;
                height: 140px;
                cursor: pointer;
              }
            }

            .msg {
              height: 78px;
              .title {
                margin-top: 16px;
                height: 16px;
                border-left: 3px solid #ccc;
                padding-left: 16px;
                width: 150px;
                font-size: 14px;
                font-weight: 600;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                cursor: pointer;
                &:hover {
                  border-color: #be001e;
                  color: rgba(190, 0, 30, 1);
                }
              }
            }
            .author-msg {
              margin-top: 16px;
              height: 16px;
              padding-left: 16px;
              line-height: 16px;
              a {
                margin-right: 5px;
                width: 16px;
                height: 16px;
                img {
                  width: 16px;
                  height: 16px;
                  border-radius: 50%;
                  vertical-align: top;
                  cursor: pointer;
                }
              }

              .name {
                max-width: 50px;
                height: 11px;
                font-size: 12px;
                font-weight: 300;
                color: rgba(177, 177, 177, 1);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                cursor: pointer;
              }
              .line {
                margin: 0 11px;
                display: inline-block;
                border-right: 1px solid #ccc;
                height: 10px;
                vertical-align: -1px;
              }
              .channel {
                font-size: 12px;
                font-weight: 300;
                color: rgba(177, 177, 177, 1);
              }
            }
          }
          .margin-right0 {
            margin-right: 0;
          }
        }
      }
      .article-comment {
        margin-top: 40px;
        .hot-msg-bg {
          position: relative;
          padding-left: 25px;
          font-size: 26px;
          font-weight: bold;
          color: rgba(0, 0, 0, 1);
          line-height: 35px;
          &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            height: 35px;
            width: 8px;
            background: url("../assets/images/hot-news.png") center no-repeat;
            background-size: 100%;
            vertical-align: top;
          }
        }
        .comment-tip {
          margin-left: 20px;
          height: 14px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(91, 91, 91, 1);
        }
        .article-comment-content {
          margin-top: 40px;
          width: 790px;

          background-color: #fff;
          .comment-wrapper {
            position: relative;
            padding: 40px 40px 90px 0;
            height: 365px;
            box-sizing: border-box;
            .article-author {
              display: inline-block;
              position: relative;
              width: 110px;
              text-align: center;
              a {
                img {
                  width: 50px;
                  height: 50px;
                  border-radius: 50%;
                }
              }

              .author-name {
                display: inline-block;
                width: 100%;
                height: 14px;
                font-size: 14px;
                font-weight: 500;
                color: rgba(153, 153, 153, 1);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            .article-comment-area {
              display: inline-block;
              width: 634px;
              height: 166px;
              background: rgba(246, 246, 246, 1);
              text-align: center;
              resize: none;
              vertical-align: top;
              .tip {
                font-size: 14px;
                font-weight: 400;
                color: rgba(170, 170, 170, 1);
                line-height: 166px;
              }
            }
            textarea.article-comment-area {
              text-align: left;
            }
            .operate-btn {
              position: absolute;
              width: 90px;
              height: 50px;
              right: 40px;
              bottom: 100px;
              font-size: 14px;
              color: #fff;
              border: none;
              background: none;
              outline: none;
              cursor: pointer;
              background: url("../assets/images/person_publish.png") center
                no-repeat;
              background-size: 100%;
            }
          }
          .comment-list {
            padding: 0 40px;
            .comment-count {
              margin-bottom: 43px;
              .tip {
                height: 24px;
                font-size: 24px;
                font-weight: 500;
                color: rgba(18, 18, 18, 1);
              }
              .count {
                margin-left: 20px;
                font-size: 16px;
                color: rgba(153, 153, 153, 1);
              }
            }
            .comment {
              padding-top: 40px;
              padding-bottom: 40px;
              border-bottom: 1px solid #ccc;
              .avatar {
                margin-right: 34px;
                display: inline-block;
                height: 50px;
                vertical-align: top;
                img {
                  width: 50px;
                  height: 50px;
                  border-radius: 50%;
                  vertical-align: top;
                }
              }
              .author-msg {
                display: inline-block;
                width: 608px;
                .name {
                  margin-right: 20px;
                  max-width: 300px;
                  height: 18px;
                  font-size: 18px;
                  font-weight: 500;
                  color: rgba(18, 18, 18, 1);
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  vertical-align: -4px;
                }
                .creatTime {
                  font-size: 14px;
                  font-weight: 300;
                  color: rgba(153, 153, 153, 1);
                  vertical-align: -4px;
                }
                .content {
                  margin-top: 15px;
                  width: 608px;
                  font-size: 14px;
                  line-height: 20px;
                  font-weight: 400;
                  color: rgba(91, 91, 91, 1);
                }
              }
            }
          }
        }
      }
    }
    .article-content-right {
      margin-top: 34px;
      float: right;
      width: 370px;
      .bloger-msg {
        position: relative;
        height: 321px;
        text-align: center;
        background-color: #fff;
        .bloger-right-bottom-bg {
          position: absolute;
          box-sizing: border-box;
          z-index: -1;
          right: -10px;
          bottom: -10px;
          border-right: 10px solid #be001e;
          border-bottom: 10px solid #be001e;
          width: 350px;
          height: 301px;
        }
        a {
          img {
            margin-top: 30px;
            width: 100px;
            height: 100px;
            border-radius: 50%;
          }
        }

        .name {
          margin: 19px 0 16px 0;
          display: inline-block;
          width: 100%;
          height: 18px;
          font-size: 18px;
          font-weight: 500;
          color: rgba(18, 18, 18, 1);
        }
        .bloger-operate {
          .article-focus {
            display: inline-block;
            width: 70px;
            height: 32px;
            line-height: 32px;
            color: #ccc;
            border: 1px solid #ccc;
            cursor: pointer;
          }
          .article-btn {
            border: none;
            color: #fff;
            background: url("../assets/images/article-type-bg.png") center
              no-repeat;
            cursor: pointer;
          }
        }
        .bloger-count {
          margin-top: 43px;
          text-align: center;
          .count {
            margin-right: 15px;
            display: inline-block;
            .tip {
              font-size: 14px;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
            }
            .number {
              margin-top: 11px;
              font-size: 16px;
              font-weight: 500;
              color: rgba(18, 18, 18, 1);
            }
          }
        }
      }
      .bloger-other-msg {
        margin-top: 45px;
        .bloger-ohter-msg-title {
          .ohter-msg-title-content {
            position: relative;
            overflow: hidden;
            margin-bottom: 19px;
            .tip {
              position: relative;
              display: inline-block;
              padding-left: 25px;
              font-weight: bold;
              line-height: 35px;
              &::before {
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                height: 35px;
                width: 8px;
                background: url("../assets/images/hot-news.png") center
                  no-repeat;
                background-size: 100%;
                vertical-align: top;
              }
            }
            .operate {
              float: right;
              line-height: 35px;
              color: rgba(170, 170, 170, 1);
              cursor: pointer;
              &:hover {
                color: #be001e;
              }
            }
          }
          .bloger-article-list {
            a {
            }
            .item {
              height: 74px;
              padding-top: 20px;
              padding-left: 30px;
              padding-bottom: 20px;
              background-color: #fff;
              border-bottom: 1px solid #ccc;
              .item-img {
                margin-right: 21px;
                position: relative;
                display: inline-block;
                width: 100px;
                height: 74px;
                overflow: hidden;
                vertical-align: top;
                a {
                  img {
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                    object-fit: contain;
                  }
                }
              }
              .item-msg {
                padding-top: 11px;
                position: relative;
                display: inline-block;
                width: 150px;
                .title {
                  margin-bottom: 18px;
                  width: 100%;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  font-size: 16px;
                  font-weight: 500;
                  color: rgba(18, 18, 18, 1);
                  &:hover {
                    color: #be001e;
                  }
                }
                .time {
                  width: 68px;
                  font-size: 12px;
                  font-weight: 400;
                  color: rgba(170, 170, 170, 1);
                }
              }
            }
          }
        }
      }
    }
  }
  video {
    width: 100%;
  }
}
</style>
