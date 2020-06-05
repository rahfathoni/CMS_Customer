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
        <div class="modal-body">
          <form v-on:submit.prevent="loginForm">
            <div class="form-label-group">
                <label><strong>Email address</strong></label>
                <input type="email" v-model="loginEmail" class="form-control" placeholder="Email address" required>
            </div>
            <div class="form-label-group my-3">
              <label><strong>Password</strong></label>
              <div class="input-group mb-3">
                <input :type="secretPass" v-model="loginPassword" class="form-control" placeholder="Password" required>
                <div class="input-group-prepend">
                  <button class="btn btn-dark" @click.prevent="secretChange" type="button">
                    <b-icon :icon="secretIcon" variant="light"></b-icon>
                  </button>
                </div>
              </div>
            </div>
            <button type="submit" class="btn btn-lg btn-primary btn-block"><strong>LOGIN</strong></button>
          </form>
          <div class="text-center">
            <h5 class="mt-3"><strong>OR</strong></h5>
            <button class="btn">
                <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
            </button>
          </div>
          <hr class="my-4">
          <div class="text-center">
              <p>Don't have account? Please Register Here</p>
          </div>
          <button class="btn btn-warning btn-lg btn-block" @click.prevent="registerView">
              <strong>REGISTER</strong>
          </button>
        </div>
      </b-modal>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import GoogleLogin from 'vue-google-login'
export default {
  name: 'LoginModal',
  components: {
    GoogleLogin
  },
  computed: {
    ...mapState(['params'])
  },
  data () {
    return {
      loginEmail: '',
      loginPassword: '',
      errorMessage: false,
      secretPass: 'password',
      secretIcon: 'eye-slash',
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      }
    }
  },
  methods: {
    ...mapMutations(['SET_LOGIN', 'SET_EMAIL_LOGIN']),
    ...mapActions(['loginCustomer', 'googleSuccess']),
    secretChange () {
      if (this.secretPass === 'password') {
        this.secretPass = 'text'
        this.secretIcon = 'eye'
      } else {
        this.secretPass = 'password'
        this.secretIcon = 'eye-slash'
      }
    },
    showLogin () {
      this.$refs.loginModal.show()
      this.loginEmail = ''
      this.loginPassword = ''
      this.errorMessage = false
      this.secretPass = 'password'
      this.secretIcon = 'eye-slash'
    },
    loginForm () {
      this.loginCustomer({
        email: this.loginEmail,
        password: this.loginPassword
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('email', data.email)
          this.errorMessage = false
          this.SET_LOGIN(true)
          this.SET_EMAIL_LOGIN(data.email)
          this.$refs.loginModal.hide()
          if (this.$router.app.$root._route.name === 'Register') {
            this.$router.push('/')
          }
        })
        .catch(err => {
          this.errorMessage = err.response.data.errors[0].message
        })
    },
    registerView () {
      this.$router.push('/register')
      this.$refs.loginModal.hide()
    },
    onSuccess (googleUser) {
      const idToken = googleUser.getAuthResponse().id_token
      this.googleSuccess(idToken)
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('email', data.email)
          this.SET_LOGIN(true)
          this.SET_EMAIL_LOGIN(data.email)
          this.$refs.loginModal.hide()
          if (this.$router.app.$root._route.name === 'Register') {
            this.$router.push('/')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    onFailure (error) {
      console.log('google login fail', error)
    }
  }
}
</script>

<style>
</style>
