<template>
  <el-container v-loading.fullscreen.lock="fullscreenLoading">
    <el-header style="font-size: 12px">
      <!-- breadcrumb -->
      <!-- <el-breadcrumb separator="-">
          <el-breadcrumb-item :to="{ path: '/' }">My hotels</el-breadcrumb-item>
          <el-breadcrumb-item>WelcomeHotel Dwarka,New Delhi-ITC Hotel Group</el-breadcrumb-item>
      </el-breadcrumb> -->
    </el-header>
    <el-main>
      <!-- <add-price-form></add-price-form>   -->
      <calendar
        :parentPickerList="item"
        :parentNowDate="newPickerListObjs[index]"
        v-for="(item,index) in newPickerListObjs"
        :key="index"></calendar>
    </el-main>
  </el-container>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {calendar, AddPriceForm} from '@/components/'
  // import {getPickerList} from '../../api/myHotels/price'
  import Cookie from 'js-cookie'

  export default {
    components: {calendar, AddPriceForm},
    data() {
      return {
        actionType: 'update',
        pickerList: [],
        newPickerListObj: {},
        planId: '',
        fullPath: '',
        fullscreenLoading: true,
      }
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        vm.fullPath = from.fullPath;
      });
    },
    beforeRouteLeave(to, from, next) {
      next();
    },
    computed: {
      ...mapGetters(['newPickerListObjs'])
    },
    created: function () {
      let hotelName = this.$route.query.hotelName;
      let roomName = this.$route.query.roomName;
      let planName = this.$route.query.planName;
      this.$store.commit('GO_ADD', [
        {
          title: hotelName,
          href: window.sessionStorage.getItem('breadcrumb') ? -2 : -1
        },
        {
          title: `${roomName} - ${planName}`,
        }
      ]);
      this.$store.dispatch('UpdateActionType', this.actionType);
      this.planId = this.$route.params.planId;
      let company = Cookie.get('company');
      // this.$store.dispatch('GetNewPickerListObjs', {planId: this.planId, supplierName: company});
      this.fullscreenLoading = false;
    },

    methods: {}
  }
</script>

<style lang="scss" scoped>
  .el-main {
    border: 1px solid #ddd;
  }

  .el-container {
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
</style>
