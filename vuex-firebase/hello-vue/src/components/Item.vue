<template>
    <div class="item">
        <h2>Item</h2>
        <table class="table">
            <thead>
            <tr>
                <th>No</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
            </tr>
            </thead>
            <tbody v-for="(item, index) in itemList" v-bind:key="item.id">
                <tr>
                <td>{{index+1}}</td>
                <td>{{item.name}}</td>
                <td>{{item.price}}</td>
                <td>{{item.category}}</td>
                </tr>
            </tbody>
        </table>
        <button class="btn btn-outline-primary" @click="back">back</button>
    </div>
</template>

<script>
import firebase from 'firebase'
// const prodacts = firebase.firestore().collection('prodacts')
// var array = []
// prodacts.get().then((coll) => {
//   coll.forEach((doc) => {
//     array.push(doc.data())
//   })
// })

export default {
  name: 'Item',
  data () {
    var array = []
    const prodacts = firebase.firestore().collection('prodacts')
    prodacts.get().then((coll) => {
      coll.forEach(doc => {
        array.push(doc.data())
      })
    })
    return {
      itemList: array
    }
  },
  methods: {
    back: function () {
      this.$router.back()
    },
    info: function () {
    }
  }
}
</script>

<style scoped>
h2{
    font-style:italic;
}
.item{
    margin-top:20px;
    display:flex;
    flex-flow:column nowrap;
    justify-content:center;
    align-items:center;
}
</style>
