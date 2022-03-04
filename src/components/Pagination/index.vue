<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      《上一页
    </button>
    <button
      v-show="startNumAndEndNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-show="startNumAndEndNum.start > 2">···</button>
    <!-- continues -->
    <button
      v-for="(item, index) in startNumAndEndNum.end"
      :key="index"
      v-show="item >= startNumAndEndNum.start"
      @click="$emit('getPageNo', item)"
      :class="{ active: pageNo == item }"
    >
      {{ item }}
    </button>

    <button v-if="startNumAndEndNum.end < totalPages - 1">···</button>
    <button
      v-if="startNumAndEndNum.end < totalPages"
      @click="$emit('getPageNo', totalPages)"
    >
      {{ totalPages }}
    </button>
    <button
      :disabled="pageNo == totalPages"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页》
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],

  computed: {
    totalPages() {
      return Math.ceil(this.total / this.pageSize);
    },

    startNumAndEndNum() {
      const { pageSize, pageNo, total, continues } = this;
      let start = 0,
        end = 0;
      if (continues > this.totalPages) {
        start = 1;
        end = this.totalPages;
      } else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        if (start < 1) {
          start = 1;
          end = continues;
        }
        if (end > this.totalPages) {
          end = this.totalPages;
          start = this.totalPages - continues + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>