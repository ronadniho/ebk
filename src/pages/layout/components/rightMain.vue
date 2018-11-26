<template>
  <el-container>
    <transition name="fade-transform" mode="out-in">
      <router-view/>
    </transition>
  </el-container>
</template>

<script>
  export default {
    name: "rightMain"
  }
</script>

<style scoped lang="scss">
  .el-container {
    padding: 20px;
    padding-top: 30px !important;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
</style>
