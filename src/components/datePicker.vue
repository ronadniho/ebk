<template>
  <div class="data-picker">
    <table>
      <thead>
      <!--星期-->
      <tr
        v-for="(item,index) in week"
        :key="index">
        <th>{{item}}</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <!--每日-->
        <td v-for="(v,i) in renderData">
          <div
            class="ready"
            :class="{
            'disabled':!v.day,
            'active':v.isActive
            }"
            @click="handleSelect(v,i)"
          >
            <p class="date" v-if="v.day">{{v.day}}</p>
            <p class="price" v-if="v.day">₹ 10290</p>
            <!--<p class="status">SOLDOUT</p>-->
          </div>
          <!--编辑-->
          <div
            class="edit edit-u-price"
            v-if="v.isUpdate"
          >
            <el-row class="edit-date">
              <el-col :span="12" class="title">
                {{v.title}}
              </el-col>
              <el-col :span="12"></el-col>
            </el-row>
            <el-row class="edit-cut-price">
              <el-col :span="12" class="title">
                Current price
              </el-col>
              <el-col :span="12" class="val">
                ₹ 10290
              </el-col>
            </el-row>
            <el-row class="edit-che-price">
              <el-col :span="12" class="title">
                Change price
              </el-col>
              <el-col :span="12" class="val">
                <el-row>
                  <el-col :span="4">₹</el-col>
                  <el-col :span="20">
                    <el-input></el-input>
                  </el-col>
                </el-row>


              </el-col>
            </el-row>
            <el-row class="edit-status">
              <el-col :span="12" class="title">
                SOLDOUT
              </el-col>
              <el-col :span="12" class="val">
                <input type="checkbox" id="status">
                <label for="status"></label>
              </el-col>
            </el-row>
            <el-row class="edit-btn-group">
              <el-col :span="24">
                <el-button class="btn-success-space">Cancel</el-button>
                <el-button class="btn-warning">Submit</el-button>
              </el-col>
            </el-row>


          </div>
          <!--添加-->
          <div
            class="edit edit-a-price"
            v-if="v.isAdd"
          >
            <el-row class="edit-date">
              <el-col :span="12" class="title">
                {{v.title}}
              </el-col>
              <el-col :span="12"></el-col>
            </el-row>
            <el-row class="edit-che-price">
              <el-col :span="12" class="title">
                Add the price
              </el-col>
              <el-col :span="12" class="val">
                <el-row>
                  <el-col :span="4">₹</el-col>
                  <el-col :span="20">
                    <el-input></el-input>
                  </el-col>
                </el-row>


              </el-col>
            </el-row>
            <el-row class="edit-btn-group">
              <el-col :span="24">
                <el-button
                  class="btn-success-space"
                  @click="handleAddCancel(v,i)">Cancel
                </el-button>
                <el-button
                  class="btn-warning"
                  @click="handleAddSubmit">Submit
                </el-button>
              </el-col>
            </el-row>


          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: "datePicker",
    props: ['param'],
    data() {
      return {
        week: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'],
        len: 42,
        select: {
          default: '0',
        },
        selectMonth: 1,
        nowDays: [],//当月总天数
      }
    },
    computed: {
      trueSelectMonths() {
        switch (this.selectMonth) {
          case 1:
            return 'Jan';
            break;
          case 2:
            return 'Feb';
            break;
          case 3:
            return 'Mar';
            break;
          case 4:
            return 'Apr';
            break;
          case 5:
            return 'May';
            break;
          case 6:
            return 'Jun';
            break;
          case 7:
            return 'Jul';
            break;
          case 8:
            return 'Aug';
            break;
          case 9:
            return 'Sep';
            break;
          case 10:
            return 'Oct';
            break;
          case 11:
            return 'Nov';
            break;
          case 12:
            return 'Dec';
            break;
        }
      },
      minDate() {
        return new Date(this.param.minDate) || new Date();
      },
      maxDate() {
        return new Date(this.param.maxDate) || new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 365);
      },
      currentDate() {
        return new Date(this.param.currentDate) || new Date();
      },
      currentYear() {
        return this.currentDate.getFullYear();
      },
      currentMonth() {
        return this.currentDate.getMonth();
      },
      dayCount() {//当月总天数
        let n = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        return n;
      },
      firstDayInWeek() {//当月第一天在星期几
        return new Date(this.currentYear, this.currentMonth, 1).getDay();
      },
      lastMonthDay() {//当月显示上个月尾几天
        let lastNum = this.firstDayInWeek;
        let lastDays = [];
        if (lastNum === 0) return lastDays;
        let i = 0;
        let lastDayNum = new Date(this.selectYear, this.selectMonth - 1, 0).getDate();
        for (; i < lastNum; i++) {
          lastDays.unshift({});
          lastDayNum--;
        }
        return lastDays;
      },
      nextMonthDay() {//当月显示下个月头几天
        let num = 42 - this.firstDayInWeek - this.dayCount;//42个格子
        let nextDays = [];
        if (num === 0) return nextDays;
        let i = 1;
        for (; i <= num; i++) {
          nextDays.push({});
        }
        return nextDays;
      },
      renderData() {
        let cM = this.currentMonth < 10 ? '0' + this.currentMonth : this.currentMonth;
        let cY = this.currentYear < 10 ? '0' + this.currentYear : this.currentYear;
        this.nowDays = [];
        let i = 1;
        for (; i <= this.dayCount; i++) {
          let clone = i < 10 ? '0' + i : i;
          this.nowDays.push({
            title: `${clone}/${cM}/${cY}`,
            day: i,
            isUpdate: false,
            isAdd: false,
            isActive: false,
          });
        }
        return [...this.lastMonthDay, ...this.nowDays, ...this.nextMonthDay];
      }
    },
    created() {
      console.log(this.renderData);
    },
    methods: {
      handleSelect(v, i) {
        if (!v.day) {
          return false;
        }
        let tar = this.renderData;
        for (let j = 0; j < tar.length; j++) {
          if (i == j) {
            this.$set(tar[j], 'isAdd', !tar[j].isAdd);
            this.$set(tar[j], 'isActive', !tar[j].isActive);
            // this.$set(tar[j], 'isUpdate', !tar[j].isUpdate);
            this.$set(tar[j], 'isUpdate', false);
          }
          else {
            this.$set(tar[j], 'isAdd', false);
            this.$set(tar[j], 'isActive', false);
            this.$set(tar[j], 'isUpdate', false);
          }
        }
      },
      handleAddCancel(v, i) {
        v.isAdd = false;
        v.isActive = false;
      },
      handleAddSubmit() {

      }
    }
  }
</script>

<style scoped lang="scss">
  table {
    width: 100%;
    margin-bottom: 30px;
  }

  thead {
    display: flex;
    justify-content: center;
    background-color: rgba(11, 157, 120, 0.1);
    text-align: center;
    border: 1px solid rgba(187, 187, 187, 1);
    color: #0B9D78;
    height: 57px;
    line-height: 57px;
  }

  thead > tr, tbody td {
    width: 14.28%;
    text-align: center;
  }

  thead > tr > th {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0;
    font-size: 20px;
  }

  tbody > tr {
    display: flex;
    flex-flow: row wrap;
    border-left: 1px solid rgba(187, 187, 187, 1);
    box-sizing: border-box;
  }

  tbody > tr > td {
    position: relative;
    box-sizing: border-box;

    border-right: 1px solid rgba(187, 187, 187, 1);
    border-bottom: 1px solid rgba(187, 187, 187, 1);
    height: 92px;

  }

  tbody > tr > td > .ready {
    width: 100%;
    height: 100%;
    padding: 16px 0 15px;
    box-sizing: border-box;
  }

  tbody > tr > td > .ready.active {
    background-color: #0B9D78;
  }

  tbody > tr > td > .ready.disabled {
    background-color: #ddd;
  }

  tbody > tr > td > .ready.disabled:hover {
    cursor: not-allowed;
  }

  tbody > tr > td > .ready.active > p.date {
    color: #fff;
  }

  tbody > tr > td > .ready.active > p.price {
    color: #fff;
  }

  tbody > tr > td > .ready > p.date {
    line-height: 29px;
    color: rgba(51, 51, 51, 1);
    font-size: 20px;
    text-align: center;
  }

  tbody > tr > td > .ready > p.price {
    height: 29px;
    line-height: 29px;
    color: rgba(11, 157, 120, 1);
    font-size: 20px;
    text-align: center;
    font-weight: bold;
  }

  tbody > tr > td > .ready > p.status {
    height: 27px;
    line-height: 29px;
    color: rgba(229, 28, 35, 1);
    font-size: 20px;
    text-align: center;
  }

  tbody > tr > td > .ready:not(.disabled):hover {
    cursor: pointer;
  }

  tbody > tr > td > .edit {
    position: absolute;
    top: 92px;
    left: 0;
    z-index: 2000;
    width: 200%;
    height: 274px;
    line-height: 20px;
    background-color: #E7F5F2;
    color: rgba(16, 16, 16, 1);
    font-size: 14px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-sizing: border-box;
  }

  tbody > tr > td > .edit-a-price {
    height: 200%;
  }

  @for $i from 1 through 42 {
    @if ($i<7) {
      tbody > tr > td:nth-child(#{$i}) .edit {
        left: 0;
      }
      /* tbody > tr > td:nth-child(#{$i}n) .edit {
         left: 0;
       }*/
    }
    @if ($i==7) {
      /*tbody > tr > td:nth-child(#{$i}n-1) .edit {
        left: -100%;
      }*/
      tbody > tr > td:nth-child(#{$i}n) .edit {
        left: -100%;
      }
    }
    @if ($i<21) {
      tbody > tr > td:nth-child(#{$i}n) .edit {
        bottom: -301%;
      }
    }
    @if ($i>21) {
      tbody > tr > td:nth-child(#{$i}n) .edit {
        top: auto;
        bottom: 101%;
      }
    }
  }

</style>
