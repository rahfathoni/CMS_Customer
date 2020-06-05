<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-lg">
        <h3 class="text-left">{{ emailLogin }} CART  <b-icon icon="cart4"></b-icon></h3>
        <hr style="border-top: 3px solid #8c8b8b;">
        <div v-if="cartList !== false">
          <CartTable />
        </div>
        <div v-else>
          <div class="container mt-2">
            <div class="text-center">
              <h4>{{ cartNone }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartTable from '../components/CartTable'
import { mapMutations, mapActions, mapState } from 'vuex'
export default {
  name: 'Cart',
  components: {
    CartTable
  },
  computed: {
    ...mapState(['cartList', 'emailLogin', 'cartNone'])
  },
  methods: {
    ...mapMutations(['SET_CART_LIST', 'SET_EMAIL_LOGIN', 'SET_LOGIN', 'SET_CART_NONE']),
    ...mapActions(['readCart']),
    getCart () {
      this.readCart(localStorage.token)
        .then(({ data }) => {
          if (data.carts.length === 0) {
            this.SET_CART_NONE('YOUR CART IS EMPTY')
            this.SET_CART_LIST(false)
          } else {
            this.SET_CART_NONE('')
            this.SET_CART_LIST(data.carts)
          }
        })
        .catch(_ => {
          this.SET_CART_LIST(false)
        })
    }
  },
  created () {
    if (!localStorage.token) {
      this.$router.push('/')
      this.SET_EMAIL_LOGIN(null)
      this.SET_LOGIN(false)
    } else if (localStorage.token && !localStorage.email) {
      this.$router.push('/')
      localStorage.clear()
      this.SET_EMAIL_LOGIN(null)
      this.SET_LOGIN(false)
    } else {
      this.SET_LOGIN(true)
      this.SET_EMAIL_LOGIN(localStorage.email)
      this.getCart()
    }
  }
}
</script>
