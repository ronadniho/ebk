<template>
  <el-aside width="250px">
    <el-menu
      :mode="elMenu.mode"
      :default-active="elMenu.defaultActive"
      :show-timeout="elMenu.showTimeout"
      :text-color="elMenu.textColor"
      :active-text-color="elMenu.activeTextColor"
      :background-color="elMenu.backgroundColor"
      class="el-menu-vertical-demo"
    >

      <el-submenu index="0">
        <template slot="title">
          <i class="iconfont">&#xe60e;</i>
          <span>Administration</span>
        </template>

        <el-menu-item index="0-1">
          <router-link :to="'/home/administration/myHotel'">My Hotel</router-link>
        </el-menu-item>

      </el-submenu>

      <el-submenu index="1">
        <template slot="title">
          <i class="iconfont">&#xe61c;</i>
          <span>Settings</span>
        </template>

        <el-menu-item index="1-1">
          <router-link :to="'/home/settings/myAccount'">My Account</router-link>
        </el-menu-item>

      </el-submenu>

    </el-menu>
  </el-aside>
</template>

<script>
  export default {
    name: "leftAside",
    data() {
      return {
        elMenu: {
          mode:'vertical',
          defaultActive: '0-1',
          showTimeout: 200,
          backgroundColor: '#005C45',
          textColor: '#fff',
          activeTextColor: '#ffd04b'
        }
      }
    },
    methods: {
      // handleOpen(key, keyPath) {
      //   console.log(key, keyPath);
      // },
      // handleClose(key, keyPath) {
      //   console.log(key, keyPath);
      // }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../../style/element-variables';

  .iconfont {
    color: #fff;
  }

  .el-aside {
    background-color: $--color-primary;
    .el-menu {
      width: 100%;
      border: 0;
      .el-menu-item {
        padding: 0 !important;
        a {
          display: block;
          padding-left: 45px;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
        }
      }
    }
    .is-active {
      background-color: #0B9D78 !important;
      padding: 0 !important;
      a {
        padding-left: 40px;
        display: block;
        width: 100%;
        height: 100%;
        min-width: 200px;
        padding: 0 45px;
        box-sizing: border-box;
      }
    }
  }
</style>
