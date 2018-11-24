<template>
  <el-container>
    <router-view/>
  </el-container>
</template>

<script>
  export default {
    name: "rightMain"
  }
</script>

<style scoped lang="scss">
  .el-container{
    padding: 20px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
</style>
