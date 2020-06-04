<template>
  <div>
    <h1>This is an cart page</h1>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  created () {
    if (!localStorage.token) {
      this.$router.push('/')
    }
  }
}
</script>
