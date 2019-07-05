<template>
  <div class="tag-container">
    <a :href="`/search/${tagObj.tagName}/1`">
      {{tagObj.tagName}}
    </a>
  </div>
</template>
<script>
export default {
  props: {
    tagObj: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  da() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.tag-container {
  display: inline-block;
  margin-right: 10px;
  height: 46px;
  padding: 0 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 46px;
  cursor: pointer;
  &:hover {
    border: 1px solid #be001e;
    background: url("../../assets/images/tag-bg.png") no-repeat 95% 90%;
    background-color: #fff;
  }
  a {
    color: #000;
  }
}
</style>

