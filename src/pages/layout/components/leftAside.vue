<template>
  <el-aside width="250px">
    <el-menu
      :mode="elMenu.mode"
      :default-active="defaultActive"
      :show-timeout="elMenu.showTimeout"
      :text-color="elMenu.textColor"
      :active-text-color="elMenu.activeTextColor"
      :background-color="elMenu.backgroundColor"
    >

      <!--<el-submenu index="admin">
        <template slot="title">
          <i class="iconfont">&#xe60e;</i>
          <span>Administration</span>
        </template>

        <el-menu-item index="myHotel">
          <router-link :to="'/home/administration/myHotel'">My Hotel</router-link>
        </el-menu-item>

      </el-submenu>

      <el-submenu index="setting">
        <template slot="title">
          <i class="iconfont">&#xe61c;</i>
          <span>Settings</span>
        </template>

        <el-menu-item index="myAccount">
          <router-link :to="'/home/settings/myAccount'">My Account</router-link>
        </el-menu-item>

      </el-submenu>-->

      <el-submenu
        v-for="(item ,index) in elMenu.asideList"
        :key="item.id"
        v-if="item.children"
        :index="item.index">

        <template slot="title">
          <i class="iconfont" v-html="item.icon"></i>
          <span>{{item.titles}}</span>
        </template>
        <el-menu-item
          v-for="child in item.children"
          :key="child.id"
          :index="child.index">
          <router-link :to="child.path">{{child.titles}}</router-link>
        </el-menu-item>

      </el-submenu>

    </el-menu>
  </el-aside>
</template>

<script>
  const ASIDE = [
    {
      id: '0',
      index: 'admin',
      titles: 'Administration',
      icon:'&#xe60e;',
      children: [
        {
          id: '0-1',
          index: 'myHotel',
          titles: 'My Hotel',
          path: '/home/administration/myHotel'
        }
      ]
    },
    {
      id: '1',
      index: 'setting',
      titles: 'Settings',
      icon:'&#xe61c;',
      children: [
        {
          id: '1-1',
          index: 'myAccount',
          titles: 'My Account',
          path: '/home/settings/myAccount'
        }
      ]
    }
  ]
  export default {
    name: "leftAside",
    data() {
      return {
        elMenu: {
          mode: 'vertical',
          showTimeout: 200,
          backgroundColor: '#005C45',
          textColor: '#fff',
          activeTextColor: '#ffd04b',
          asideList: ASIDE,
        }
      }
    },
    computed:{
      defaultActive(){
        return this.$store.state.aside.defaultActive
      }
    },
    methods: {
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
