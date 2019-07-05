<template>
  <div class="person-change-password">
    <div class="common-head">
      <common-head></common-head>
    </div>
    <div class="person-head">
      <person-head active="6"></person-head>
    </div>
    <div class="edit-message-wrapper">
      <div class="edit-message-title">
        修改密保
      </div>
      <el-form class="el-form-style"
        :model="obj"
        :rules="rules"
        ref="changeForm"
        name="changeForm">
        <el-form-item class="el-form-item-style">
          <el-input v-model="obj.oldAnswer"
            placeholder="请输入原密保答案"
            type="text"
            index="1"
            @change="changeOne"></el-input>
        </el-form-item>
        <el-form-item prop="newQuestion">
          <el-input class="input"
            placeholder="请输入新问题"
            type="text"
            v-model="obj.newQuestion"></el-input>
        </el-form-item>
        <el-form-item prop="newAnswer">
          <el-input class="input"
            type="text"
            placeholder="请输入新答案"
            v-model="obj.newAnswer"
            @change="changeTwo"></el-input>
        </el-form-item>
        <el-form-item prop="confirmAnswer">
          <el-input class="input"
            type="text"
            placeholder="请输入确认答案"
            v-model="obj.confirmAnswer"
            @change="changeThree"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="publish-btn"
            @click="saveMsg('changeForm')">保存</el-button>
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
import {
  path,
  getUserDetailMsg,
  changeUserPassword,
  changeSecretProtection
} from "@/http.js";
export default {
  data() {
    return {
      authorId: "", //当前登陆作者id
      author: "",
      obj: {
        oldAnswer: "",
        newQuestion: "",
        newAnswer: "",
        old: "",
        new: "",
        confirmAnswer: "",
        confirm: ""
      },
      passwordFlag: false,
      rules: {
        oldAnswer: [
          { required: true, message: "请输入原密保答案", trigger: "blur" }
        ],
        newQuestion: [
          { required: true, message: "请输入新密保问题", trigger: "blur" }
        ],
        newAnswer: [
          { required: true, message: "请输入密保答案", trigger: "blur" }
        ],
        confirmAnswer: [
          { required: true, message: "再次请输入密保答案", trigger: "blur" }
        ]
      }
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
    }
  },
  computed: {
    flag() {
      return this.obj.new == this.obj.confirm;
    }
  },
  methods: {
    changeOne() {
      this.obj.old = this.obj.oldAnswer;
      this.obj.oldAnswer = this.obj.oldAnswer.replace(/[\d\D]/g, "*");
    },
    changeTwo() {
      this.obj.new = this.obj.newAnswer;
      this.obj.newAnswer = this.obj.newAnswer.replace(/[\d\D]/g, "*");
    },
    changeThree() {
      this.obj.confirm = this.obj.confirmAnswer;
      this.obj.confirmAnswer = this.obj.confirmAnswer.replace(/[\d\D]/g, "*");
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
    },
    saveMsg(formName) {
      if (!this.flag) {
        this.$message({ type: "error", message: "两次答案不一样" });
        return false;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          changeSecretProtection(
            this.authorId,
            this.obj.old,
            this.obj.newQuestion,
            this.obj.new
          ).then(res => {
            this.$message(res.data.msg);
            if (res.data.flag) {
              this.$router.push({ path: "/person/myEssay" });
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less">
.margin-right20px {
  margin-right: 20px;
}
.person-change-password {
  .edit-message-wrapper {
    position: relative;
    margin: 30px auto 0 auto;
    padding-bottom: 30px;
    width: 1200px;
    background-color: #fff;
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
      margin-left: 410px;
      // left: 50%;
      // top: 50%;
      // transform: translate(-50%, -50%);
      width: 380px;
      .el-form-item-style {
        position: relative;
        width: 380px;
        height: 50px;
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

