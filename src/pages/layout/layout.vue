<template>
  <div class="layout">
    <!--<top-head></top-head>-->
    <m-head>
      <div slot="admin" class="admin">
        <span class="iconfont">&#xe653;</span>
        <b>HEG-SWIFT012</b>
        <span class="iconfont">&#xe638;</span>
      </div>
    </m-head>
    <el-container>
      <left-aside></left-aside>
      <right-main></right-main>
    </el-container>
  </div>
</template>

<script>
  import {TopHead, LeftAside, RightMain} from './components'
  import MHead from '@/components/mHead'

  export default {
    name: "layout",
    components: {TopHead, LeftAside, RightMain, MHead},
    data() {
      return {}
    }
  }
</script>

<style scoped lang="scss">
  .layout {
    width: 100%;
    height: 100%;
    .admin {
      float: right;
      height: 100%;
      line-height: 45px;
      &:hover {
        cursor: pointer;
      }
      b {
        color: #fff;
        font-size: 18px;
        margin: 0 20px 0 10px;
        font-weight: 400;
      }
      .iconfont {
        font-size: 24px;
      }
    }
    .el-container {
      height: 100%;
      padding-top: 45px;
      box-sizing: border-box;
      overflow-y: auto;
      .el-header {
        width: 100%;
      }
    }
  }
</style>
