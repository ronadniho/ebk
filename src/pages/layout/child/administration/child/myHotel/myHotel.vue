<template>
  <div class="myHotel">
    <el-row class="myHotel-dataPricker">
      <div class="myHotel-title">Current Price</div>

      <el-row>
        <el-col :span="6" class="title">Choose the room</el-col>
        <el-col :span="18">
          <!--<el-select v-model="select.default" placeholder="">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>-->
        </el-col>
      </el-row>

      <el-row class="action">
        <el-col :span="9"></el-col>
        <el-col :span="6">
          <el-row class="year">
            <el-col :span="4">
              <button class="iconfont" @click="handlePrev" :class="{'disabled':actionBtnStatus.prevBtn}">&#xe622;</button>
            </el-col>
            <el-col :span="16">{{currentDate}}</el-col>
            <el-col :span="4">
              <button class="iconfont" @click="handleNext" :class="{'disabled':actionBtnStatus.nextBtn}">&#xe618;</button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="9">
          <el-button class="btn-warning">Batch modification price</el-button>
        </el-col>
      </el-row>

      <el-row>
        <date-picker
          :param="condition"></date-picker>

      </el-row>

    </el-row>

    <el-row class="myHotel-info">
      <div class="myHotel-title">Hotel information</div>
      <el-row>
        <el-col :span="6" class="title">City</el-col>
        <el-col :span="18">New Delhi</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="title">Hotel Name</el-col>
        <el-col :span="18">The Park New Delhi</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="title">Address</el-col>
        <el-col :span="18">15, Parliament Street, Cannaught Palace Delhi India</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="title">Stars</el-col>
        <el-col :span="18">5</el-col>
      </el-row>
    </el-row>

    <el-row class="myHotel-rooms">
      <div class="myHotel-title">Rooms</div>
      <el-row class="rooms-title">
        <el-col :span="6">Room type</el-col>
        <el-col :span="18">Rateplan</el-col>
      </el-row>
      <el-row class="rooms-item">


        <el-col :span="5" class="room-type edited" v-if="false">
          <p>Deluxe Room - Non Smoking</p>
          <p>No WiFi</p>
          <div>
            <el-button class="btn-success" style="width:140px;">Edit  the  room</el-button>
          </div>
          <div>
            <el-button class="btn-danger-space" style="width:140px;">Delete  the  room</el-button>
          </div>
        </el-col>
        <el-col :span="5" class="room-type editing">
          <p>
            <el-input></el-input>
          </p>
          <el-row class="check-wifi">
            <el-col :span="10">
              <input type="checkbox" id="room-wifi-cb">
              <label for="room-wifi-cb"></label>
            </el-col>
            <el-col :span="14">
              Free WiFi
            </el-col>

          </el-row>
          <el-row class="room-btn-group">
            <el-col :span="24">
              <el-button class="btn-warning">Confirm</el-button>
            </el-col>
            <el-col :span="24">
              <el-button class="btn-success-space">Cancel</el-button>
            </el-col>
          </el-row>

        </el-col>


        <el-col :span="19">
          <el-row>

            <el-col :span="24">
              <el-row>
                <el-col :span="16">
                  Deluxe Room - Non Smoking
                </el-col>
                <el-col :span="8">
                  <el-button class="btn-warning" @click="handleAddPrice">Add the price</el-button>
                </el-col>
              </el-row>
            </el-col>

            <el-col :span="24">
              <el-row>
                <el-col :span="16">
                  Deluxe Room  - Non Smoking  with Breakfast
                </el-col>
                <el-col :span="8">
                  <button class="btn-success">Edit the price</button>
                  <button class="btn-danger-space">Delete the price</button>
                </el-col>
              </el-row>
            </el-col>

          </el-row>
        </el-col>
      </el-row>
    </el-row>

    <!--添加房型-->
    <el-row class="myHotel-add-roomsType">
      <el-col :span="12">
        <el-input placeholder="Please enter room type name"></el-input>
      </el-col>
      <el-col :span="6">
        <el-row class="add-checkbox">
          <el-col :span="10">
            <input type="checkbox" id="add-room-cb">
            <label for="add-room-cb"></label>
          </el-col>
          <el-col :span="14">Free WiFi</el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-button class="btn-warning" style="width: 80px;">Add</el-button>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import {datePicker} from '@/components'

  const Y = new Date().getFullYear();
  const M = new Date().getMonth();
  const D = new Date().getDate();

  export default {
    name: "myHotel",
    components: {datePicker},
    data() {
      return {
        condition: {
          currentDate: new Date(Y, M, 1),
          minDate: new Date(Y, M, D),
          maxDate: new Date(Y + 1, M, D),
        },
        action: {
          prevBtn: true,
          nextBtn: false,
        }
      }
    },
    computed: {
      currentDate() {
        return `${this.trueSelectMonths(this.condition.currentDate.getMonth() + 1)} ${this.condition.currentDate.getFullYear()}`;
      },
      actionBtnStatus() {//计算上下月按钮状态
        let CT = this.condition.currentDate;
        let MaxT = this.condition.maxDate;
        let MinT = this.condition.minDate;
        if (CT.getFullYear() === MaxT.getFullYear() && CT.getMonth() === MaxT.getMonth()) {
          this.action.prevBtn = false;
          this.action.nextBtn = true;
        }else if(CT.getFullYear() === MinT.getFullYear() && CT.getMonth() === MinT.getMonth()){
          this.action.prevBtn = true;
          this.action.nextBtn = false;
        }else{
          this.action.prevBtn = false;
          this.action.nextBtn = false;
        }
        return {prevBtn:this.action.prevBtn,nextBtn: this.action.nextBtn};
      }
    },
    methods: {
      trueSelectMonths(v) {
        switch (v) {
          case 1:
            return 'January';
            break;
          case 2:
            return 'February';
            break;
          case 3:
            return 'March';
            break;
          case 4:
            return 'April';
            break;
          case 5:
            return 'May';
            break;
          case 6:
            return 'June';
            break;
          case 7:
            return 'July';
            break;
          case 8:
            return 'August';
            break;
          case 9:
            return 'September';
            break;
          case 10:
            return 'October';
            break;
          case 11:
            return 'November';
            break;
          case 12:
            return 'December';
            break;
        }
      },
      handleNext() {
        let CT = this.condition.currentDate;
        let MT = this.condition.maxDate;
        if (CT.getFullYear() === MT.getFullYear() && CT.getMonth() === MT.getMonth()) {
          return;
        }
        this.action.prevBtn = false;
        this.action.nextBtn = false;
        let Y = parseInt(this.condition.currentDate.getFullYear());
        let M = parseInt(this.condition.currentDate.getMonth());
        if (M + 1 == 12) {
          Y++;
          M = 0;
        } else {
          M++;
        }
        this.condition.currentDate = new Date(Y, M);
      },
      handlePrev() {
        let CT = this.condition.currentDate;
        let MT = this.condition.minDate;
        if (CT.getFullYear() === MT.getFullYear() && CT.getMonth() === MT.getMonth()) {
          return;
        }
        this.action.prevBtn = false;
        this.action.nextBtn = false;
        let Y = parseInt(this.condition.currentDate.getFullYear());
        let M = parseInt(this.condition.currentDate.getMonth());
        if (M - 1 == 0) {
          Y--;
          M = 12;
        } else {
          M--;
        }
        this.condition.currentDate = new Date(Y, M);
      },
      handleAddPrice() {
        this.$router.push({
          path: '/home/administration/addPrice'
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../../../../../style/variables';

  .myHotel {
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
    .el-col {
      height: 56px;
      line-height: 56px;
      font-size: 18px;
      color: rgba(51, 51, 51, 1);
      &.title {
        padding: 0 18px;
        box-sizing: border-box;
        color: rgba(153, 153, 153, 1);
      }
    }
    &-dataPricker {
      .title {
        padding: 0 18px;
        box-sizing: border-box;
        color: rgba(153, 153, 153, 1);
      }
      .action {
        height: 32px;
        margin-bottom: 26px;
        .el-col {
          height: 100%;
          line-height: 0;
          &-9 {
            text-align: right;
          }
          .year {
            display: flex;
            justify-content: space-between;
            .el-col {
              line-height: 32px;
              &-4 {
                text-align: left;
                &:last-child {
                  text-align: right;
                }

                button {
                  border: 0;
                  background-color: #fff;
                  width: 24px;
                  height: 24px;
                  padding: 0;
                  margin: 0;
                  &.disabled {
                    color: #ddd;
                  }
                  &:not(.disabled):hover {
                    cursor: pointer;
                  }
                }
              }
              &-16 {
                text-align: center;
                color: rgba(11, 157, 120, 1);
                font-size: 20px;
              }
            }
          }
        }
      }
    }
    &-info {
      margin-bottom: 15px;
    }
    &-rooms {
      .rooms-title {
        text-align: center;
        border-bottom: 1px solid rgba(187, 187, 187, 1);
        .el-col {
          color: rgb(153, 153, 153);

        }
      }
      .rooms-item {
        border-bottom: 1px solid rgba(187, 187, 187, 1);
        .room-type {
          height: 100%;
          text-align: center;
          padding: 40px 10px 20px;
          box-sizing: border-box;
          &.editing {
            position: relative;
            .room-btn-group {
              position: absolute;
              bottom: 20px;
              height: 71px;
              .el-col {
                height: 31px;
                line-height: 31px;
                &:first-child {
                  margin-bottom: 10px;
                }
              }
              .el-button {
                width: 140px;
                height: 31px;
              }
            }
          }
          p {
            &:first-child {
              color: rgb(51, 51, 51);
              font-size: 18px;
              height: 26px;
              line-height: 26px;
              margin-bottom: 42px;
            }
            &:nth-child(2) {
              height: 26px;
              line-height: 26px;
              color: rgb(51, 51, 51);
              font-size: 18px;
              margin-bottom: 20px;
            }
          }
          .check-wifi {
            height: 30px;
            .el-col {
              height: 100%;
              line-height: 30px;
              &:first-child {
                position: relative;
                label {
                  position: absolute !important;
                  right: 20px;
                }
              }
              &:last-child {
                text-align: left;
              }
            }
          }
          > div {
            height: 31px;
            line-height: 31px;
            color: #0B9D78;
            font-size: 18px;
            margin-bottom: 10px;
            .el-button {
              height: 100%;
            }
          }
        }
        > .el-col:first-child {
          height: 264px;
          border-right: 1px solid rgba(187, 187, 187, 1);
        }
        > .el-col:last-child {
          height: 264px;
          .el-row {
            height: 100%;
            > .el-col {
              color: rgb(16, 16, 16);
              height: 50%;
              line-height: 132px;
              box-sizing: border-box;
              padding-left: 40px;
              &:first-child:not(.el-col-16) {
                border-bottom: 1px solid rgba(187, 187, 187, 1);
              }
              &.el-col-16, &.el-col-8 {
                height: 100%;
                padding: 0;
              }
            }
          }
        }
      }
    }
    &-add-roomsType {
      .el-col-6:nth-child(2) {
        text-align: center;
        .add-checkbox {
          .el-col {
            position: relative;
            text-align: left;
            label {
              position: absolute !important;
              right: 20px;
              top: 50%;
              margin-top: -15px;
            }
          }
        }
      }
    }
  }
</style>
