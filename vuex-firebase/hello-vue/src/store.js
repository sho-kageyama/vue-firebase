import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    items: [],
    user: null
  },
  getters: {
    getUsers (state) {
      return state.users
    },
    getItems (state) {
      return state.items
    },
    getUser (state) {
      return state.user
    }
  },
  mutations: {
    setUsers (state, data) {
      state.users = data
    },
    setItems (state, data) {
      state.items = data
    },
    setUser (state, data) {
      state.user = data
    }
  },
  actions: {
    createUser ({commit}, data) {
      firebase.auth().createUserWithEmailAndPassword(data.username, data.password)
        .then(user => {
          alert('Create acount: ' + user.user.email)
          var array = data.username.split('@')
          const userData = {data: {name: array[0], password: data.password, email: user.user.email, authLevel: 2}, id: user.user.uid}
          const users = firebase.firestore().collection('users')
          users.doc(userData.id).set(userData.data)
            .then(ref => {
              console.log('Documents ID: ', ref.id)
            }).catch(err => {
              console.log('error document: ', err.message)
            })
        })
        .catch(error => {
          alert(error.message)
        })
    },
    async userList ({ commit }) {
      var list = []
      const users = firebase.firestore().collection('users')
      await users.get().then((col) => {
        col.forEach(user => {
          const data = {id: user.id, name: user.data().name, email: user.data().email, password: user.data().password, authLevel: user.data().authLevel}
          list.push(data)
        })
        commit('setUsers', list)
      })
    },
    async itemList ({commit}) {
      var list = []
      const prodacts = firebase.firestore().collection('prodacts')
      await prodacts.get().then((col) => {
        col.forEach(item => {
          const data = {id: item.id, name: item.data().name, price: item.data().price, category: item.data().category}
          list.push(data)
        })
        commit('setItems', list)
      })
    },
    async userInfo ({commit}, data) {
      var user = null
      if (data != null) {
        const userInfo = firebase.firestore().collection('users').doc(data)
        await userInfo.get().then((doc) => {
          console.log(doc.data())
          user = {id: doc.id, name: doc.data().name, password: doc.data().password, email: doc.data().email, authLevel: doc.data().authLevel}
          console.log('userInfo: ', user)
          commit('setUser', user)
        })
      }
    },
    async updateUser ({commit}, data) {
      const users = firebase.firestore().collection('users')
      const user = {name: data.name, email: data.email, password: data.password, authLevel: data.authLevel}
      users.doc(data.id).set(user).then(ref => {
        console.log('success: ', ref.id)
      }).catch(err => {
        console.log('error:  ', err.message)
      })
    },
    async deleteUser ({commit}, data) {
      const users = firebase.firestore().collection('users')
      users.doc(data.id).delete().then(ref => {
        console.log('success: ', ref.id)
      }).catch(err => {
        console.log('error: ', err.message)
      })
    }
  }
})
