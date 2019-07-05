<template>
  <div class="header">
    <div class="header-content">
      <nav class="nav-wrapper">
        <ul class="nav-ul">
          <li class="web-title">
            <router-link to="/"></router-link>
          </li>
          <li :class="['nav-li', index === '1' ? 'nav-li-current': '']">
            <router-link to="/news">
              今日车闻
            </router-link>
          </li>
          <li :class="['nav-li', index === '2' ? 'nav-li-current': '']">
            <router-link to="/ev">
              新能源
            </router-link>
          </li>

          <li :class="['nav-li', index === '4' ? 'nav-li-current': '']">
            <router-link to="/video">
              视频
            </router-link>
          </li>
          <li :class="['nav-li',index === '5' ? 'nav-li-current': '']">
            <router-link to="/interest">
              兴趣部落
            </router-link>
          </li>
        </ul>
        <div class="search-content">
          <input class="search-input"
            type="text"
            placeholder="请输入搜索内容"
            v-model="searchContent"
            @keyup.enter="search">
          <button class="seacrh-btn"></button>
        </div>
        <div class="user-content">
          <div class="user-tip"
            v-if="loginFlag">
            <button class="user-btn">
              <router-link to="/login">登陆</router-link>
            </button>
            <button class="user-btn">
              <router-link to="/register">注册</router-link>
            </button>
          </div>
          <div class="user-msg"
            v-if="!loginFlag"
            @click="toMyEssay">
            <div class="user-img-wrapper"
              v-if="userObj">
              <img v-if="!userObj.authorAvatar"
                class="user-img"
                src="../assets/images/avater-icon.png">
              <img v-else
                class="user-img"
                :src="`${path}${userObj.authorAvatar}`">
            </div>
            <span class="user-name"
              v-if="userObj">{{userObj.author}}</span>
          </div>
          <div v-if="!loginFlag"
            class="quitBtn"
            @click="quitLogin">退出登陆</div>
        </div>
      </nav>
    </div>
  </div>
</template>
<script>
import { getUserDetailMsg, path } from "@/http.js";
export default {
  data() {
    return {
      path,
      loginFlag: true,
      userObj: {},
      _id: "",
      searchContent: ""
    };
  },
  props: {
    index: { type: String },
    userMsgChange: {
      type: Boolean,
      default: true
    }
  },
  async created() {
    let msg = localStorage.getItem("userMsg")
      ? localStorage.getItem("userMsg")
      : this.getCookie("userMsg")
      ? this.getCookie("userMsg")
      : "";
    // 已经登陆
    if (msg) {
      let _id = JSON.parse(msg)[0].authorId;
      this._id = _id;
      let result = await getUserDetailMsg(_id); // 获取用户头像和昵称
      //  已经登陆
      if (result.data.code == 0) {
        this.loginFlag = false;
        this.userObj = result.data.data;
        console.log(1, this.userObj);
        sessionStorage.setItem("author", this.userObj.author);
      }
    } else {
      this.loginFlag = true;
    }
  },
  methods: {
    search() {
      this.$router.push({ path: `/search/${this.searchContent}/1` });
    },
    toMyEssay() {
      this.$router.push({ name: "myEssay", query: { _id: this._id } });
    },
    quitLogin() {
      //清除保存的个人信息
      localStorage.removeItem("userMsg");
      this.delCookie("userMsg");
      this.loginFlag = !this.loginFlag;
      // console.log(localStorage.getItem("userMsg"));
      // console.log(this.getCookie("userMsg"));
      this.$router.push("/login");
    },
    // 获取cookie
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    },
    //清除cookie
    delCookie(key) {
      var date = new Date();
      date.setTime(date.getTime() - 1);
      var delValue = this.getCookie(key);
      if (!!delValue) {
        document.cookie =
          key + "=" + delValue + ";expires=" + date.toGMTString() + ";path=/";
      }
    }
  },
  watch: {
    async loginFlag() {
      let msg = localStorage.getItem("userMsg")
        ? localStorage.getItem("userMsg")
        : this.getCookie("userMsg")
        ? this.getCookie("userMsg")
        : "";
      // 已经登陆
      if (msg) {
        let _id = JSON.parse(msg)[0].authorId;
        let result = await getUserDetailMsg(_id);
        //  已经登陆
        if (result.data.code == 0) {
          this.loginFlag = false;
          this.userObj = result.data.data;
        }
      } else {
        this.loginFlag = true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  position: relative;
  height: 64px;
  background-color: rgb(0, 0, 0, 1);
  .header-content {
    margin: 0 auto;
    width: 1200px;
    height: 100%;
  }
  .nav-wrapper {
    position: relative;
    height: 64px;
  }
  .nav-ul {
    position: relative;
    display: inline-block;
    overflow: hidden;
    width: 560px;
    height: 64px;
    li {
      float: left;
      box-sizing: border-box;
      padding: 10px 0;
      margin-right: 20px;
      height: 100%;
      line-height: 44px;
      cursor: pointer;
      &:nth-child(5) {
        margin-right: 0;
      }
    }
    .web-title {
      position: relative;
      font-size: 32px;

      a {
        display: inline-block;
        width: 135px;
        height: 45px;
        color: #be100e;
        background: url("../assets/images/web-title.png") center no-repeat;
        background-size: 100%;
      }
    }
    .nav-li {
      color: #fff;
      font-size: 18px;
      &.nav-li-current {
        border-bottom: 2px solid #fff;
      }
    }
  }
  .search-content {
    position: relative;
    display: inline-block;
    width: 400px;
    height: 64px;
    line-height: 64px;
    vertical-align: top;
    .search-input {
      width: 0;
      box-sizing: border-box;
      border: none;
      box-sizing: border-box;
      height: 35px;
      font-size: 18px;
      outline: none;
      border-radius: 20px;
      transition: width 1s;
      &:focus {
        width: 400px;
        padding: 0 20px;
      }
    }
    &:hover {
      .search-input {
        width: 400px;
        padding: 0 20px;
      }
    }
    .seacrh-btn {
      cursor: pointer;
      position: absolute;
      left: -20px;
      top: 18px;
      width: 20px;
      height: 30px;
      border: none;
      background: url(../assets/images/nav_search.png) no-repeat center;
    }
  }
  .user-content {
    position: relative;
    float: right;
    height: 64px;
    line-height: 64px;
    .user-btn {
      height: 62px;
      cursor: pointer;
      font-size: 18px;
      color: #fff;
      border: none;
      outline: none;
      background-color: #000;
      &:hover {
        border-bottom: 2px solid #fff;
      }
    }
    .user-msg {
      display: inline-block;
      width: 125px;
      height: 64px;
      cursor: pointer;
      .user-img-wrapper {
        display: inline-block;
        width: 40px;
        height: 40px;
        margin-top: 12px;
        border-radius: 50%;
        vertical-align: top;
        background: url("../assets/images/avater-icon.png") center no-repeat;
      }
      .user-img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: top;
      }
      .user-name {
        display: inline-block;
        width: 85px;
        color: #fff;
        font-size: 16px;
        line-height: 64px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .quitBtn {
      position: absolute;
      z-index: 9999;
      left: 150%;
      top: 0;
      width: 64px;
      height: 64px;
      line-height: 64px;
      font-size: 14px;
      color: #fff;
      cursor: pointer;
      &:hover {
        color: rgb(230, 141, 100);
      }
    }
  }
}
</style>

