<template>
    <div class="menu">
        <h2>Menu</h2>
        <ul class="menu-ul nav nav-tabs mt-5">
            <li class="nav-item"><a class="nav-link active">Prodact</a></li>
            <li class="nav-item"><router-link to="/items" class="nav-link">Item</router-link></li>
            <li class="nav-item"><router-link to="/users" class="nav-link">User</router-link></li>
            <li class="nav-item"><a class="nav-link">Cart</a></li>
        </ul>
        <ul class="mt-5">
        <!-- <button class="btn btn-outline-success" @click="userInfo">Info</button> -->
        <button class="btn btn-outline-danger" @click="signout">Sign Out</button>
        </ul>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Menu',
  methods: {
    // userInfo: function () {
    //   const id = firebase.auth().currentUser.uid
    //   var data
    //   const info = firebase.firestore().collection('users').doc(id)
    //   info.get().then((doc) => {
    //     if (doc.exists) {
    //       data = doc.data()
    //       console.log('Document data:', doc.data().authLevel)
    //       console.log('data :', data)
    //     }
    //   })
    //   console.log(id)
    // },
    signout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    }
  }
}
</script>

<style scoped>
h2{
    font-style:italic;
    font-family:'Myrio';
}
ul{
    list-style:none;
    padding:0;
}
li{
    display:inline-block;
    margin: 0 10px;
}
.menu{
    margin-top: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center
}
</style>
