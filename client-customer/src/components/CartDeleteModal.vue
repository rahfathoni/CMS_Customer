<template>
    <div>
        <b-modal id='deleteCartModal'
        ref='deleteCartModal'
        hide-footer
        no-close-on-backdrop
        centered
        size="md"
        >
            <template v-slot:modal-title>
                DELETE CART
            </template>
            <div class="modal-body mt-0">
                <h5 class="text-center mb-3">
                    DELETE CART WITH ITEM "{{ nameItem }}" ?
                </h5>
                <div class="text-center">
                    <button class="btn btn-danger btn-lg" @click.prevent="cartDelete">
                        <strong>DELETE</strong>
                    </button>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'CartDeleteModal',
  computed: {
    ...mapState(['deleteCart'])
  },
  data () {
    return {
      idItem: '',
      nameItem: ''
    }
  },
  methods: {
    ...mapActions(['deleteCartAction', 'readCart']),
    ...mapMutations(['SET_DELETE_CART', 'SET_CART_LIST', 'SET_CART_NONE']),
    showDelete () {
      this.idItem = this.deleteCart.id
      this.nameItem = this.deleteCart.Product.name
      this.$refs.deleteCartModal.show()
    },
    cartDelete () {
      this.deleteCartAction({
        id: this.idItem,
        token: localStorage.token
      })
        .then(({ data }) => {
          this.SET_DELETE_CART('')
          this.newCartList()
          this.$refs.deleteCartModal.hide()
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
