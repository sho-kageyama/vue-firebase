<template>
    <div class="detail col-4 offset-4">
        <h2 class="offset-sm-0">User {{msg}}</h2>
        <div class="form-group offset-sm-0">
         <label for="formGroupExampleInput offset-sm-0">User Id</label>
        <input type="text" class="form-control col-10 offset-sm-1" id="formGroupExampleInput" name="id" v-model="user.name">
     </div>
    <div class="form-group offset-sm-0">
        <label for="formGroupExampleInput2 text-left">Password</label>
        <input type="password" class="form-control col-10 offset-sm-1" id="formGroupExampleInput2" name="password" v-model="user.password">
    </div>
    <div class="form-group d-inline-block">
            <label class="type" for="formGroupExampleInput4">User Type</label><br>
    <div  class="custom-control custom-radio d-md-inline-block offset-sm-1">
        <input type="radio" id="customRadio1" class="custom-control-input" name="permissionLevel" v-model="user.authLevel" value="1">
        <label class="custom-control-label" for="customRadio1">管理者</label>
    </div>
    <div class="custom-control custom-radio d-md-inline-block m-4 offset-sm-1">
        <input type="radio" id="customRadio2" class="custom-control-input" name="permissionLevel" v-model="user.authLevel" value="2">
        <label class="custom-control-label" for="customRadio2">ユーザー</label>
    </div>
    </div>

    <div class="form-group user">
            <label for="formGroupExampleInput5">Email</label>
            <input type="email" class="form-control col-10 offset-sm-1" id="formGroupExampleInput2" name="password" v-model="user.email">
    </div><br>
    <div class="form-group">
        <button class="btn btn-outline-primary col-4 offset-sm-0 add" type="button" @click="upReq">Update</button>
        <button class="btn btn-outline-danger col-4 offset-sm-2 back" type="button" @click="delReq">Delete</button>
    </div>
    <div class="form-group user">
        <router-link to="/users" class="btn btn-outline-warning col-10 offset-sm-0">Back</router-link>
    </div>
    <transition name="modal" v-if="showModal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <h4>User {{title}} Confirm</h4>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <table class="table table-bordered">
                <tr>
                  <th>名前</th>
                  <th>Password</th>
                  <th>Email</th>
                  <th>権限</th>
                </tr>
                <tr>
                  <td>{{user.name}}</td>
                  <td>{{user.password}}</td>
                  <td>{{user.email}}</td>
                  <td v-if="user.authLevel == 1">管理者</td>
                  <td v-if="user.authLevel == 2">ユーザー</td>
                </tr>
              </table>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button btn btn-outline-success" @click="dialog(true)">
                OK
              </button>
               <button class="modal-default-button btn btn-outline-warning" @click="dialog(false)">
                Cancel
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
  </div>
</template>

<script>
import MyModal from '../Tools/MyModal'

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
      user: user,
      title: '',
      showModal: false
    }
  },
  components: {MyModal},
  methods: {
    upReq: function () {
      this.$emit('from-child')
      this.title = 'Update'
      this.showModal = true
    },
    delReq: function () {
      if (confirm(this.user.name + 'を削除します。')) {
        this.$store.dispatch('deleteUser', this.user)
        this.$router.push('/users')
        return true
      }
      alert('cancel')
      return false
    },
    dialog: function (flag) {
      if (flag) {
        this.$store.dispatch('updateUser', this.user)
        this.$router.push('/users')
      }
      this.showModal = false
    }
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

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
