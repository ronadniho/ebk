<template>
  <div class="myAccount">
    <el-row>
      <el-col :span="24">
        <div class="myAccount-title">Hotel information</div>
      </el-col>
    </el-row>

    <el-row class="myAccount-item">
      <el-col :span="6" class="myAccount-item-title">Login Code</el-col>
      <el-col :span="18">HEG1234345</el-col>
    </el-row>
    <el-row class="myAccount-item" v-if="!editing">
      <el-col :span="6" class="myAccount-item-title">Password</el-col>
      <el-col :span="18">
        <span>*****************</span>
        <el-button class="btn-success" @click="handleEdit">Edit</el-button>
      </el-col>
    </el-row>
    <el-row class="myAccount-item" v-else>
      <el-col :span="6" class="myAccount-item-title">New Password</el-col>
      <el-col :span="18">
        <el-row>
          <el-col :span="14">
            <el-input></el-input>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6" class="myAccount-item-title">Reinput</el-col>
      <el-col :span="18">
        <el-row>
          <el-col :span="14" style="margin:0;">
            <el-input></el-input>
          </el-col>
          <el-col :span="8" style="margin:0;padding-left: 40px;box-sizing: border-box;">
            <el-button
              class="btn-success-space"
              @click="handleCancel"
            >Cancel</el-button>
            <el-button
              class="btn-warning"
              @click="handleConfirm"
            >Confirm</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="myAccount-item">
      <el-col :span="6" class="myAccount-item-title">QR code</el-col>
      <el-col :span="18">
        <img src="../../../../../../assets/images/code.jpg" alt="">
        <el-button class="btn-success">Download</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "myAccount",
    data() {
      return {
        editing: false,
      }
    },
    methods: {
      handleEdit() {
        this.editing = !this.editing;
      },
      handleCancel(){
        this.handleEdit();
      },
      handleConfirm(){
        this.handleEdit();
      }
    }
  }
</script>

<style scoped lang="scss">
  .myAccount {
    width: 100%;
    height: 100%;
    &-title {
      width: 100%;
      height: 50px;
      line-height: 50px;
      background-color: rgba(11, 157, 120, 0.1);
      color: #0B9F8C;
      font-size: 14px;
      border: 1px solid rgba(255, 255, 255, 0);
      padding: 0 18px;
      box-sizing: border-box;
    }
    &-item {
      padding: 0 17px;
      box-sizing: border-box;
      height: 26px;
      line-height: 26px;
      font-size: 18px;
      &:nth-child(2) {
        margin-top: 15px;
      }
      &-title {
        color: rgb(153, 153, 153);
      }
      > .el-col {
        margin: 15px 0;
        &-18 {
          position: relative;
          span {
            margin-right: 30px;
          }
          img {
            width: 263px;
            height: 262px;
            margin-right: 20px;
            & + .el-button {
              position: absolute;
              bottom: 30px;
            }
          }
        }
      }
    }
  }
</style>
