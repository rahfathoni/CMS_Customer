<template>
    <div class="container my-5">
      <div class="row">
        <div class="col-md-6">
          <div class="card mb-4 text-center border-dark">
            <img v-if="detailImageUrl === null"
            class="card-img-top mx-auto"
            style="width: 100%; height: 32vw; object-fit: contain;"
            alt="NO IMAGE AVAILABLE"
            src="../assets/noimage.png"
            >
            <img v-else
            class="card-img-top mx-auto"
            style="width: 100%; height: 32vw; object-fit: contain;"
            alt="IMAGE. . ."
            :src="detailImageUrl"
            >
          </div>
        </div>
        <div class="col-md-6">
            <h4 class="card-title">{{ detailName }}</h4>
            <p class="card-text mb-0"><strong>Description :</strong></p>
            <p class="card-text mt-0">{{ detailDescription }}</p>
            <p class="card-text"><strong>Price (IDR) : </strong>{{ detailPrice }} /pcs</p>
            <div v-if="detailStock > 0">
                <p class="card-text"><strong>Stock (pcs) :</strong>{{ detailStock }}</p>
                <form @submit.prevent="addCartForm">
                    <p class="card-text text-center"><strong>BUY ITEM</strong></p>
                    <div class="form-group row">
                        <div class="col">
                            <input type="number" class="form-control" v-model="inputQuantity" min="1" :max="detailStock" required>
                        </div>
                        <div class="col">
                            <button type="submit" class="btn btn-success">ADD TO MY CART</button>
                        </div>
                    </div>
                </form>
            </div>
            <div v-else>
                <p class="card-text text-center text-danger"><strong>SOLD OUT</strong></p>
            </div>
            <p class="text-center text-danger" v-if="errorMessage"><strong>{{ errorMessage }}</strong></p>
        </div>
      </div>
      <LoginModal ref="loginModalComponent" />
    </div>
</template>

<script>
import LoginModal from '../components/LoginModal'
import { mapActions } from 'vuex'
export default {
  name: 'ProductDetail',
  components: {
    LoginModal
  },
  data () {
    return {
      detailId: this.$route.params.productId,
      detailName: '',
      detailDescription: '',
      detailImageUrl: null,
      detailPrice: 0,
      detailStock: 0,
      inputQuantity: 1,
      errorMessage: false
    }
  },
  methods: {
    ...mapActions(['searchProduct', 'addCart']),
    getProductById () {
      this.searchProduct({
        ProductId: this.detailId
      })
        .then(({ data }) => {
          this.detailName = data.product.name
          this.detailDescription = data.product.description
          if (data.product.image_url === 'No image available') {
            this.detailImageUrl = null
          } else {
            this.detailImageUrl = data.product.image_url
          }
          this.detailPrice = data.product.price
          this.detailStock = data.product.stock
        })
        .catch(err => {
          this.errorMessage = err.response.data.errors[0].message
        })
    },
    addCartForm () {
      if (!localStorage.token) {
        this.$refs.loginModalComponent.showLogin()
      } else {
        this.addCart({
          ProductId: this.detailId,
          quantity: this.inputQuantity,
          token: localStorage.token
        })
          .then(({ data }) => {
            this.errorMessage = false
            this.$router.push('/cart')
          })
          .catch(err => {
            this.errorMessage = err.response.data.errors[0].message
          })
      }
    }
  },
  created () {
    this.inputQuantity = 1
    this.errorMessage = false
    this.getProductById()
  }
}
</script>

<style>
</style>
