<template>
  <div class="person-change-password">
    <div class="common-head">
      <common-head></common-head>
    </div>
    <div class="person-head">
      <person-head active="5"></person-head>
    </div>
    <div class="edit-message-wrapper">
      <div class="edit-message-title">
        修改密码
      </div>
      <el-form class="el-form-style"
        :model="obj"
        :rules="rules"
        ref="changeForm"
        name="changeForm">
        <el-form-item class="el-form-item-style">
          <el-input v-model="obj.oldPassword"
            placeholder="请输入原密码"
            type="password"
            index="1"></el-input>
        </el-form-item>
        <el-form-item prop="newPassword">
          <el-input class="input"
            minlength="6"
            placeholder="请输入新密码"
            type="password"
            v-model="obj.newPassword"></el-input>
          <div class="tangle"><span :class="['tangleColor', passwordStrong]"></span><span :class="['tangleColor', passwordStrong]"></span><span :class="['tangleColor', passwordStrong]"></span><span style="color: #be001e">不能使用\、,等特殊符号</span></div>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input class="input"
            minlength="6"
            type="password"
            placeholder="再次输入确认密码"
            v-model="obj.confirmPassword"
            @blur="warningTip"></el-input>
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
import { path, getUserDetailMsg, changeUserPassword } from "@/http.js";
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
      obj: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      },
      passwordFlag: false,
      rules: {
        oldPassword: [
          { required: true, message: "请输入确认密码", trigger: "blur" }
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
    "person-head": personHead,
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
    saveMsg(formName) {
      this.$refs[formName].validate(valid => {
        if (valid && this.passwordFlag) {
          changeUserPassword(
            this.authorId,
            this.obj.oldPassword,
            this.obj.newPassword
          ).then(res => {
            this.$message(res.data.msg);
            if (res.data.flag) {
              this.quitLogin();
            }
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
.person-change-password .tangle {
  font-size: 12px;
}
.person-change-password .tangleColor {
  display: inline-block;
  height: 10px;
  width: 70px;
  background-color: #ccc;
}
.person-change-password .tangleColor {
  margin-right: 7px;
}
.person-change-password .tangleColor.higher:nth-child(3) {
  background: #66cc99;
}
.person-change-password .tangleColor.higher:nth-child(2) {
  background: #6699cc;
}
.person-change-password .tangleColor.higher:first-child {
  background: #66cccc;
}
.person-change-password .tangleColor.middle {
  background: #6699cc;
}
.person-change-password .tangleColor.middle:nth-child(3) {
  background: #ccc;
}
.person-change-password .tangleColor.middle:first-child {
  background: #66cccc;
}
.person-change-password .tangleColor.less {
  background: #ccc;
}
.person-change-password .tangleColor.less:first-child {
  background: #66cccc;
}
</style>

