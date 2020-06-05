<template>
    <div>
        <small class="form-text text-dark my-0 mb-2 h6">
            Yellow row = Out of stock before purchase
        </small>
        <table class="table table-hover table-bordered table-dark table-responsive-md mb-5">
            <thead>
                <tr>
                    <th scope="col" class="text-center col-1">No</th>
                    <th scope="col" class="text-center col-2">Image</th>
                    <th scope="col" class="text-center col-4">Name</th>
                    <th scope="col" class="text-center col-1">Price/pcs (IDR)</th>
                    <th scope="col" class="text-center col-1">Quantity</th>
                    <th scope="col" class="text-center col-2">Total Price (IDR)</th>
                    <th scope="col" class="text-center col-1">Buy / Delete</th>
                </tr>
            </thead>
            <tbody v-for="(cart, i) in cartList" :key="i"
            >
            <tr v-if="cart.Product.stock === 0 || !cart.Product" class="bg-custome-yellow text-dark">
                <th scope="row">{{ i+1 }}.</th>
                <td>
                    <img v-if="cart.Product.image_url === 'No image available'"
                        class="mx-auto"
                        style="width: 100%; height: 6vw; object-fit: contain;"
                        alt="NO IMAGE AVAILABLE"
                        src="../assets/noimage.png"
                    >
                    <img v-else
                        class="mx-auto"
                        style="width: 100%; height: 6vw; object-fit: contain;"
                        alt="IMAGE. . ."
                        :src="cart.Product.image_url"
                    >
                </td>
                <td>
                   <router-link class="text-light" :to="`/product/${cart.Product.id}`">{{ cart.Product.name }}</router-link>
                </td>
                <td class="text-right">{{ cart.Product.price }}</td>
                <td class="text-ccenter">{{ cart.quantity }}</td>
                <td class="text-right">{{ cart.totalPrice }}</td>
                <td>
                    <div class="text-center">
                        <button type="button" @click.prevent="cartClickDelete(cart)" class="btn btn-danger btn-sm">DELETE</button>
                    </div>
                </td>
            </tr>
            <tr v-else>
                <th scope="row">{{ i+1 }}.</th>
                <td>
                    <img v-if="cart.Product.image_url === 'No image available'"
                        class="mx-auto"
                        style="width: 100%; height: 6vw; object-fit: contain;"
                        alt="NO IMAGE AVAILABLE"
                        src="../assets/noimage.png"
                    >
                    <img v-else
                        class="mx-auto"
                        style="width: 100%; height: 6vw; object-fit: contain;"
                        alt="IMAGE. . ."
                        :src="cart.Product.image_url"
                    >
                </td>
                <td>
                    <router-link class="text-light" :to="`/product/${cart.Product.id}`">{{ cart.Product.name }}</router-link>
                </td>
                <td class="text-right">{{ cart.Product.price }}</td>
                <td class="text-center">{{ cart.quantity }}</td>
                <td class="text-right">{{ cart.totalPrice }}</td>
                <td>
                    <div class="text-center">
                        <button type="button" @click.prevent="cartClickBuy(cart)" class="btn btn-success btn-sm">BUY</button>
                        <button type="button" @click.prevent="cartClickDelete(cart)" class="btn btn-danger btn-sm mt-2">DELETE</button>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
        <CartBuyModal ref="cartBuyComponent" />
        <CartDeleteModal ref="cartDeleteComponent" />
    </div>
</template>

<script>
import CartBuyModal from './CartBuyModal.vue'
import CartDeleteModal from './CartDeleteModal.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'CartTable',
  components: {
    CartBuyModal, CartDeleteModal
  },
  computed: {
    ...mapState(['cartList'])
  },
  methods: {
    ...mapMutations(['SET_BUY_CART', 'SET_DELETE_CART']),
    cartClickBuy (cartBuy) {
      this.SET_BUY_CART(cartBuy)
      this.$refs.cartBuyComponent.showBuy()
    },
    cartClickDelete (cartDelete) {
      this.SET_DELETE_CART(cartDelete)
      this.$refs.cartDeleteComponent.showDelete()
    }
  },
  created () {
    this.SET_BUY_CART('')
  }
}
</script>

<style>
</style>
