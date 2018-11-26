<template>
  <div
    class="dropdown"
    @mouseover="isShow=true"
    @mouseleave="isShow=false">
    <span class="iconfont">&#xe653;</span>
    <b>HEG-SWIFT012</b>
    <span class="iconfont">&#xe638;</span>
    <div class="dropdown-model" v-show="isShow">
      <em></em>
      <ul>
        <li @click="handleLogout">Log Out</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Dropdown",
    data() {
      return {
        isShow: false
      }
    },
    methods: {
      handleLogout() {

      }
    }
  }
</script>

<style scoped lang="scss">
  .dropdown {
    height: 100%;
    position: relative;
    b {
      color: #fff;
      font-size: 18px;
      margin: 0 20px 0 10px;
      font-weight: 400;
    }
    .iconfont {
      font-size: 24px;
      color: #fff;
    }
    .dropdown-model {
      position: absolute;
      left: 0;
      top: 45px;
      width: 100%;
      padding-top: 10px;
      background-color: #fff;
      em {
        position: absolute;
        top: 3px;
        right: 9px;
        z-index: 2000;
        width: 14px;
        height: 14px;
        border: 1px solid transparent;
        border-top-color: rgb(187, 187, 187);
        border-left-color: rgb(187, 187, 187);
        transform: rotate(45deg);
        background-color: #fff;
      }
      ul {
        width: 100%;
        border: 1px solid #ddd;
        li {
          width: 100%;
          padding: 0 20px;
          box-sizing: border-box;
          height: 66px;
          line-height: 66px;
          color: rgba(51, 51, 51, 1);
          font-size: 18px;
        }
      }
    }

  }
</style>
