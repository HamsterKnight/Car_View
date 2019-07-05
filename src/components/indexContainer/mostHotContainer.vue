<template>
  <div class="most-hots-container">
    <p class="hots-title">
      最热文章
    </p>
    <div class="border-decoration">
      <div class="img-container">
        <img src="../../assets/images/ad1.png"
          alt="">
        <p class="title">小个子别硬凹 还有这些时髦短外套等你</p>
      </div>
      <div class="other-news">
        <ul class="other-news-ul">
          <li class="other-news-li"
            v-for="(item, index) in hotsList"
            :key="index"
            v-if="index > 1"> <a :href="`/articleDetail/${item._id}`">
              {{item.articleTitle}}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    hotsList: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>
<style lang="less">
.most-hots-container {
  position: relative;
  width: 370px;
  height: 450px;
  box-sizing: border-box;
  padding: 0 31px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0);
  .hots-title {
    margin: 19px 0;
    height: 20px;
    font-weight: bold;
    color: rgba(0, 0, 0, 1);
    line-height: 20px;
    text-align: center;
  }
  .border-decoration {
    position: absolute;
    left: 31px;
    top: 68px;
    width: 350px;
    height: 390px;
    box-sizing: border-box;
    border-right: 10px solid #be001e;
    border-bottom: 10px solid #be001e;
    .img-container {
      position: relative;
      box-sizing: border-box;
      width: 310px;
      border-bottom: 1px solid #ccc;
      img {
        width: 310px;
        height: 174px;
      }
      .title {
        margin: 15px 0;
        width: 100%;
        height: 40px;
        font-size: 16px;
        font-weight: bold;
        color: rgba(0, 0, 0, 1);
        line-height: 48px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .other-news {
      margin-top: 19px;
      .other-news-ul {
        width: 310px;
        padding-left: 20px;
        .other-news-li {
          position: relative;
          width: 291px;
          height: 20px;
          margin-bottom: 10px;
          font-size: 16px;
          cursor: pointer;
          &::before {
            display: none;
            position: absolute;
            content: "";
            left: -20px;
            top: 5px;
            width: 8px;
            height: 8px;
            background: url("../../assets/images/hot-news-hover.png") center
              no-repeat;
          }

          &:hover {
            color: #be001e;
            &::before {
              display: block;
            }
          }
          a {
            color: #000;
            &:hover {
              color: #be001e;
            }
          }
        }
      }
    }
  }
}
</style>
