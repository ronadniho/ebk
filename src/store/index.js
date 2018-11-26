import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import myhotels from './modules/myhotels'
import breadcrumb from './modules/breadcrumb'
import myHotelsPrice from './modules/myHotelsPrice'
import aside from './modules/aside'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    myhotels,
    breadcrumb,
    myHotelsPrice,
    aside
  },
  getters
})

export default store
