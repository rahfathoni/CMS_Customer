<template>
<div>
  <b-navbar sticky toggleable="md" type="dark" variant="dark">
    <b-navbar-brand>
        <img src="../assets/wayang.jpg" class="d-inline-block align-top" alt="logo">
        INDONESIA CRAFT SHOP
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/"><span class="text-light">HOME</span></b-nav-item>
        <b-nav-item v-if="isLogin" to="/cart"><span class="text-light">MY CART</span></b-nav-item>
        <b-nav-item disabled></b-nav-item>
        <b-nav-item disabled></b-nav-item>
        <b-nav-text v-if="isLogin"><span class="text-light">Welcome {{ emailLogin }}</span></b-nav-text>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="!isLogin">
            <b-button class="my-2 my-sm-0" type="button" @click.prevent="showLoginModal">Login</b-button>
          </b-nav-item>
          <b-nav-item v-else>
            <b-button size="sm" class="my-2 my-sm-0" type="button" @click.prevent="logout">Logout</b-button>
          </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <LoginModal ref="loginModalComponent" />
</div>
</template>

<script>
import LoginModal from './LoginModal'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Navbar',
  components: {
    LoginModal
  },
  computed: {
    ...mapState(['isLogin', 'emailLogin'])
  },
  methods: {
    ...mapMutations(['SET_LOGIN', 'SET_EMAIL_LOGIN']),
    showLoginModal () {
      this.$refs.loginModalComponent.showLogin()
    },
    logout () {
      localStorage.clear()
      this.SET_LOGIN(false)
      this.SET_EMAIL_LOGIN(null)
      if (this.$route.name !== 'Main') {
        this.$router.push({ name: 'Main' })
      }
    }
  }
}
</script>

<style>
    img {
        width:32px;
        height:auto;
    }
</style>
