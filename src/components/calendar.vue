<template>
  <div id="date-picker-group">
    <div>
      <el-row type="flex" class="row-bg s-row-yearMonth">
        <el-col :span="24">
          <div class="grid-content">
            <span>
               {{trueSelectMonths}} - {{selectYear}}
            </span>
            <!-- 批量修改 -->
            <add-price-form
              v-show="batchStatus"
              @close="close"
            >

            </add-price-form>


            <div class="batch-price">
              <button
                class="btn-success"
                @click="batchStatus=!batchStatus;">Batch modification price
              </button>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg s-row-title">
        <el-col :span="3" v-for="(item,index) in week" :key="index" class="s-col-l4">
          <div class="grid-content">
            {{item}}
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg flex-wrap s-row-body">


        <el-col
          :span="3"
          v-for="(item,index) in renderData"
          :key="index"
          class="s-col-l4"
          :class="{active:item.updateDialog||item.addDialog}"
        >
          <div class="grid-content"
               :class="{'disabled':(!item._date&&!item._ltStatus)?true:item._ltStatus?true:false}"
          >
            <div style="height:100%;" @click.stop="handleSelect(item,index)">
              <!-- 日期 -->
              <el-row>
                <el-col :span="24" class="date">
                  {{item._date}}
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <!-- <el-row>
                    <el-col :span="24">10209</el-col>
                  </el-row> -->
                  <el-row v-if="item._date&&item.priceStatus==2&&(item.currentPrice==0||item.currentPrice)">
                    <el-col :span="24" class="danger"><b>SOLDOUT</b></el-col>
                  </el-row>
                  <el-row v-if="item._date&&item.priceStatus==1&&(item.currentPrice==0||item.currentPrice>0)">
                    <el-col class="primary price">₹ {{item.currentPrice}}</el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>


            <!-- 修改弹框 -->
            <el-row
              v-if="item.updateDialog"
              class="grid-content-edit edit-u-price">
              <el-col :span="24">
                <div class="s-container">
                  <el-row :gutter="20">
                    <el-col :span="10" class="title">
                      {{item._date+'/'+utilMonth+'/'+selectYear}}
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" class="title">Current price</el-col>
                    <el-col :span="16">₹ {{item.currentPrice}}</el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" class="title">Change price</el-col>
                    <el-col :span="16">
                      <el-row>
                        <el-col :span="2">₹</el-col>
                        <el-col :span="11">
                          <el-input type="number" v-model="item.changePrice"></el-input>
                        </el-col>
                        <el-col :span="11" class="danger" v-if="item.priceInvalid">Invalid characters</el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8" class="title danger">SOLDOUT</el-col>
                    <el-col :span="16">
                      <div class="input-suffix">
                        <input
                          id="status"
                          type="checkbox"
                          v-model="item._priceStatus"
                          class="s-checkbox"/>
                        <label for="status"></label>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="24" style="margin-bottom: 0;">
                      <button
                        class="btn-success-space"
                        @click.stop="handleCancel(item)">Cancel
                      </button>
                      <button
                        class="btn-warning"
                        style="margin-left: 10px;"
                        @click.stop="handleUpdatePrice(item)">Submit
                      </button>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>

            <!-- 添加弹框 -->
            <el-row
              v-if="item.addDialog"
              class="grid-content-edit edit-a-price">
              <el-col :span="24">
                <div class="s-container">
                  <el-row :gutter="20">
                    <el-col :span="10">{{item._date+'/'+utilMonth+'/'+selectYear}}</el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8">Add the price</el-col>
                    <el-col :span="16">
                      <el-row>
                        <el-col :span="2">₹</el-col>
                        <el-col :span="11">
                          <el-input type="number" v-model="item.changePrice"></el-input>
                        </el-col>
                        <el-col :span="11" class="danger" v-if="item.priceInvalid">Invalid characters</el-col>
                      </el-row>
                    </el-col>
                  </el-row>

                  <el-row :gutter="20">
                    <el-col></el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col></el-col>
                  </el-row>


                  <el-row :gutter="20">
                    <el-col :span="24">
                      <button
                        class="btn-success-space"
                        @click.stop="handleCancel(item)">Cancel
                      </button>
                      <button
                        class="btn-warning"
                        style="margin-left: 10px;"
                        @click.stop="handleAddPrice(item)">Submit
                      </button>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Updateprice from '@/model/Updateprice'
  import AddPriceForm from '@/components/AddPriceForm'
  // import {updatePrice, addPrice} from '../../../../api/myHotels/price'
  // import {myHotelsMessage} from '../../../../utils/myHotelsMessage'
  import Cookie from 'js-cookie'

  export default {
    data() {
      return {

        batchStatus: false,//批量修改dialog状态
        week: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        date: new Date(),
        selectYear: '',
        selectMonth: '',
        selectDay: new Date().getDate(),
        check: true,
        nowDays: [],

      }
    },
    components: {AddPriceForm},
    props: {
      parentNowDate: {
        type: Array,
        default: [],
      },
      parentPickerList: {
        type: Array,
        default: []
      }
    },
    created: function () {
      this.selectYear = this.parentNowDate[0]._year;
      this.selectMonth = this.parentNowDate[0]._month;
    },
    computed: {
      utilMonth: function () {
        return this.selectMonth < 10 ? '0' + this.selectMonth : this.selectMonth;
      },
      receivePicekerList: function () {
        return this.parentPickerList;
      },
      dayCount() {
        let n = new Date(this.selectYear, this.selectMonth, 0).getDate();
        this.dCount = n;
        return n;
      },
      firstDayInWeek() {
        // console.log(this.selectMonth - 1);
        return new Date(this.selectYear, this.selectMonth - 1, 1).getDay();
      },
      nextMonthDay() {
        let num = 42 - this.firstDayInWeek - this.dayCount;//42个格子
        let nextDays = [];
        if (num === 0) return nextDays;

        let i = 1;
        for (; i <= num; i++) {
          // nextDays.push(i);
          nextDays.push({});
        }
        return nextDays;
      },
      renderData() {
        // let nowDays = [];
        this.nowDays = [];
        let i = 1;
        let _day = new Date();
        let _time = Date.parse(_day);
        let _ltDay = _day.getDate();
        let _ltMonth = _day.getMonth() + 1;
        let _ltYear = _day.getFullYear();
        let _lgYear = _day.getFullYear() + 1;
        for (; i <= this.dayCount; i++) {
          for (var j = 0, pPL = this.parentPickerList; j < pPL.length; j++) {
            // (pPL[j]._year==_ltYear&&pPL[j]._month==_ltMonth))
            if (i == pPL[j]._date && (pPL[j].date < _time && pPL[j]._year == _ltYear && pPL[j]._month == _ltMonth && pPL[j]._date < _ltDay)) {
              console.log(pPL[j])
              console.log(_time)
              this.nowDays.push(new Updateprice(
                pPL[j]._date,
                pPL[j].hotelId,
                pPL[j].planId,
                true,
                pPL[j]._month,
                pPL[j]._sign,
                pPL[j]._year,
                pPL[j].currentPrice,
                pPL[j].date,
                pPL[j].id,
                pPL[j].planName,
                pPL[j].priceStatus,
                pPL[j].roomId,
                pPL[j].roomName,
                false,
                false,
                false,
                false,
                pPL[j].priceStatus == 2 ? true : false,
              ));
              break;
            } else if (i == pPL[j]._date) {
              this.nowDays.push(new Updateprice(
                pPL[j]._date,
                pPL[j].hotelId,
                pPL[j].planId,
                false,
                pPL[j]._month,
                pPL[j]._sign,
                pPL[j]._year,
                pPL[j].currentPrice,
                pPL[j].date,
                pPL[j].id,
                pPL[j].planName,
                pPL[j].priceStatus,
                pPL[j].roomId,
                pPL[j].roomName,
                false,
                false,
                false,
                false,
                pPL[j].priceStatus == 2 ? true : false,
              ));
              break;
            }
          }

          if (j == pPL.length) {
            if (_ltMonth == this.parentPickerList[0]._month
              && i < _ltDay
              && _ltYear == this.parentPickerList[0]._year) {//最小月
              this.nowDays.push(new Updateprice(i,
                this.parentPickerList[0].hotelId,
                this.parentPickerList[0].planId,
                true
              ));
            }
            else if (_ltMonth == this.parentPickerList[0]._month
              && i > _ltDay
              && _lgYear == this.parentPickerList[0]._year
            ) {//最大月
              this.nowDays.push(new Updateprice(i,
                this.parentPickerList[0].hotelId,
                this.parentPickerList[0].planId,
                true
              ));
            }
            else {
              this.nowDays.push(new Updateprice(i,
                this.parentPickerList[0].hotelId,
                this.parentPickerList[0].planId,
                false
              ));
            }
          }

          // if(j==pPL.length){
          //   this.nowDays.push(new Updateprice(i,
          //   this.parentPickerList[0].hotelId,
          //   this.parentPickerList[0].planId,
          //   ));
          // }
        }
        // console.log(this.receivePicekerList);
        // console.log(this.lastMonthDay);
        // console.log(this.nowDays)
        // return nowDays;
        // [...this.lastMonthDay, ...nowDays,...this.nextMonthDay]
        let arr = [...this.lastMonthDay, ...this.nowDays, ...this.nextMonthDay];
        // arr.push({});
        return arr;
      },
      lastMonthDay() {
        let lastNum = this.firstDayInWeek;
        let lastDays = [];
        if (lastNum === 0) return lastDays;

        let i = 0;
        let lastDayNum = new Date(this.selectYear, this.selectMonth - 1, 0).getDate();
        for (; i < lastNum; i++) {
          // lastDays.unshift(lastDayNum);
          lastDays.unshift({});
          lastDayNum--;
        }
        return lastDays;
      },
      trueSelectMonths() {
        switch (this.selectMonth) {
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
      }
    },
    methods: {
      close(val) {
        // console.log(val)
        // console.log(this.batchStatus)
        this.batchStatus = val;
      },
      handleCancel(val) {
        val.addDialog = false;
        val.updateDialog = false;
        val.active = false;
        // this.$set(this.renderData[i],'active',false);
      },
      handleSelect(val, idx) {
        // console.log(val)
        // if(!val._date)return;
        console.log(val)
        // debugger
        if (val._date && !val._ltStatus && (val.currentPrice == 0 || val.currentPrice > 0)) {
          // this.renderData.forEach(vals=>{

          //   Vue.set(vals,'updateDialog',true);
          //   console.log(vals.updateDialog)
          // })

          for (var i = 0; i < this.renderData.length; i++) {
            if (idx == i) {
              // this.renderData[i] = true;
              this.$set(this.renderData[i], 'active', true);
              this.$set(this.renderData[i], 'addDialog', false);
              this.$set(this.renderData[i], 'updateDialog', !this.renderData[i].updateDialog);
            } else {
              // this.renderData[i] = false;
              this.$set(this.renderData[i], 'active', false);
              this.$set(this.renderData[i], 'addDialog', false);
              this.$set(this.renderData[i], 'updateDialog', false);

            }
          }


        } else if (val._date && !val._ltStatus && (val.currentPrice != 0 || val.currentPrice != '')) {

          console.log(val._date && !val._ltStatus && (val.currentPrice != 0 || val.currentPrice != ''))
          for (var i = 0; i < this.renderData.length; i++) {
            if (idx == i) {
              // this.renderData[i] = true;
              this.$set(this.renderData[i], 'active', true);
              this.$set(this.renderData[i], 'addDialog', !this.renderData[i].addDialog);
              this.$set(this.renderData[i], 'updateDialog', false);
            } else {
              // this.renderData[i] = false;
              this.$set(this.renderData[i], 'active', false);
              this.$set(this.renderData[i], 'addDialog', false);
              this.$set(this.renderData[i], 'updateDialog', false);
            }
          }
        }
      },
      utilDay(_month, _date) {
        var _month = _month < 10 ? '0' + _month : _month;
        var _date = _date < 10 ? '0' + _date : _date;
        return `${_month}-${_date}`;
      },
      handleUpdatePrice(item) {
        if (item.changePrice && !(/^[0-9]+$/.test(item.changePrice))) {
          item.priceInvalid = true;
          return
        }
        item.priceInvalid = false;
        // let _month = item._month<10?'0'+item._month:item._month;
        // let _date = item._date<10?'0'+item._date:item._date;
        let params = Object.assign({},
          {
            date: `${item._year}-` + this.utilDay(item._month, item._date),
            currentPrice: item.changePrice,
            priceStatus: item._priceStatus ? 2 : 1
          });
        let params2 = {
          ratePlanPriceId: item.id,
          planId: item.planId,
        }
        updatePrice({hotelPrice: params}, params2).then(res => {
          let callee = ({message}) => {
            this.$message({
              message: message,
              type: 'success'
            });
            let company = Cookie.get('company');
            this.$store.dispatch('GetNewPickerListObjs', {planId: item.planId, supplierName: company});
          }
          myHotelsMessage(res.status, res, callee);
        });
      },
      handleAddPrice(item) {
        if (!(/^[0-9]+$/.test(item.changePrice))) {
          item.priceInvalid = true;
          return
        }
        item.priceInvalid = false;
        let supplierName = Cookie.get('name');
        let params = Object.assign({}, {
          supplierName: supplierName,
          ratePlanId: item.planId,
          hotelId: item.hotelId,
          date: `${this.selectYear}-` + this.utilDay(this.selectMonth, item._date),
          currentPrice: item.changePrice,
          priceStatus: item._priceStatus ? 2 : 1
        });
        let company = Cookie.get('company');
        let param = Object.assign({}, params, {supplierName: company})
        addPrice({hotelPrice: param}, params).then(res => {
          let callee = ({message}) => {
            this.$message({
              message: message,
              type: 'success'
            });
            this.$store.dispatch('GetNewPickerListObjs', {planId: item.planId, supplierName: company});
          }
          myHotelsMessage(res.status, res, callee);

        });
      },
    }
  }
</script>

<style scoped lang="scss">
  @import '../style/s-variables.scss';

  @mixin text-align {
    text-align: center;
  }

  @mixin col-l4 {
    width: 14.28%;;
    height: 100px;
  }

  #date-picker-group {
    height: 100%;
    .active {
      background-color: $primary;
      .primary.price {
        color: $tar;
      }
    }

  }

  .flex-wrap {
    flex-flow: row wrap;
  }

  .s-row-yearMonth {
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    .grid-content {
      width: 14.28%*7;
      text-align: center;
      position: relative;

      > span {
        font-size: 20px;
        text-align: center;
        color: rgba(11, 157, 120, 1);
      }
      .add-price-form {
        position: absolute;
        right: 0;
        top: 53px;
        z-index: 2000;
        width: 100%;
        background-color: #fff;
        padding: 20px;
        box-sizing: border-box;
      }
      .batch-price {
        position: absolute;
        right: 0;
        top: 0;

      }
    }
    .dis {
      background-color: red;
    }
  }

  .s-row-title {
    width: 100%;
    height: 57px;
    line-height: 57px;
    background-color: #E7F5F2;
    @include text-align;
    border: 1px solid #ddd;
    border-bottom-color: transparent;
    box-sizing: border-box;
    .s-col-l4 {
      width: 14.28%;
      .grid-content {
        background-color: #E7F5F2;
        color: #0B9D78;
        font-size: 20px;
      }
    }

  }

  .s-row-body {
    // height: 100px;
    @include text-align;
    .s-col-l4 {
      @include col-l4;
      border-left: 1px solid $border-color;
      border-top: 1px solid $border-color;
      &:hover {
        cursor: pointer;
      }
      &:nth-child(7n) {
        border-right: 1px solid $border-color;
      }
      @for $i from 36 through 42 {
        &:nth-child(#{$i}) {
          border-bottom: 1px solid $border-color;
        }
      }
      .grid-content {
        height: 100%;
        position: relative;
        padding: 16px 0 15px;
        box-sizing: border-box;
        &.disabled {
          background-color: #ddd;
        }
        &-edit {
          position: absolute;
          width: 201%;
          height: 301%;
          background-color: #E7F5F2;
          left: 0;
          bottom: -301%;
          z-index: 100;
          .el-col {
            height: 100%;
            .s-container {
              width: 100%;
              height: 100%;
              padding: 20px 20px;
              box-sizing: border-box;
              .el-col {
                font-size: 18px;
                text-align: left;
                height: 29px;
                line-height: 29px;
                color: rgb(11, 157, 120);
                margin-bottom: 20px;
                .el-input {
                  width: 100%;
                }
                .danger {
                  text-align: right;
                }
              }
            }
          }

        }
        .edit-u-price {
          .el-col {
            .s-container {
              .title {
                color: #0B9D78;
                font-size: 18px;
                &.danger {
                  height: 32px;
                  line-height: 32px;
                  color: #E51C23;
                  font-weight: 400;
                }
              }
            }
          }
        }
      }

      @for $i from 1 through 42 {

        @if ($i==7) {
          &:nth-child(#{$i}n-1) {
            .grid-content-edit {
              left: -100%;
            }
          }
          &:nth-child(#{$i}n) {
            .grid-content-edit {
              left: -201%;
            }
          }
        }
        @if ($i<21) {
          &:nth-child(#{$i}n) {
            .grid-content-edit {
              bottom: -301%;
            }
          }
        }
        @if ($i>21) {
          &:nth-child(#{$i}n) {
            .grid-content-edit {
              bottom: 101%;
            }
          }
        }
      }
      .date {
        line-height: 29px;
        color: #333333;
        font-size: 20px;
        text-align: center;
      }
    }
  }

  /*.s-label-checkbox {
    vertical-align: middle;
    width: 40px;
    height: 40px;
    background-color: #fff;
    border: 2px solid $danger;
    color: #606266;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    display: inline-block;
    position: relative;
    white-space: nowrap;
  }

  .s-checkbox {
    display: none;
  }

  .s-checkbox:checked + .s-checkbox-icon::after {
    content: '';
    box-sizing: content-box;
    width: 10px;
    height: 19px;
    transform: rotate(45deg) scaleY(1);
    border: 2px solid $danger;
    border-left-color: transparent;
    border-top-color: transparent;
    transform-origin: center;
    display: table;
    position: absolute;
    left: 11px;
    top: 3px;
  }*/

  .primary.price, .danger {
    /*font-size: 20px;
    color:rgb(51,51,51);*/
    height: 29px;
    line-height: 29px;
    color: #0b9d78;
    font-size: 20px;
    text-align: center;
    font-weight: bold;
  }

</style>

