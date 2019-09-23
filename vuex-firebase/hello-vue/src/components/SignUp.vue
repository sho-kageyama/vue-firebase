<template>
    <div class="signup">
        <h3>SingUp</h3>
        <input type="text" placeholder="Username" v-model="username">
        <input type="password" placeholder="Password" v-model="password">
        <button class="btn btn-outline-success" @click="signUp">Register</button>
        <p>
        Do you have an account?
        <router-link to="/signin">sign in now!!</router-link>
        </p>
    </div>
</template>

<script>
import firebase from 'firebase'
import 'firebase/firestore'

export default {
  name: 'SignUp',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.username, this.password)
        .then(user => {
          alert('Create acount:' + user.user.email)
          console.log(user.user.uid)
          const userId = user.user.uid
          const users = firebase.firestore().collection('users')
          const userData = {name: user.user.email}
          users.doc(userId).set(userData)
            .then(ref => {
              console.log('Documents ID: ', ref.id)
            }).catch(err => {
              console.log('error document: ', err.message)
            })
        })
        .catch(error => {
          alert(error.message)
        })
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.signup {
  margin-top: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center
}
input {
  margin: 10px 0;
  padding: 10px;
}

</style>
