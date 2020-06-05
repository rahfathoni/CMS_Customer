<template>
    <div>
        <b-modal id='buyItemModal'
        ref='buyItemModal'
        hide-footer
        no-close-on-backdrop
        centered
        size="md"
        >
            <template v-slot:modal-title>
                ITEM CONFIRMATION
            </template>
            <div class="modal-body mt-0">
                <h4 class="text-center mb-3">{{ nameItem }}</h4>
                <h6>Price/pcs (IDR) : {{ priceItem }}</h6>
                <h6>Stock : {{ stockItem }}</h6>
                <hr>
                <h6>Total Price (IDR) : {{ totalPriceItem }}</h6>
                <hr>
                <div class="text-center">
                    <button class="btn btn-success btn-lg" @click.prevent="cartBuy">
                        <strong>BUY</strong>
                    </button>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'CartBuyModal',
  computed: {
    ...mapState(['buyCart'])
  },
  data () {
    return {
      idItem: '',
      nameItem: '',
      priceItem: '',
      stockItem: '',
      totalPriceItem: ''
    }
  },
  methods: {
    ...mapActions(['paymentItem', 'readCart']),
    ...mapMutations(['SET_BUY_CART', 'SET_CART_LIST', 'SET_CART_NONE']),
    showBuy () {
      this.idItem = this.buyCart.id
      this.nameItem = this.buyCart.Product.name
      this.priceItem = this.buyCart.Product.price
      this.stockItem = this.buyCart.Product.stock
      this.totalPriceItem = this.buyCart.totalPrice
      this.$refs.buyItemModal.show()
    },
    cartBuy () {
      this.paymentItem({
        id: this.idItem,
        isPaid: true,
        token: localStorage.token
      })
        .then(({ data }) => {
          this.SET_BUY_CART('')
          this.newCartList()
          this.$refs.buyItemModal.hide()
        })
        .then(_ => {
        })
    },
    newCartList () {
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
  }
}
</script>

<style>
</style>
