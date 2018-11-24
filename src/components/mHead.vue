<template>
  <div class="mHead">
    <img src="../assets/images/logo.png" alt="">
    <span>EBooking System </span>
    <slot name="admin"></slot>
  </div>
</template>

<script>
  export default {
    name: "mHead"
  }
</script>

<style scoped lang="scss">
  .mHead{
    width: 100%;
    padding: 0 19px;
    box-sizing: border-box;
    height: 45px;
    background-color: #009d79;
    position: fixed;
    z-index: 2000;
    img{
      vertical-align: middle;
    }
    span {
      color:#fff;
      font-size: 18px;
      vertical-align: middle;
    }

  }
</style>
