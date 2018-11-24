<template>
  <div class="login">
    <m-head/>
    <div class="login-main">
      <div class="login-main-view">
        <img src="../../assets/images/login.png" alt="">
        <h1>EBooking System</h1>
        <el-input v-model="form.name" placeholder="Unique login code">
          <i slot="suffix" class="iconfont">&#xe653;</i>
        </el-input>
        <el-input v-model="form.pwd" placeholder="Password">
          <i slot="suffix" class="iconfont">&#xe7b8;</i>
        </el-input>
        <el-button @click="handleSubmit">Sign In</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import mHead from '@/components/mHead'

  export default {
    name: "login",
    components: {mHead},
    data() {
      return {
        form: {
          name: '',
          pwd: ''
        }
      }
    },
    created() {

    },
    methods: {
      handleSubmit() {
        console.log(this.form)
        this.$router.push({path:'/home'});
      }
    }
  }
</script>

<style scoped lang="scss">
  .login {
    width: 100%;
    height: 100%;
    position: relative;
    &-main {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      &-view {
        padding: 80px 140px 90px;
        box-sizing: border-box;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -275px;
        margin-left: -390px;
        width: 780px;
        height: 550px;
        line-height: 20px;
        border-radius: 20px;
        text-align: center;
        box-shadow: 2px 2px 20px 0px rgba(204, 204, 204, 1);
        border: 1px solid rgba(255, 255, 255, 0);
        img {
          width: 229px;
          height: 24px;
          margin-bottom: 40px;
        }
        h1 {
          font-size: 36px;
          margin-bottom: 80px;
        }
        .el-input {
          margin-bottom: 20px;
        }
        .el-button {
          width: 100%;
          height: 50px;
          color: #fff;
          font-size: 24px;
          background-color: rgba(255, 160, 0, 1);
          border: 0;
          -webkit-border-radius: 8px;
          -moz-border-radius: 8px;
          border-radius: 8px;
        }
      }
    }
  }
</style>
