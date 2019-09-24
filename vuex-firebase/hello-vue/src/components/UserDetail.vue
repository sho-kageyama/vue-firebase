<template>
    <div class="detail col-4 offset-4">
        <h2 class="offset-sm-0">User {{msg}}</h2>
        <div class="form-group offset-sm-0">
         <label for="formGroupExampleInput offset-sm-0">User Id</label>
        <input type="text" class="form-control col-10 offset-sm-1" id="formGroupExampleInput" name="id" readonly v-model="user.name">
     </div>
    <div class="form-group offset-sm-0">
        <label for="formGroupExampleInput2 text-left">Password</label>
        <input type="password" class="form-control col-10 offset-sm-1" id="formGroupExampleInput2" name="password" v-model="user.password">
    </div>
    <div class="form-group d-inline-block">
            <label class="type" for="formGroupExampleInput4">User Type</label><br>
    <div  class="custom-control custom-radio d-md-inline-block offset-sm-1">
        <input type="radio" id="customRadio1" class="custom-control-input" name="permissionLevel" checked="user.authLevel == 1">
        <label class="custom-control-label" for="customRadio1">管理者</label>
    </div>
    <div class="custom-control custom-radio d-md-inline-block m-4 offset-sm-1">
        <input type="radio" id="customRadio2" class="custom-control-input" name="permissionLevel" checked="user.authLevel == 2">
        <label class="custom-control-label" for="customRadio2">ユーザー</label>
    </div>
    </div>

    <div class="form-group user">
            <label for="formGroupExampleInput5">Note</label>
            <textarea type="text" class="form-control col-10 offset-sm-1" id="formGroupExampleInput5" name="note" placeholder="Note Write hear"></textarea>
    </div><br>
    <div class="form-group">
        <button class="btn btn-outline-primary col-4 offset-sm-0 add" type="button" >Update</button>
        <button class="btn btn-outline-danger col-4 offset-sm-2 back" type="button" >Delete</button>
    </div>
    <div class="form-group user">
        <router-link to="/users" class="btn btn-outline-warning col-10 offset-sm-0">Back</router-link>
    </div>
    </div>
</template>

<script>
export default {
  name: 'UserDetail',
  data () {
    var user = this.$store.getters.getUser
    console.log('user', user)
    if (user == null) {
      // message = user.name + 'edit'
    }
    return {
      msg: 'edit',
      user: user
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.detail{
    width:100%;
    margin-top:20px;
    display:flex;
    flex-flow:column nowrap;
    justify-content: center;
}
</style>
