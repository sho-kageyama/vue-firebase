<template>
    <div class="item">
        <h2>Item</h2>
        <table class="table table-hover">
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
export default {
  name: 'Item',
  data () {
    return {
      itemList: this.setItemList()
    }
  },
  methods: {
    back: function () {
      this.$router.back()
    },
    setItemList: async function () {
      await this.$store.dispatch('itemList')
      this.itemList = await this.$store.getters.getItems
    },
    info: async function () {
      await this.$store.dispatch('itemList')
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
