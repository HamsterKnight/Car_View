<template>
  <div class="person-components-header">
    <div class="person-components-content">
      <div class="img-wrapper">

        <img v-if="userMsg && userMsg.authorAvatar"
          :src="`${path}${userMsg.authorAvatar}`"
          alt="">
        <img v-else
          src="../../assets/images/avater-icon.png"
          alt="">
      </div>
      <div class="name-wrapper"> <span v-if="userMsg"
          class="name">{{userMsg.author}}</span> </div>
      <!-- <div class="focus-wrapper"> <span class="word">已关注</span></div> -->
      <div class="other-msg">
        <div class="articleCount">
          <span class="tip">文章</span>
          <span class="count"
            v-if="userMsg">{{userMsg.articleCount}}</span>
        </div>
        <div class="focusCount">
          <span class="tip">关注</span>
          <span class="count"
            v-if="userMsg">{{userMsg.focusCount ? userMsg.focusCount: 0}}</span>
        </div>
        <div class="fensCount">
          <span class="tip">粉丝</span>
          <span class="count"
            v-if="userMsg">{{userMsg.fensCount ? userMsg.fensCount : 0}}</span>
        </div>
      </div>
    </div>
    <div class="person-components-tab-wrapper">
      <ul class="person-components-tab">
        <li :class="['person-components-tab-item', active == '1' ? 'active': '']">
          <router-link to="/person/myEssay">我的文章</router-link>
        </li>
        <li :class="['person-components-tab-item', active == '2' ? 'active': '']">
          <router-link to="/person/myFans">我的粉丝</router-link>
        </li>
        <li :class="['person-components-tab-item', active == '3' ? 'active': '']">
          <router-link to="/person/myFocus">我的关注</router-link>
        </li>
        <li :class="['person-components-tab-item', active == '4' ? 'active': '']">
          <router-link to="/person/myMessage">个人信息</router-link>
        </li>
        <li :class="['person-components-tab-item', active == '5' ? 'active': '']">
          <router-link to="/person/changePassword">修改密码</router-link>
        </li>
        <li :class="['person-components-tab-item', active == '6' ? 'active': '']">
          <router-link to="/person/changeSecretProtection">修改密保</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getUserDetailMsg, path } from "@/http.js";
export default {
  props: {
    active: {
      type: String,
      default: "1"
    }
  },
  data() {
    return {
      authorId: "",
      userMsg: null,
      path
    };
  },
  async created() {
    // 获取用户id
    let msg = localStorage.getItem("userMsg")
      ? localStorage.getItem("userMsg")
      : this.getCookie("userMsg")
      ? this.getCookie("userMsg")
      : "";
    // 获取用户id
    if (msg) {
      this.authorId = JSON.parse(msg)[0].authorId;
      let result = await getUserDetailMsg(this.authorId);
      this.userMsg = result.data.data;
      console.log(222222, this.userMsg);
    }
  },
  methods: {
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    }
  }
};
</script>

<style lang="less" scoped>
.person-components-header {
  .person-components-content {
    height: 400px;
    background: url("../../assets/images/person-bg.png") center no-repeat;
    .img-wrapper {
      display: inline-block;
      width: 100%;
      margin-bottom: 20px;
      margin-top: 40px;
      height: 130px;
      text-align: center;
      img {
        height: 130px;
        width: 130px;
        border-radius: 50%;
      }
    }
    .name-wrapper {
      margin-bottom: 15px;
      height: 23px;
      font-size: 24px;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      text-align: center;
      .name {
        line-height: 23px;
      }
    }
    .focus-wrapper {
      margin-bottom: 50px;
      text-align: center;
      cursor: pointer;
      .word {
        display: inline-block;
        width: 80px;
        height: 30px;
        background: url("../../assets/images/focus-bg.png") center no-repeat;
        line-height: 30px;
        color: #fff;
      }
    }
    .other-msg {
      text-align: center;
      font-size: 18px;
      color: #fff;
      .articleCount {
        position: relative;
        display: inline-block;
        margin-right: 40px;
        width: 80px;
        height: 80px;
      }
      .focusCount {
        position: relative;
        display: inline-block;
        margin-right: 40px;
        width: 80px;
        height: 80px;
      }
      .fensCount {
        position: relative;
        display: inline-block;
        width: 80px;
      }
      .tip {
        display: inline-block;
        width: 100%;
        margin-bottom: 15px;
        opacity: 0.6;
      }
    }
  }
  .person-components-tab-wrapper {
    background-color: #fff;
    .person-components-tab {
      position: relative;
      margin: 0 auto;
      width: 1200px;
      height: 50px;
      overflow: hidden;
      text-align: center;
      .person-components-tab-item {
        display: inline-block;
        margin-right: 30px;
        width: 120px;
        height: 100%;
        line-height: 50px;
        font-size: 18px;
        font-weight: 500;
        color: rgba(18, 18, 18, 1);
        text-align: center;
        cursor: pointer;
        a {
          color: #000;
        }
        &:last-child {
          margin-right: 0;
        }
        &.active {
          background: url("../../assets/images/person-tab.png") center no-repeat;
        }
        &.active a {
          color: #fff;
        }
      }
    }
  }
}
</style>
