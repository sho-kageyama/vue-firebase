<template>
    <div class="user">
        <h2>User</h2>
        <table class="table table-hover mt-5">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Password</th>
                    <th>Email</th>
                    <th>Authority</th>
                </tr>
            </thead>
            <tbody v-for="(user, index) in userList" v-bind:key="user.id">
                    <tr>
                        <td>{{index+1}}</td>
                        <td><button class="user-btn" @click="detail(user.id)">{{user.name}}</button></td>
                        <td>{{user.password}}</td>
                        <td>{{user.email}}</td>
                        <td v-if="user.authLevel == 1">管理者</td>
                        <td v-else>ユーザー</td>
                    </tr>
            </tbody>
        </table>
        <router-link to="/menu" class="btn btn-outline-danger mt-5" >Back</router-link>
        <button class="btn btn-outline-secondary" @click="info">Info</button>
    </div>
</template>

<script>
export default {
  name: 'User',
  data  () {
    return {
      userList: this.setUserList()
    }
  },
  methods: {
    setUserList: async function () {
      await this.$store.dispatch('userList')
      var users = await this.$store.getters.getUsers
      this.userList = users
    },
    detail: async function (name) {
      await this.$store.dispatch('userInfo', name)
      var user = await this.$store.getters.getUser
      console.log('userInfo: ', user)
      this.$router.push('/user-detail')
    },
    info: function () {
      console.log(this.$store.getters.getUsers)
    }
  }
}
</script>

<style scoped>
.user{
    margin-top:20px;
    display:flex;
    flex-flow:column nowrap;
    justify-content: center;
    align-items: center;
}
button.user-btn{
    background:none;
    border:none;
}
button.user-btn:link{
    color:gray;
}
button.user-btn:hover{
    color:gray;
    background:none;
    border-bottom:1px solid silver;
}
</style>
