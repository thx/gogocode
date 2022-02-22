<template>
  <div>
    <div class="box">
      <div class="top">
        <el-tooltip
          :hide-after="500"
          :auto-close="1000"
          :show-after="500"
          class="item"
          effect="dark"
          content="Top Left 提示文字"
          placement="top-start"
        >
          <el-button>上左</el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="Top Center 提示文字"
          placement="top"
        >
          <el-button>上边</el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="Top Right 提示文字"
          placement="top-end"
        >
          <el-button>上右</el-button>
        </el-tooltip>
      </div>
      <div class="left">
        <el-tooltip
          class="item"
          effect="dark"
          content="Left Top 提示文字"
          placement="left-start"
        >
          <el-button>左上</el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="Left Center 提示文字"
          placement="left"
        >
          <el-button>左边</el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="Left Bottom 提示文字"
          placement="left-end"
        >
          <el-button>左下</el-button>
        </el-tooltip>
      </div>

      <div class="right">
        <el-tooltip
          class="item"
          effect="dark"
          content="Right Top 提示文字"
          placement="right-start"
        >
          <el-button>右上</el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="Right Center 提示文字"
          placement="right"
        >
          <el-button>右边</el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="Right Bottom 提示文字"
          placement="right-end"
        >
          <el-button>右下</el-button>
        </el-tooltip>
      </div>
      <div class="bottom">
        <el-tooltip
          class="item"
          effect="dark"
          content="Bottom Left 提示文字"
          placement="bottom-start"
        >
          <el-button>下左</el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="Bottom Center 提示文字"
          placement="bottom"
        >
          <el-button>下边</el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="Bottom Right 提示文字"
          placement="bottom-end"
        >
          <el-button>下右</el-button>
        </el-tooltip>
      </div>
    </div>
    <div>
      <el-tooltip placement="top">
        <template v-slot:content>
          <div slot="content">多行信息<br />第二行信息</div>
        </template>
        <el-button>多行 slot</el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import * as Vue from 'vue'
export default {
  name: 'tool-tip',
  props: {
    msg: String,
  },
  data() {
    return {
      name: 'tool-tip',
      version: Vue.version,
    }
  },
}
</script>

<style lang="less" scoped>
.box {
  width: 400px;
  padding: 100px;
  .top {
    text-align: center;
  }

  .left {
    float: left;
    width: 60px;
  }

  .right {
    float: right;
    width: 60px;
  }

  .bottom {
    clear: both;
    text-align: center;
  }

  .item {
    margin: 4px;
  }

  .left .el-tooltip__popper,
  .right .el-tooltip__popper {
    padding: 8px 10px;
  }
}
</style>

<style scoped>
h1 {
  color: #64b587;
}
</style>
