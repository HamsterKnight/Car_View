<template>
  <div class="person-forget-password">
    <div class="common-head">
      <common-head></common-head>
    </div>
    <div class="edit-message-wrapper">
      <div class="edit-message-title">
        重置密码
      </div>
      <el-form class="el-form-style"
        :model="obj"
        ref="findForm"
        v-if="!flag"
        :rules="rules">
        <el-form-item prop="account">
          <el-input placeholder="请输入账号"
            v-model="obj.account"
            index="1"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="reset-btn"
            @click="findAccount('findForm')">确定</el-button>
        </el-form-item>
      </el-form>
      <el-form v-if="flag"
        class="el-form-style"
        :model="obj"
        :rules="rules"
        ref="changeForm"
        name="changeForm">
        <el-form-item>
          <el-input v-model="question"
            :disabled="true"></el-input>
        </el-form-item>
        <el-form-item prop="tempAnswer">
          <el-input placeholder="请输入密保答案"
            v-model="obj.tempAnswer"
            @change="changeOne"
            index="2"></el-input>
        </el-form-item>
        <el-form-item prop="newPassword">
          <el-input class="input"
            minlength="6"
            placeholder="请输入新密码"
            type="password"
            v-model="obj.newPassword"
            index="3"></el-input>
          <div class="tangle"><span :class="['tangleColor', passwordStrong]"></span><span :class="['tangleColor', passwordStrong]"></span><span :class="['tangleColor', passwordStrong]"></span><span style="color: #be001e">不能使用\、,等特殊符号</span></div>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input class="input"
            minlength="6"
            type="password"
            placeholder="再次输入确认密码"
            v-model="obj.confirmPassword"
            @blur="warningTip"
            index="4"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="publish-btn"
            @click="changePassword('changeForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import commonHead from "@/components/header";
import personHead from "@/components/personComponent/personHead.vue";
import article from "@/components/personComponent/article.vue";
import { path, findUserMsg, restUserPassword } from "@/http.js";
export default {
  data() {
    let checkPasswordValue = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入新密码"));
      } else if (value.length < 6) {
        return callback(new Error("密码长度不小于6位"));
      } else if (/[/.,\\!%()^,，_+=/`~?:;‘’“”"]/g.test(value)) {
        return callback(new Error("密码中存在、/,等特殊符号"));
      } else {
        return callback();
      }
    };
    return {
      authorId: "", //当前登陆作者id
      author: "",
      flag: false,
      obj: {
        newPassword: "",
        confirmPassword: "",
        account: ""
      },
      question: "",
      passwordFlag: false,
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        tempAnswer: [
          { required: true, message: "请输入密保答案", trigger: "blur" }
        ],
        newPassword: [
          { required: true, validator: checkPasswordValue, trigger: "blur" }
        ],
        confirmPassword: [
          { required: true, message: "请输入确认密码", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    "common-head": commonHead,
    "pseron-article": article,
    "person-head": personHead
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
    passwordStrong() {
      let password = this.obj.newPassword.trim() || {};
      if (password.length >= 10) {
        if (password.match(/[a-z]/g) && password.match(/[0-9]/g)) {
          return "higher";
        } else if (password.match(/[a-z]/g)) {
          return "middle";
        } else if (password.match(/[0-9]/g)) {
          return "middle";
        }
      } else if (password.length >= 8) {
        if (password.match(/[a-z]/g) && password.match(/[0-9]/g)) {
          return "middle";
        } else if (password.match(/[a-z]/g)) {
          return "less";
        } else if (password.match(/[0-9]/g)) {
          return "less";
        }
      } else if (password.length >= 6) {
        return "less";
      } else {
        return "";
      }
    }
  },
  methods: {
    changeOne() {
      this.obj.answer = this.obj.tempAnswer;
      this.obj.tempAnswer = this.obj.tempAnswer.replace(/[\d\D]/g, "*");
    },
    findAccount(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          findUserMsg(this.obj.account).then(res => {
            if (res.data.code == 0) {
              this.flag = true;
              this.question = res.data.data.question;
              this.authorId = res.data.data.authorId;
            } else if (res.data.code == 1) {
              this.$message({ type: "warning", message: "该账号不存在" });
            }
          });
        }
      });
      // findUserMsg();
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
    warningTip() {
      if (this.obj.newPassword !== this.obj.confirmPassword) {
        this.$message({
          type: "warning",
          message: "两次密码不一致"
        });
        this.passwordFlag = false;
      } else {
        this.passwordFlag = true;
      }
    },
    changePassword(formName) {
      this.$refs[formName].validate(valid => {
        if (valid && this.passwordFlag) {
          restUserPassword(
            this.authorId,
            this.obj.answer,
            this.obj.newPassword
          ).then(res => {
            if (res.data.code == 0) {
              this.$message(res.data.msg);
              this.quitLogin();
            } else {
              this.$message(res.data.msg);
            }

            // if (res.data.flag) {
            //   this.quitLogin();
            // }
          });
        } else {
          return false;
        }
      });
    },
    delCookie(key) {
      var date = new Date();
      date.setTime(date.getTime() - 1);
      var delValue = this.getCookie(key);
      if (!!delValue) {
        document.cookie =
          key + "=" + delValue + ";expires=" + date.toGMTString() + ";path=/";
      }
    },
    quitLogin() {
      //清除保存的个人信息
      localStorage.removeItem("userMsg");
      this.delCookie("userMsg");
      this.loginFlag = !this.loginFlag;
      // console.log(localStorage.getItem("userMsg"));
      // console.log(this.getCookie("userMsg"));
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="less">
.margin-right20px {
  margin-right: 20px;
}
.person-forget-password {
  .edit-message-wrapper {
    position: relative;
    margin: 30px auto 0 auto;
    padding-bottom: 30px;
    padding-top: 120px;
    width: 1200px;
    height: 751px;
    box-sizing: border-box;
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
      transition: 1s all;
      .el-form-item-style {
        position: relative;
        width: 380px;
        height: 50px;
      }
    }
  }
  .publish-btn,
  .reset-btn {
    width: 380px;
    height: 40px;
    border: none;
    background: url("../assets/images/loginBtn.png") center no-repeat;
    background-size: 100%;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
  }
}
.person-forget-password .tangle {
  font-size: 12px;
}
.person-forget-password .tangleColor {
  display: inline-block;
  height: 10px;
  width: 70px;
  background-color: #ccc;
}
.person-forget-password .tangleColor {
  margin-right: 7px;
}
.person-forget-password .tangleColor.higher:nth-child(3) {
  background: #66cc99;
}
.person-forget-password .tangleColor.higher:nth-child(2) {
  background: #6699cc;
}
.person-forget-password .tangleColor.higher:first-child {
  background: #66cccc;
}
.person-forget-password .tangleColor.middle {
  background: #6699cc;
}
.person-forget-password .tangleColor.middle:nth-child(3) {
  background: #ccc;
}
.person-forget-password .tangleColor.middle:first-child {
  background: #66cccc;
}
.person-forget-password .tangleColor.less {
  background: #ccc;
}
.person-forget-password .tangleColor.less:first-child {
  background: #66cccc;
}
</style>

