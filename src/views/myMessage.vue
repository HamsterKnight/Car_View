<template>
  <div class="person-message">
    <div class="common-head">
      <common-head></common-head>
    </div>
    <div class="person-head">
      <person-head active="4"></person-head>
    </div>
    <div class="edit-message-wrapper">
      <div class="edit-message-title">
        编辑个人信息
      </div>
      <div class="upload-avatar">
        <el-upload class="avatar-uploader"
          ref="upload"
          name="upload"
          action="/api/ht/upload"
          list-type="picture-card"
          :file-list="fileList"
          :limit="1"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-remove="handleRemove">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

      </div>
      <span class="tip">上传头像</span>
      <el-form class="el-form-style">
        <el-form-item class="el-form-item-style">
          <el-input v-model="account"
            :disabled="true"></el-input>
        </el-form-item>
        <el-form-item class="el-form-item-style">
          <el-input placeholder="请输入昵称,默认为账号"
            v-model="author"></el-input>
        </el-form-item>
        <el-form-item class="el-form-item-style">
          <el-input v-model="detailMsg.realName"
            placeholder="请输入您的真实姓名"></el-input><span class="icon">*</span><span class="tip">必填</span>
        </el-form-item>
        <el-form-item class="el-form-item-style">
          <el-input v-model="detailMsg.idCard"
            placeholder="请输入您的身份证号"></el-input><span class="icon">*</span><span class="tip">必填</span>
        </el-form-item>
        <el-form-item class="el-form-item-style">
          <el-input v-model="detailMsg.phoneNumber"
            placeholder="请输入您的手机号"></el-input><span class="icon">*</span><span class="tip">必填</span>
        </el-form-item>
        <el-form-item class="el-form-item-style">
          <el-select placeholder="请选择性别"
            v-model="detailMsg.gender">
            <el-option v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="el-form-item-style">
          <el-date-picker v-model="detailMsg.bothYearMonth"
            type="month"
            placeholder="选择出生年月"
            format="yyyy-MM">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="el-form-item-style">
          <el-input v-model="detailMsg.eMail"
            placeholder="请输入您的邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="publish-btn"
            @click="savePersonMsg">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import commonHead from "@/components/header";
import personHead from "@/components/personComponent/personHead.vue";
import article from "@/components/personComponent/article.vue";
import page from "@/components/page.vue";
import { path, getUserDetailMsg, updateUserMsg } from "@/http.js";
export default {
  data() {
    return {
      authorId: "", //当前登陆作者id
      options: [{ label: "男", value: 0 }, { label: "女", value: 1 }],
      author: "",
      account: "",
      detailMsg: {
        author: "",
        realName: "",
        idCard: "",
        phoneNumber: "",
        gender: null,
        bothYearMonth: "",
        eMail: ""
      },
      fileList: [],
      tempList: []
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
      this.author = result.data.data.author;
      this.account = result.data.data.account;
      this.user = result.data.data;
      this.detailMsg = Object.assign(
        this.detailMsg,
        result.data.data.detailMessage
      );
      if (this.user.authorAvatar) {
        this.fileList.push({ url: path + this.user.authorAvatar });
        this.tempList.push({ url: this.user.authorAvatar });
      }
    }
  },
  methods: {
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.fileList.push({ url: path + res.data.documentUrl });
        this.tempList.push({ url: res.data.documentUrl });
        document.querySelector(".el-upload").style.display = "none";
        this.$message(res.data.msg);
        document.querySelector(".el-upload--picture-card").style.display =
          "none";
      } else {
        this.$message("上传失败");
      }
    },
    beforeAvatarUpload() {},
    handleRemove() {
      document.querySelector(".el-upload--picture-card").style.display =
        "inline-block";
      this.fileList = [];
      this.tempList = [];
    },
    savePersonMsg() {
      if (
        !this.detailMsg.realName ||
        !this.detailMsg.idCard ||
        !this.detailMsg.phoneNumber
      ) {
        this.$message("请检查必填信息是否填写完整");
        return false;
      }
      let author = this.author ? this.author : this.user.author;
      if (this.tempList.length > 0) {
        this.detailMsg.authorAvatar = this.tempList[0].url;
      }
      updateUserMsg(this.authorId, this.author, this.detailMsg).then(res => {
        // let msg = localStorage.getItem("userMsg") ? true : false;
        // console.log(res.data.data);
        // if (msg) {
        //   this.localStorage.setItem("userMsg", JSON.stringify(res.data.data));
        // } else {
        //   this.setCookie("userMsg", JSON.stringify(res.data.data));
        // }
        this.$router.push({ path: "/person/myEssay" });
      });
    },
    // 获取cookie
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    },
    setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toGMTString();
      document.cookie = cname + "=" + cvalue + "; " + expires + "; path = / ;";
    }
  }
};
</script>
<style lang="less">
.margin-right20px {
  margin-right: 20px;
}
.person-message {
  .edit-message-wrapper {
    margin: 30px auto 0 auto;
    position: relative;
    width: 1200px;
    background-color: #fff;
    .upload-avatar {
      position: absolute;
      width: 170px;
      height: 150px;
      right: 182px;
      top: 127px;
      text-align: center;
      overflow: hidden;
      cursor: pointer;
      .el-upload--picture-card {
        width: 150px !important;
        height: 150px !important;
        border-radius: 50%;
      }
      .el-upload-list__item-delete {
        margin-top: 55px;
      }
      .el-upload-list__item {
        width: 170px !important;
        height: 150px !important;
        border: none !important;
        img {
          width: 150px !important;
          height: 150px !important;
          border-radius: 50%;
        }
      }
    }
    .tip {
      position: absolute;
      width: 170px;
      right: 182px;
      top: 287px;
      color: #000;
      text-align: center;
      overflow: hidden;
    }
    .edit-message-title {
      height: 126px;
      font-size: 26px;
      font-weight: bold;
      color: rgba(18, 18, 18, 1);
      line-height: 126px;
      text-align: center;
    }
    .el-form-style {
      padding-left: 177px;
      .el-form-item-style {
        position: relative;
        width: 380px;
        height: 50px;
        .icon {
          position: absolute;
          left: 390px;
          top: 0;
          color: #be001e;
        }
        .tip {
          position: absolute;
          width: 30px;
          left: 395px;
          top: 0;
          color: #000;
        }
        .el-select {
          width: 380px !important;
        }
        .el-date-editor {
          width: 380px !important;
        }
      }
    }
  }
  .publish-btn {
    width: 144px;
    height: 40px;
    background: url("../assets/images/search-btn.png") center no-repeat;
    background-size: 100%;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
  }
}
</style>

