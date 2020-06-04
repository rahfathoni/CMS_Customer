<template>
  <div id="app">
    <Navbar />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { mapMutations } from 'vuex'
export default {
  name: 'App',
  components: {
    Navbar, Footer
  },
  methods: {
    ...mapMutations(['SET_LOGIN'])
  },
  created () {
    if (!localStorage.token) {
      this.SET_LOGIN(false)
    } else {
      this.$router.push('/')
      this.SET_LOGIN(true)
    }
  }
}
</script>

<style>
</style>
