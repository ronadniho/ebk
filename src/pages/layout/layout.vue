<template>
  <div class="layout">
    <m-head>
      <div slot="admin" class="admin">
        <dropdown/>
      </div>
    </m-head>
    <el-container>
      <left-aside/>
      <right-main/>
    </el-container>
  </div>
</template>

<script>
  import {TopHead, LeftAside, RightMain} from './components'
  import {MHead, Dropdown} from '@/components'

  export default {
    name: "layout",
    components: {TopHead, LeftAside, RightMain, MHead, Dropdown},
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
      height: 45px;
      line-height: 45px;
      &:hover {
        cursor: pointer;
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
