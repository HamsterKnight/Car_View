<template>
  <div class="person-myEssay">
    <div class="common-head">
      <common-head></common-head>
    </div>
    <div class="person-head">
      <person-head active="1"></person-head>
    </div>
    <div class="person-myEssay-content">
      <div class="addArticle">
        <div class="addArticle-content">
          <div class="article-tip">发布文章</div>
          <el-form ref="form"
            :model="articleObj"
            :rules="rules"
            label-position="left"
            label-width="150px">
            <el-form-item class="article-input"
              prop="articleTitle">
              <el-input v-model="articleObj.articleTitle"
                placeholder="请输入文章标题"></el-input><span class="tip"
                style="color: red">*</span> <span class="tip">必填</span>
            </el-form-item>
            <el-form-item class="article-channel">
              <el-select v-model="articleObj.channelId"
                placeholder="请选择文章板块">
                <el-option v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span class="tip"
                style="color: red">*</span> <span class="tip">必填</span>
            </el-form-item>
            <el-form-item class="article-tag"
              prop="articleTag">
              <el-input v-model="articleObj.articleTag"></el-input> <span class="tip">*用英文逗号,隔开</span>
            </el-form-item>
            <el-form-item class="article-type">
              <div class="tip"> <span class="red">*</span>文章类型</div>
              <el-radio-group v-model="articleObj.articleType">
                <el-radio label="1">原创</el-radio>
                <el-radio label="2">转载</el-radio>
                <el-radio label="3">翻译</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="articleDigest"
              class="article-digest">
              <div class="tip"><span class="red">*</span>文章摘要</div>
              <el-input type="text"
                v-model="articleObj.articleDigest"></el-input>
            </el-form-item>
            <el-form-item class="article-pic">
              <div class="tip"> <span class="red">*</span>上传图片</div>
              <el-upload action="/api/ht/upload"
                ref="upload"
                name="upload"
                :on-success="uploadPicSucc"
                list-type="picture-card"
                :limit="1"
                :file-list="fileList"
                :on-preview="handlePictureCardPreview"
                :before-upload="beforeUpload"
                :on-error="failedUpload"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img class="imgSize"
                  :src="dialogImageUrl"
                  alt="">
              </el-dialog>
            </el-form-item>
            <el-form-item class="essay-video-upload article-video">
              <div class="tip">上传视频<span class="other-tip">请保证视频格式正确</span> </div>
              <el-upload name="upload"
                action="/api/ht/upload"
                accept="video/*"
                list-type="picture-card"
                :on-remove="handleVideoRemove"
                :before-remove="beforeVideoRemove"
                :on-success="uploadVideoSucc"
                :limit="1"
                :file-list="videoFileList">
                <i class="essay-video-icon"></i>
              </el-upload>
              <video v-if="articleObj.articleVideo"
                :src="`${path}${articleObj.articleVideo}`"></video>
            </el-form-item>
            <el-form-item class="quill-content">
              <quill-editor v-model="articleObj.articleContent"
                :options="editorOption"
                ref="myQuillEditor">
              </quill-editor>
              <div class="article-tip"><span class="red">*</span>必填</div>
            </el-form-item>
          </el-form>
          <div class="article-btn-wrapper">
            <button @click="confirmOperate(3)"
              class="article-btn publish-btn">发布</button><button @click="confirmOperate(2)"
              class="article-btn draft-btn">存为草稿</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import commonHead from "@/components/header.vue";
import personHead from "@/components/personComponent/personHead.vue";
import quillConfig from "@/quillConfig.js";
import {
  getUserDetailMsg,
  addNewArticle,
  getArticleDetail,
  path
} from "@/http.js";
import axios from "axios";
export default {
  data() {
    return {
      _id: "",
      showArticle: true,
      // 富文本peizhi
      editorOption: quillConfig,
      articleObj: {
        articleType: "1",
        channelId: ""
      },
      options: [
        { label: "今日车闻", value: "2" },
        { label: "新能源", value: "3" },
        { label: "视频", value: "4" }
      ],
      fileList: [],
      uploadName: "",
      dialogImageUrl: "",
      dialogVisible: false,
      videoFileList: [],
      rules: {
        // articleChannel: [
        //   { required: true, message: "请选择模块", trigger: "blur" }
        // ],
        // articleTitle: [
        //   { required: true, message: "请输入article名字", trigger: "blur" }
        // ],
        // articleLink: [
        //   { required: true, message: "请输入article链接", trigger: "blur" }
        // ],
        // articleDigest: [{ required: true, message, trigger: "blur" }]
      }
    };
  },
  async created() {
    let msg = localStorage.getItem("userMsg")
      ? localStorage.getItem("userMsg")
      : this.getCookie("userMsg")
      ? this.getCookie("userMsg")
      : "";
    // 获取用户authorId
    if (msg) {
      this._id = JSON.parse(msg)[0].authorId;
      // let result = await getUserDetailMsg(_id);
      // console.log(result);
    }
    if (this.$route.query.id) {
      getArticleDetail(this.$route.query.id).then(res => {
        let result = res.data.data;
        result.articleTag = result.articleTag.join();
        this.articleObj = result;
        this.fileList = [{ url: path + result.articlePic }];
        if (this.fileList.length > 0) {
          document.querySelector(".el-upload").style.display = "none";
        }
      });
    }
  },
  components: {
    "common-head": commonHead,
    "person-head": personHead
  },
  methods: {
    showPublishArticle() {
      this.showArticle = false;
    },
    // 图片上传成功回调
    uploadPicSucc(res) {
      if (res.code == 0) {
        this.articleObj.articlePic = res.data.documentUrl;
        document.querySelector(".el-upload").style.display = "none";
        this.$message(res.data.msg);
      } else {
        this.$message("上传失败");
      }
    },
    beforeUpload(file) {
      // 图片上传前，用于检查图片类型
      console.log(file);
    },
    // 获取cookie
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    },
    handleRemove() {
      this.articleObj.articlePic = "";
      document.querySelector(".el-upload").style.display = "block";
    },
    handlePictureCardPreview() {},
    failedUpload() {},
    // 改变当前article的模块触发的打印事件
    handlePlateChange() {},
    confirmOperate(type) {
      // if (this.$route.query.id) {
      //   this.updatearticleOperate();
      // } else {
      //   this.addBnnerOperate();
      // }
      if (!this.articleObj.articleTitle) {
        this.$message({
          type: "warning",
          message: "请检查信息是否输入完整!"
        });
        return;
      }
      if (!this.articleObj.channelId) {
        this.$message({
          type: "warning",
          message: "请检查信息是否输入完整!"
        });
        return;
      }
      if (!this.articleObj.articleDigest) {
        this.$message({
          type: "warning",
          message: "请检查信息是否输入完整!"
        });
        return;
      }
      if (!this.articleObj.articlePic) {
        this.$message({
          type: "warning",
          message: "请检查信息是否输入完整!"
        });
        return;
      }
      if (!this.articleObj.articleContent) {
        this.$message({
          type: "warning",
          message: "请检查信息是否输入完整!"
        });
        return;
      }
      let str =
        type === 2 ? "文章存为草稿, 是否继续?" : "发布该文章, 是否继续?";
      this.$confirm(str, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 有传文章id过来，则进入更新文章
          if (this.$route.query.id) {
            // 这里是更新文章
            this.addArticleOperate(type, "/api/web/updateArticle");
          } else {
            this.addArticleOperate(type);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发布"
          });
        });
    },
    // 传入类型，改变发布状态，3为审核状态,2为草稿状态
    addArticleOperate(type = 3, url = "/api/web/addArticle") {
      // this.articleObj._id = this._id;
      this.articleObj.authorId = this._id;
      this.articleObj.state = type;
      this.articleObj.author = sessionStorage.getItem("author")
        ? sessionStorage.getItem("author")
        : "汽车最前线";
      let msg = type == 2 ? "草稿成功" : "发布成功，等待审核通过";
      axios.post(url, this.articleObj).then(res => {
        if (res.data.code == 0) {
          this.$message({ type: "success", message: msg });
          this.$nextTick(() => {
            this.$router.push("/person/myEssay");
          });
        }
      });
    },
    handleVideoRemove() {
      this.articleObj.articleVideo = "";
    },
    beforeVideoRemove() {},
    uploadVideoSucc(res) {
      if (res.code == 0) {
        this.articleObj.articleVideo = res.data.documentUrl;
        this.$message(res.data.msg);
      } else {
        this.$message("上传失败");
      }
    },
    backToList() {
      //this.$router.push("/ht/index/articleList");
    }
  }
};
</script>
<style lang="less">
.margin-right20px {
  margin-right: 20px;
}
.person-myEssay {
  .person-head {
  }
  .addArticle {
    .el-form-item {
      margin-bottom: 30px;
    }
    .addArticle-content {
      position: relative;
      margin: 0 auto;
      width: 1200px;
      background-color: #fff;
      .my-select-item {
        position: relative;
      }
      .article-tip {
        display: inline-block;
        width: 100%;
        margin-top: 40px;
        margin-bottom: 60px;
        height: 26px;
        font-size: 26px;
        line-height: 26px;
        font-weight: bold;
        text-align: center;
      }
      .article-input {
        .el-form-item__content {
          position: relative;
          width: 750px;
          height: 50px;
          .tip {
            position: absolute;
            width: 100px;
            left: 780px;
            top: 15px;
            &:nth-child(2) {
              left: 770px;
            }
          }
          input {
            width: 750px;
            height: 50px;
          }
        }
      }
      .article-channel {
        .el-select {
          margin-right: 20px;
        }
      }
      .article-tag {
        .el-form-item__content {
          position: relative;
          width: 750px;
          height: 50px;
          .tip {
            position: absolute;
            width: 200px;
            left: 780px;
            line-height: 50px;
            color: #be001e;
          }
        }
      }
      .article-digest,
      .article-type,
      .article-pic,
      .article-video {
        .tip {
          margin-bottom: 10px;
          font-size: 24px;
          font-weight: 500;
          .red {
            color: #be001e;
            margin-right: 16px;
          }
        }
        .other-tip {
          font-size: 14px;
          color: #ccc;
          margin-left: 28px;
        }
      }
      .article-btn-wrapper {
        padding-left: 150px;
        .article-btn {
          width: 150px;
          height: 40px;
          border: none;
          font-size: 18px;
          font-weight: 500;
          color: rgba(18, 18, 18, 1);
          cursor: pointer;
          &.publish-btn {
            margin-right: 10px;
            color: #fff;
            background: url("../assets/images/person_publish.png") no-repeat;
          }
          &.draft-btn {
            background: url("../assets/images/person_draft.png") no-repeat;
          }
        }
      }
    }
    .el-cascader-menus {
      top: 1373px;
    }
    .quill-content {
      position: relative;
      width: 1070px;
      height: 600px;
      .quill-editor {
        height: 500px;
      }
      .article-tip {
        position: absolute;
        left: 500px;
        top: 0;
        font-size: 16px;
        .red {
          margin-right: 5px;
          color: #be001e;
        }
      }
    }
  }
  .essay-video-upload {
    .el-upload--picture-card {
      width: 220px;
      border: none !important;
      box-shadow: 1px 1px 1px;
      outline: none !important;
      &:hover {
        border: none;
        outline: none !important;
      }
    }
  }
  .essay-video-icon {
    display: inline-block;
    width: 220px;
    height: 144px;
    background: url("../assets/images/video_image.png") center no-repeat;
    &:hover {
      outline: none;
      border: none;
    }
  }
}
</style>

