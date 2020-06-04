<template>
<div>
  <b-navbar sticky toggleable="sm" type="dark" variant="dark">
    <b-navbar-brand>
        <img src="../assets/wayang.jpg" class="d-inline-block align-top" alt="logo">
        INDONESIA CRAFT SHOP
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item v-if="isLogin" to="/cart">Cart</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="!isLogin">
            <b-button size="sm" class="my-2 my-sm-0" type="button" @click.prevent="showLoginModal">Login</b-button>
          </b-nav-item>
          <b-nav-item v-else>
            <b-button size="sm" class="my-2 my-sm-0" type="button">Logout</b-button>
          </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <LoginModal ref="loginModalComponent" />
</div>
</template>

<script>
import LoginModal from './LoginModal'
import { mapState } from 'vuex'
export default {
  name: 'Navbar',
  components: {
    LoginModal
  },
  computed: {
    ...mapState(['isLogin'])
  },
  methods: {
    showLoginModal () {
      this.$refs.loginModalComponent.showLogin()
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
