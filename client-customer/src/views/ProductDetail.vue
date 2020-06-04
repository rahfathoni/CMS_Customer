<template>
    <div class="container my-5">
      <div class="row">
        <div class="col-md-6">
          <div class="card mb-4 text-center border-dark">
            <img v-if="detailImageUrl === null"
            class="card-img-top mx-auto"
            style="width: 100%; height: 30vw; object-fit: fill;"
            alt="NO IMAGE AVAILABLE"
            src="../assets/noimage.png"
            >
            <img v-else
            class="card-img-top mx-auto"
            style="width: 100%; height: 30vw; object-fit: fill;"
            alt="IMAGE. . ."
            :src="detailImageUrl"
            >
          </div>
        </div>
        <div class="col-md-6">
            <h4 class="card-title">{{ detailName }}</h4>
            <p class="card-text"><strong>Description :</strong></p>
            <p class="card-text">{{ detailDescription }}</p>
            <p class="card-text"><strong>Price (IDR) : </strong>{{ detailPrice }}</p>
            <div v-if="detailStock > 0">
                <p class="card-text"><strong>Stock (pcs) :</strong>{{ detailStock }}</p>
                <form @submit.prevent="addCartForm">
                    <p class="card-text text-center"><strong>BUY ITEM</strong></p>
                    <div class="form-group row">
                        <div class="col">
                            <input type="number" class="form-control" v-model="quantity" min="1" :max="detailStock" placeholder="1" required>
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
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ProductDetail',
  data () {
    return {
      detailId: this.$route.params.productId,
      detailName: '',
      detailDescription: '',
      detailImageUrl: null,
      detailPrice: 0,
      detailStock: 0,
      quantity: ''
    }
  },
  methods: {
    ...mapActions(['searchProduct']),
    addCartForm () {
    },
    getProductById () {
      this.searchProduct({
        productId: this.detailId
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
          console.log(err.response)
        })
    }
  },
  created () {
    this.getProductById()
  }
}
</script>

<style>
</style>
