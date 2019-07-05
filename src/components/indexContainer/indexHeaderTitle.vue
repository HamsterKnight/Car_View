<template>
  <div :class="[ retangleType === '1' ? '': 'black', 'index-Header-title']">
    <div :class="[ retangleType === '1' ? '': 'black', 'title']">{{title}}</div>
    <div class="rectangle">
      <span :class="[ retangleType === '1' ? '': 'black', 'left-tangle']"></span>
      <span :class="[ retangleType === '1' ? '': 'black',  'alphaTitle']">{{alphaTitle}}</span>
      <span :class="[ retangleType === '1' ? '': 'black', 'right-tangle']"></span></div>
  </div>
</template>
<script>
export default {
  props: {
    retangleType: {
      type: String,
      default: "1"
    },
    title: {
      type: String,
      default: "今日车闻"
    },
    alphaTitle: {
      type: String,
      default: "NEWS"
    }
  }
};
</script>
<style lang='less' scoped>
.index-Header-title {
  position: relative;
  padding-top: 39px;
  width: 100%;
  background-color: #be001e;
  &.black {
    background-color: rgb(240, 237, 237);
  }
  .title {
    width: 100%;
    height: 35px;
    text-align: center;
    font-size: 36px;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    letter-spacing: 15px;
    &.black {
      color: #000;
    }
  }
  .rectangle {
    position: relative;
    width: 100%;
    text-align: center;
    letter-spacing: 15px;
    .left-tangle {
      display: inline-block;
      margin-right: 15px;
      width: 0;
      height: 0;
      font-size: 0;
      border: 5px solid #000;
      border-color: transparent transparent transparent #fff;
      &.black {
        color: #000;
        border-color: transparent transparent transparent #000;
      }
    }
    .right-tangle {
      display: inline-block;
      width: 0;
      height: 0;
      font-size: 0;
      border: 5px solid #000;
      border-color: transparent #fff transparent transparent;
      &.black {
        border-color: transparent #000 transparent transparent;
      }
    }
    .alphaTitle {
      height: 12px;
      font-size: 14px;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      line-height: 48px;
      &.black {
        color: #000;
      }
    }
  }
}
</style>
