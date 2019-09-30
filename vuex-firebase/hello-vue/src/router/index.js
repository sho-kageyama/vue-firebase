import Vue from 'vue'
import Router from 'vue-router'
import VModal from 'vue-js-modal'
import BoootstrapVue from 'bootstrap-vue'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import Menu from '@/components/Menu'
import Item from '@/components/Item'
import User from '@/components/User/User'
import UserDetail from '@/components/User/UserDetail'
import firebase from 'firebase'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Router, BoootstrapVue, VModal)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: 'signin'
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/menu',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/items',
      name: 'Item',
      component: Item
    },
    {
      path: '/users',
      name: 'User',
      component: User
    },
    {
      path: '/user-detail',
      name: 'UserDetail',
      component: UserDetail
    }
  ]
})

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        next()
      } else {
        next({
          path: '/signin',
          query: { redirect: to.fullPath }
        })
      }
    })
  } else {
    next()
  }
})

export default router
