import Vue from 'vue'
import Router from 'vue-router'

const Login = ()=>import(/* webpackChunkName: "login" */ 'pages/login/login.vue')
const Layout = ()=>import(/* webpackChunkName: "layout" */ 'pages/layout/layout.vue')
const Settings = ()=>import(/* webpackChunkName: "settings" */ 'pages/layout/child/settings/settings.vue')
const MyAccount = ()=>import(/* webpackChunkName: "myAccount" */ 'pages/layout/child/settings/child/myAccount/myAccount.vue')
const Administration = ()=>import(/* webpackChunkName: "administration" */ 'pages/layout/child/administration/administration.vue')
const MyHotel = ()=>import(/* webpackChunkName: "myHotel" */ 'pages/layout/child/administration/child/myHotel/myHotel.vue')
const AddPrice = ()=>import(/* webpackChunkName: "addPrice" */ 'pages/layout/child/administration/child/addPrice/addPrice.vue')
const UpdatePrice = ()=>import(/* webpackChunkName: "updatePrice" */ 'pages/layout/child/administration/child/updatePrice/updatePrice.vue')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path:'/home',
      name:'layout',
      component:Layout,
      redirect:'/home/administration/myHotel',
      children:[
        {
          path:'administration',
          name:'administration',
          component:Administration,
          children:[
            {
              path:'myHotel',
              name:'myHotel',
              component:MyHotel,
            },
            {
              path:'addPrice',
              name:'addPrice',
              component:AddPrice,
            },
            {
              path:'updatePrice',
              name:'updatePrice',
              component:UpdatePrice,
            }
          ]
        },
        {
          path:'settings',
          name:'settings',
          component:Settings,
          children:[
            {
              path:'myAccount',
              name:'myAccount',
              component:MyAccount,
            }
          ]
        },
      ]
    }
  ]
})
