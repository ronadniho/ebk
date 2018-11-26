<template>
  <div class="update-price" v-loading.fullscreen.lock="fullscreenLoading">
    <el-header style="font-size: 12px;height: auto;">
      <!-- breadcrumb -->
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
      <!-- <add-price-form></add-price-form>   -->
      <calendar
        :parentPickerList="item"
        :parentNowDate="newPickerListObjs[index]"
        v-for="(item,index) in newPickerListObjs"
        :key="index"></calendar>
    </el-main>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {calendar, AddPriceForm} from '@/components/'
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
      ...mapGetters(['newPickerListObjs']),
      breadcrumb() {
        return this.$store.state.breadcrumb.location;
      }
    },
    created: function () {
      let hotelName = this.$route.query.hotelName;
      let roomName = this.$route.query.roomName;
      let planName = this.$route.query.planName;
      this.$store.commit('updateLocation', {
        title: 'asdasdasd',
      });
      this.$store.dispatch('UpdateActionType', this.actionType);
      this.$store.commit('updateAside', this.$route.meta.aside);
      this.planId = this.$route.params.planId;
      let company = Cookie.get('company');
      this.$store.dispatch('GetNewPickerListObjs', {planId: 2, supplierName: 'TBO'});
      this.fullscreenLoading = false;
    },

    methods: {}
  }
</script>

<style lang="scss" scoped>
  /*.el-main {*/
    /*border: 1px solid #ddd;*/
  /*}*/

  .update-price {
    width: 100%;
    height: 100%;
    padding: 0;
  }
</style>
