<template>
  <div class="add-price">
    <el-header>
      <el-breadcrumb separator="-">
        <el-breadcrumb-item
          v-for="(item,index) in breadcrumb"
          :key="index"
          :to="{ path: item.path }">
          {{item.title}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main>

      <add-price-form
        @submitAddPrice="submitAddPrice"
        :origin="addPriceForm.origin"
      />

    </el-main>
  </div>
</template>

<script>
  import {AddPriceForm} from '@/components'

  export default {
    components: {AddPriceForm},
    data() {
      return {
        actionType: 'add',
        check: true,
        value13: [],
        addPriceForm: {
          origin: 'add'
        },
        pickerOptions: {
          disabledDate: (time) => {
            return
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
        fullPath: '',
      }
    },
    created: function () {
      this.$store.dispatch('UpdateActionType', this.actionType);
      this.$store.commit('updateAside', this.$route.meta.aside);
      this.$store.commit('updateLocation', {
        title: 'asdasdasd',
      });
    },
    mounted: function () {
      window.sessionStorage.setItem('breadcrumb', -2);
    },
    computed: {
      breadcrumb() {
        return this.$store.state.breadcrumb.location;
      }
    },
    methods: {
      submitAddPrice(val) {
      },
      changeStart() {
        this.pickerOptionsStart = Object.assign({}, this.pickerOptionsStart, {
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
        })
      },
      changeEnd() {
        this.pickerOptionsEnd = Object.assign({}, this.pickerOptionsEnd, {
          disabledDate: (time) => {
            let now = new Date();
            now.setFullYear(now.getFullYear() + 1);
            if (this.startDate) {
              this.endDate = this.endDate || this.startDate;
              new Date(this.startDate).setDate(new Date(this.startDate).getDate() + 1);
              return time.getTime() < this.startDate || time.getTime() > now;
            } else {
              let nowed = new Date(time)
              nowed.setDate(nowed.getDate() + 1)
              return time.getTime() > now || nowed.getTime() < Date.now();
            }
          }
        })
      },


      // handleAddPrice(){
      //     this.$router.push({
      //         path:'/myhotels/updateprice'
      //     })
      // }
    }
  }
</script>
<style scoped lang="scss">
  .add-price {
    width: 100%;
    height: 100%;
  }

  .el-header {
    padding: 0;
    font-size: 12px;
    height: auto !important;
    margin-bottom: 20px;
  }

  .el-main {
    padding: 0;
  }

  // date component
  .el-input {
    width: auto;
  }

  .el-col {
    height: 40px;
  }

  .s-label-checkbox {
    vertical-align: middle;
    width: 40px;
    height: 40px;
    background-color: #fff;
    border: 2px solid red;
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
    border: 2px solid red;
    border-left-color: transparent;
    border-top-color: transparent;
    transform-origin: center;
    display: table;
    position: absolute;
    left: 11px;
    top: 3px;
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

  .input-suffix {
    height: 100%;
    span {
      vertical-align: middle;
    }
  }
</style>
