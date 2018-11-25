<template>
  <div class="add-price-form" v-loading.fullscreen.lock="fullscreenLoading">
    <!--for form-->
    <el-row class="form-row" v-for="(item,index) in addPriceList" :key="index">
      <el-col :span="6">
        <div class="input-suffix">
          <el-row>
            <el-col
              :span="8"
              class="title"
            >
              Start Date
            </el-col>
            <el-col :span="14" style="line-height:40px;">
              <el-date-picker
                :disabled="item.disabled&&addPriceList.length>1"
                :picker-options="pickerOptionsStart"
                v-model="item.startDate"
                type="date"
                placeholder=""
                @change="changeStart(item,index)">
              </el-date-picker>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="danger" v-if="item.startDateTitle">
              <span v-if="item.startDateTitle==1">Date is conflicting with other dates</span>
              <span v-if="item.startDateTitle==2">Please enter the Date.</span>
              <span v-if="item.startDateTitle==3">The end date should be greater than the start date</span>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="input-suffix">
          <el-row>
            <el-col
              :span="8"
              class="title"
            >
              End Date
            </el-col>
            <el-col :span="14" style="line-height:40px;">
              <el-date-picker
                :disabled="item.disabled&&addPriceList.length>1"
                :picker-options="pickerOptionsEnd"
                v-model="item.endDate"
                type="date"
                placeholder=""
                @change="changeEnd(item,index)">
              </el-date-picker>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="danger" v-if="item.endDateTitle">
              <span v-if="item.endDateTitle==1">Date is conflicting with other dates</span>
              <span v-if="item.endDateTitle==2">Please enter the Date.</span>
              <span v-if="item.endDateTitle==3">The end date should be greater than the start date</span>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="input-suffix">
          <el-row>
            <el-col
              :span="6"
              class="title"
            >
              Price ₹
            </el-col>
            <el-col :span="15" style="line-height:40px;">
              <el-input
                :disabled="item.disabled&&addPriceList.length>1"
                type="number"
                placeholder=""
                v-model="item.price"
              >
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="danger" v-if="item.priceTitle">
              <span v-if="item.priceTitle==1">Invalid characters</span>
              <span v-if="item.priceTitle==2">Please enter the price.</span>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="input-suffix" style="line-height:40px;">
          <label class="s-label-checkbox">
            <input type="checkbox" v-model="item._priceStatus" class="s-checkbox"/>
            <span class="s-checkbox-icon"></span>
          </label>
          <span>SOLDOUT</span>

        </div>
      </el-col>

      <el-col :span="2" style="line-height:40px;">
        <el-row>
          <el-col :span="12">
            <!-- 添加一行 -->
            <div class="input-suffix" v-show="index==addPriceList.length-1" style="line-height:40px;">
              <el-button
                class="btn-success"
                icon="el-icon-plus"
                circle
                @click="handlePushPriceItem"></el-button>
            </div>
            <div style="width:42px;height:42px;"></div>
          </el-col>
          <el-col :span="12">
            <!-- 删除当前列 -->
            <div class="input-suffix" v-show="index==0&&addPriceList.length>1" style="line-height:40px;">
              <el-button
                type="danger"
                icon="el-icon-minus"
                circle
                @click="handleDeletePriceItem(item,index)"></el-button>
            </div>

            <!-- 删除当前列 -->
            <div class="input-suffix" v-show="index!==0&&addPriceList.length>0" style="line-height:40px;">
              <el-button
                type="danger"
                icon="el-icon-minus"
                circle
                @click="handleDeletePriceItem(item,index)"></el-button>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>


    <!--action-->
    <el-row class="action">
      <el-col :span="7">
      </el-col>
      <el-col :span="7">
      </el-col>
      <el-col :span="4">
      </el-col>
      <el-col :span="4">
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">
        <el-button class="btn-success-space" @click="handleCancel">Cancel</el-button>
        <el-button class="btn-warning" @click="handleSubmitPriceList">Submit</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import AddPriceList from '@/model/AddPriceList';
  // import {getDateFormat, deepClone} from '../../../../utils/utils'
  // import {myHotelsMessage} from '../../../../utils/myHotelsMessage'
  import {mapGetters} from 'vuex'
  // import {batchCreatePrice, batchUpdatePrice} from '../../../../api/myHotels/price'
  import Cookie from 'js-cookie'

  export default {
    props:['origin'],
    data() {
      return {
        props: {
          actionType: {
            type: String,
            default: ''
          }
        },
        pickerOptionsStart: {
          disabledDate: (time) => {
            let nowY = new Date();
            let nowed = new Date(time);
            nowY.setFullYear(nowY.getFullYear() + 1);
            nowed.setDate(nowed.getDate() + 1);
            if (this.endDate) {
              this.startDate = this.startDate || new Date();
              if (this.startDate.getTime() > this.endDate.getTime()) {
                this.endDate = '';
              }
            }
            return time.getTime() > nowY || nowed.getTime() < Date.now();
          }
        },
        pickerOptionsEnd: {
          disabledDate: (time) => {
            let now = new Date();
            now.setFullYear(now.getFullYear() + 1);
            if (this.startDate) {
              this.endDate = this.endDate || this.startDate;
              new Date(this.startDate).setDate(new Date(this.startDate).getDate() + 1);
              console.log(time)
              return time.getTime() < this.startDate || time.getTime() > now;
            } else {
              let nowed = new Date(time)
              nowed.setDate(nowed.getDate() + 1)
              return time.getTime() > now || nowed.getTime() < Date.now();
            }
          }
        },
        startDate: '',
        endDate: '',
        addPriceList: [],
        roomType: '',
        planId: '',
        route: {
          hotelName: '',
          roomName: '',
          planName: '',
        },
        fullscreenLoading: false,
      }
    },
    created: function () {
      if (this.$route.name != 'updateprice') {
        let hotelName = this.$route.query.hotelName;
        let roomName = this.$route.query.roomName;
        let planName = this.$route.query.planName;
        this.route = {
          hotelName, roomName, planName
        };
        this.$store.commit('GO_ADD', [
          {
            title: hotelName,
            href: -1
          },
          {
            title: `${roomName} - ${planName}`,
          }
        ]);
      }
      this.roomType = this.$route.params.roomType;
      this.planId = this.$route.params.planId;
      this.handlePushPriceItem();
    },
    computed: {
      // ...mapGetters([
      //   'myHotelPrice'
      // ]),
      myHotelPrice(){
        return this.origin;
      }
    },
    methods: {
      checkStatus(type, callback) {
        let priceListLastItem = this.addPriceList[this.addPriceList.length - 1];

        if (!priceListLastItem.startDate) {
          priceListLastItem.startDateTitle = 2;
        }
        else if (this.addPriceList.length == 1) {
          if (this.addPriceList[0].startDate && this.addPriceList[0].endDate) {
            if (this.addPriceList[0].startDate <= this.addPriceList[0].endDate) {
              priceListLastItem.startDateTitle = 0;
            } else {
              priceListLastItem.startDateTitle = 3;
            }
          }
        } else {
          if (priceListLastItem.startDate && priceListLastItem.endDate) {

            if (priceListLastItem.startDate <= priceListLastItem.endDate) {

              for (var i = 0, tag = this.addPriceList; i < tag.length; i++) {
                if (i == tag.length - 1) {
                  break;
                }
                if ((priceListLastItem.startDate.getTime() >= tag[i].startDate.getTime()
                  && priceListLastItem.startDate.getTime() <= tag[i].endDate.getTime())
                  || (priceListLastItem.startDate.getTime() <= tag[i].startDate.getTime()
                    && priceListLastItem.endDate.getTime() >= tag[i].endDate.getTime()
                  )) {
                  this.addPriceList[this.addPriceList.length - 1].startDateTitle = 1;
                  break;
                } else {
                  priceListLastItem.startDateTitle = 0;
                }
              }
            } else {
              priceListLastItem.startDateTitle = 3;
            }
          }

        }

        if (!priceListLastItem.endDate) {
          priceListLastItem.endDateTitle = 2;
        } else if (this.addPriceList.length == 1) {
          if (this.addPriceList[0].startDate && this.addPriceList[0].endDate) {
            if (this.addPriceList[0].startDate <= this.addPriceList[0].endDate) {
              priceListLastItem.endDateTitle = 0;
            } else {
              priceListLastItem.endDateTitle = 3;
            }
          }
        } else {
          if (priceListLastItem.startDate && priceListLastItem.endDate) {

            if (priceListLastItem.startDate <= priceListLastItem.endDate) {
              for (var i = 0, tag = this.addPriceList; i < tag.length; i++) {
                if (i == tag.length - 1) {
                  break;
                }

                if ((priceListLastItem.endDate.getTime() <= tag[i].endDate.getTime() &&
                  priceListLastItem.endDate.getTime() >= tag[i].startDate.getTime())
                  || (priceListLastItem.startDate.getTime() <= tag[i].startDate.getTime()
                    && priceListLastItem.endDate.getTime() >= tag[i].endDate.getTime()
                  )) {
                  this.addPriceList[this.addPriceList.length - 1].endDateTitle = 1;
                  break;
                } else {
                  priceListLastItem.endDateTitle = 0;
                }
              }

            } else {
              priceListLastItem.endDateTitle = 3;
            }
          }
        }

        if (!(priceListLastItem.price.replace(/(^\s*)||(\s*$)/g, ""))) {
          priceListLastItem.priceTitle = 2;
        } else if (!(/^[0-9]+$/.test(priceListLastItem.price))) {
          priceListLastItem.priceTitle = 1;
        } else {
          priceListLastItem.priceTitle = 0;
        }

        if (!priceListLastItem.startDateTitle &&
          !priceListLastItem.endDateTitle &&
          !priceListLastItem.priceTitle) {
          if (this.addPriceList.length) {
            this.addPriceList[this.addPriceList.length - 1].disabled = true;
          }
          switch (type) {
            case 'push':
              this.addPriceList.push(
                new AddPriceList()
              );
              this.fullscreenLoading = false;
              break;
            case 'submit':

              callback();
              break;
          }
        }
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 1000);
      },
      // checkStatus2(val,index){
      //     let priceListLastItem = val;
      //     if(!priceListLastItem.startDate){
      //         priceListLastItem.startDateTitle = 2;
      //     }
      //     for(let i= 0,addPriceList = this.addPriceList;i<addPriceList.length;i++){
      //         if(i!==index&&addPriceList[i].startDate&&addPriceList[i].endDate){
      //             alert(1)
      //             if((priceListLastItem.startDate.getTime()>=addPriceList[i].startDate.getTime()&&
      //                 priceListLastItem.startDate.getTime()<=addPriceList[i].endDate.getTime())||
      //                 (priceListLastItem.startDate.getTime()<=addPriceList[i].startDate.getTime()&&
      //                 priceListLastItem.endDate.getTime()>=addPriceList[i].endDate.getTime()
      //                 )
      //             ){
      //                 alert(11)
      //                 priceListLastItem
      //             }
      //         }
      //     }
      // },
      handlePushPriceItem() {
        if (this.addPriceList.length) {
          let addPriceList = this.addPriceList;
          this.checkStatus('push');
        } else {
          this.addPriceList.push(
            new AddPriceList(false)
          );
        }
      },
      handleDeletePriceItem(val, index) {
        if (this.addPriceList.length > 1) {
          this.addPriceList.splice(index, 1);
        }
      },
      changeStart(val, index) {
        // this.checkStatus2(val,index);
      },
      changeEnd(val) {
        // this.checkStatus2(val);
      },
      util(addPriceList) {
        for (let val of addPriceList) {
          val.startDate = getDateFormat(val.startDate);
          val.endDate = getDateFormat(val.endDate);
          val.priceStatus = val._priceStatus ? 2 : 1;
        }
        let supplierName = Cookie.get('name');
        let params = Object.assign({},
          {'DateRangeParam': addPriceList},
          {
            "supplier_name": supplierName,
            "roomTypeId": this.roomType,
            "rateplanId": this.planId,
          });
        return params;
      },
      // 提交表单
      handleSubmitPriceList() {
        this.fullscreenLoading = true;
        // alert(this.myHotelPrice)
        var callback = () => {
          setTimeout(() => {
            this.fullscreenLoading = false;
          }, 3000);
          if (this.myHotelPrice == 'add') {
            let addPriceList = this.addPriceList;
            let params = this.util(addPriceList);

            batchCreatePrice(params, params).then(res => {
              // this.loading = false;
              let callee = (res) => {

                this.$router.push({
                  path: `/myhotels/updateprice/${this.roomType}/${this.planId}`,
                  query: {
                    ...this.route
                  }
                });
              }
              myHotelsMessage(res.status, res, callee);
              // if(res.status==200){

              //     this.$router.push({
              //         path:`/myhotels/updateprice/${this.roomType}/${this.planId}`,
              //         query:{
              //             ...this.route
              //         }
              //     });
              // }
            }).catch(err => {
            });
          } else if (this.myHotelPrice == 'update') {
            let updatePriceList = this.addPriceList;
            let params = this.util(updatePriceList);

            batchUpdatePrice(params, params).then(res => {
              let callee = (res) => {
                // this.$message({
                //     message: 'success',
                //     type: 'success'
                // });
                // this.$store.dispatch('GetNewPickerListObjs',{planId:this.planId});
                // this.handleCancel();


                //刷新页面
                this.$router.go(0);
              }
              myHotelsMessage(res.status, res, callee);
              /*
              if(res.status==200){


                  // this.$message({
                  //     message: 'success',
                  //     type: 'success'
                  // });
                  // this.$store.dispatch('GetNewPickerListObjs',{planId:this.planId});
                  // this.handleCancel();


                  //刷新页面
                  this.$router.go(0);
              }else{
                  this.$message({
                      message: 'error',
                      type: 'error'
                  });
              }

              */
            }).catch(err => {
              this.$message({
                message: err,
                type: 'error'
              });
            })
          }

        }


        this.checkStatus('submit', callback);
      },
      handleCancel() {
        if (this.myHotelPrice == 'add') {
          this.$router.go(-1);
        }
        else if (this.myHotelPrice == 'update') {
          this.$emit('APFclose', false);
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../style/s-variables.scss';
  // date component
  .el-input {
    width: auto;
  }

  .add-price-form {
    background-color: #E7F5F2;
    padding: 30px 20px 30px 30px;
    box-sizing: border-box;
  }

  .input-suffix {
    text-align: left;
  }

  .s-label-checkbox {
    vertical-align: middle;
    width: 32px;
    height: 32px;
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
    box-sizing: border-box;
    margin-right: 10px;
  }

  .s-checkbox {
    display: none;
  }

  .s-checkbox:checked + .s-checkbox-icon::after {
    content: '';
    box-sizing: content-box;
    width: 6px;
    height: 14px;
    transform: rotate(45deg) scaleY(1);
    border: 2px solid $danger;
    border-left-color: transparent;
    border-top-color: transparent;
    transform-origin: center;
    display: table;
    position: absolute;
    left: 10px;
    top: 3px;
  }

  .form-row {
    display: flex;

  }

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .title {
    font-size: 14px;
    padding-right: 5px;
    box-sizing: border-box;
    line-height: 40px;
    text-align: left;
    color: #0B9D78;
  }

  .action {
    .el-col {
      text-align: left;
      height: 40px;
    }
  }

  .input-suffix {
    span {
      padding-right: 5px;
      box-sizing: border-box;
      vertical-align: middle;
      color: rgba(229, 28, 35, 1);
      font-size: 18px;
      text-align: left;
    }
  }

  .danger {
    line-height: 13px;
  }
</style>
