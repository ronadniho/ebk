<template>
  <div class="data-picker">
    <table>
      <thead>
      <tr
        v-for="(item,index) in week"
        :key="index">
        <th>{{item}}</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td v-for="(v,i) in len" v-if="i<len">
          <div
            class="ready"
            :class="{'active':i==4}">
            <p class="date">{{v}}</p>
            <p class="price">₹ 10290</p>
            <!--<p class="status">SOLDOUT</p>-->
          </div>
          <!--编辑-->
          <div
            class="edit edit-u-price"
            v-if="false"
          >
            <el-row class="edit-date">
              <el-col :span="12" class="title">
                02/09/2018
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
            v-if="false"
          >
            <el-row class="edit-date">
              <el-col :span="12" class="title">
                02/09/2018
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
                <el-button class="btn-success-space">Cancel</el-button>
                <el-button class="btn-warning">Submit</el-button>
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
        selectMonth: 1
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
      minDate(){
        return new Date(this.param.minDate)||new Date();
      },
      maxDate(){
        return new Date(this.param.maxDate)||new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 365);
      },
      currentDate(){
        let date = new Date();
        console.log(date.getMonth());
        console.log(date.getFullYear());
        console.log(date.getDay());
        console.log(date.getDate());
        return
      }
    },
    created(){
      this.currentDate;
    },
    methods: {}
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
  }

  tbody > tr > td > .ready > p.status {
    height: 27px;
    line-height: 29px;
    color: rgba(229, 28, 35, 1);
    font-size: 20px;
    text-align: center;
  }

  tbody > tr > td:hover {
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

    @if ($i==7) {
      tbody > tr > td:nth-child(#{$i}n-1) .edit {
        left: -100%;
      }
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

  /*tbody > tr > td:nth-child(7) .edit {
    left: -100%;
  }

  tbody > tr > td:nth-child(14) .edit {
    left: -100%;
  }

  tbody > tr > td:nth-child(21) .edit {
    left: -100%;
  }

  tbody > tr > td:nth-child(28) .edit {
    left: -100%;
  }*/

</style>
