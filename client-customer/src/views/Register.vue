<template>
    <div class="container my-5">
        <div class="row">
            <div class="col-lg-12">
              <h1 class="text-center">REGISTER YOUR ACCOUNT</h1>
              <h5 class="text-center text-danger" v-if="errorMessage">{{ errorMessage }} </h5>
              <form class="my-5" @submit.prevent="registerForm">
                <div class="form-group row">
                  <label><strong>Email Address</strong></label>
                  <input type="email" class="form-control" v-model="registerEmail" placeholder="Email Address" required>
                </div>
                <div class="form-group row">
                  <label><strong>Password</strong></label>
                  <div class="input-group mb-3">
                    <input :type="secretPass" v-model="registerPassword" class="form-control" placeholder="Password" required>
                    <div class="input-group-prepend">
                      <button class="btn btn-dark" @click.prevent="secretChange" type="button">
                        <b-icon :icon="secretIcon" variant="light"></b-icon>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <label><strong>Password Confirmation</strong></label>
                  <input type="password" class="form-control" v-model="confirmationPassword" placeholder="Password Confirmation" required>
                </div>
                <div class="form-group row">
                  <div class="col">
                  </div>
                  <div class="col">
                    <button type="submit" class="btn btn-success">SUBMIT</button>
                  </div>
                  <div class="col">
                    <button type="button" @click.prevent="reset" class="btn btn-danger">RESET</button>
                  </div>
                </div>
              </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Register',
  data () {
    return {
      registerEmail: '',
      registerPassword: '',
      confirmationPassword: '',
      errorMessage: false,
      secretPass: 'password',
      secretIcon: 'eye-slash'
    }
  },
  methods: {
    ...mapActions(['register']),
    secretChange () {
      if (this.secretPass === 'password') {
        this.secretPass = 'text'
        this.secretIcon = 'eye'
      } else {
        this.secretPass = 'password'
        this.secretIcon = 'eye-slash'
      }
    },
    reset () {
      this.registerEmail = ''
      this.registerPassword = ''
      this.confirmationPassword = ''
      this.errorMessage = false
    },
    registerForm () {
      if (this.registerPassword !== this.confirmationPassword) {
        this.errorMessage = 'Invalid Password Confirmation'
        this.confirmationPassword = ''
      } else {
        this.register({
          email: this.registerEmail,
          password: this.registerPassword
        })
          .then(({ data }) => {
            this.registerEmail = ''
            this.registerPassword = ''
            this.confirmationPassword = ''
            this.errorMessage = false
            this.$router.push('/')
          })
          .catch(err => {
            this.registerPassword = ''
            this.confirmationPassword = ''
            this.errorMessage = err.response.data.errors[0].message
          })
      }
    }
  },
  created () {
    this.registerEmail = ''
    this.registerPassword = ''
    this.confirmationPassword = ''
    this.errorMessage = false
    if (localStorage.token) {
      this.$router.push('/')
    }
  }
}
</script>

<style>
</style>
