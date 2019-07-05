<template>
  <div class="my-pagination">
    <el-pagination @size-change="handleSizeChange"
      background
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="limit"
      :page-count="pageCount"
      layout="prev, pager, next"
      prev-text="上一页"
      next-text="下一页">
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 7
    },
    pageCount: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleCurrentChange(page) {
      this.$emit("pageChange", page);
    },
    handleSizeChange(limit) {
      this.$emit("limitChange", limit);
    }
  }
};
</script>
<style lang="less">
.my-pagination {
  display: inline-block;
  margin-top: 20px;

  text-align: right;
  .el-pager {
    .number {
      width: 42px;
      height: 43px;
      line-height: 43px;
      border: 1px solid #000;
      color: #000 !important;
      &.active {
        color: #fff !important;
        border-bottom: 2px solid #be001e;
        background-color: #000 !important;
      }
    }
  }
  .btn-next,
  .btn-prev {
    width: 82px;
    height: 43px;
    font-weight: bold;
    text-align: center;
    border: 1px solid #000;
    color: #000 !important;
    &:hover {
      color: #fff !important;
      border-bottom: 2px solid #be001e;
      background-color: #000 !important;
    }
  }
}
</style>

