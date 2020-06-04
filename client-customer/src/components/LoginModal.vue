<template>
    <div>
        <b-modal id='loginModal'
            ref='loginModal'
            hide-footer
            no-close-on-backdrop
            centered
            size="md"
        >
            <template v-slot:modal-title>
                LOGIN
            </template>
            <h6 class="text-center text-danger" v-if="errorMessage">{{ errorMessage }} </h6>
            <form v-on:submit.prevent="login">
                <div class="modal-body">
                    <div class="form-label-group">
                        <label><strong>Email address</strong></label>
                        <input type="email" v-model="loginEmail" class="form-control" placeholder="Email address" required>
                    </div>
                    <div class="form-label-group mt-3">
                        <label><strong>Password</strong></label>
                        <input type="password" v-model="loginPassword" class="form-control" placeholder="Password" required>
                    </div><br>
                    </div>
                    <button type="submit" class="btn btn-lg btn-primary btn-block"><strong>LOGIN</strong></button>
            </form>
            <hr class="my-4">
            <div class="text-center">
                <p>Don't have account? Please Register Here</p>
            </div>
            <button class="btn btn-warning btn-lg btn-block" @click.prevent="registerView">
                <strong>REGISTER</strong>
            </button>
        </b-modal>
    </div>
</template>

<script>
export default {
  name: 'LoginModal',
  data () {
    return {
      loginEmail: '',
      loginPassword: '',
      errorMessage: false
    }
  },
  methods: {
    showLogin () {
      this.$refs.loginModal.show()
      this.loginEmail = ''
      this.loginPassword = ''
      this.errorMessage = false
    },
    login () {
      this.$refs.loginModal.hide()
    },
    registerView () {
      this.$router.push('/register')
      this.$refs.loginModal.hide()
    }
  }
}
</script>

<style>
</style>
