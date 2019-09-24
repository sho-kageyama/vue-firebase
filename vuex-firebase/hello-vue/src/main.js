// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import store from './store'

Vue.config.productionTip = false

const config = {
  apiKey: 'AIzaSyD2hsVnxxLe1B9XpyDnLSXLkekbra2Zbck',
  authDomain: 'vuewx-firebase.firebaseapp.com',
  databaseURL: 'https://vuewx-firebase.firebaseio.com',
  projectId: 'vuewx-firebase',
  storageBucket: 'vuewx-firebase.appspot.com',
  messagingSenderId: '633824746988',
  appId: '1:633824746988:web:38386d4c8b00f301bd74c9'
}

firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
