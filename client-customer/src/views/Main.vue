<template>
    <div class="container mt-4 mb-5">
        <div class="row mb-3">
            <div class="col-lg-8 mx-auto">
              <form class="form-signin" @submit.prevent="readProducts">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <button class="btn btn-dark" type="submit"><b-icon icon="search" variant="light"></b-icon></button>
                    </div>
                    <input type="text" v-model="productName" class="form-control border-dark" placeholder="search item. . .">
                </div>
              </form>
            </div>
        </div>
      <div v-if="productList !== false">
        <ProductCard />
      </div>
      <div v-else>
          <div class="container">
            <div class="text-center">
              <h2><a class="text-uppercase">{{ failedName }}</a> NOT FOUND</h2>
            </div>
         </div>
      </div>
    </div>
</template>

<script>
import ProductCard from '../components/ProductCard'
import { mapMutations, mapActions, mapState } from 'vuex'
export default {
  name: 'Main',
  components: {
    ProductCard
  },
  data () {
    return {
      productName: '',
      failedName: ''
    }
  },
  computed: {
    ...mapState(['productList'])
  },
  methods: {
    ...mapMutations(['SET_PRODUCT_LIST']),
    ...mapActions(['readProductByName']),
    readProducts () {
      this.readProductByName({
        name: this.productName
      })
        .then(({ data }) => {
          this.failedName = ''
          this.SET_PRODUCT_LIST(data.products)
        })
        .catch(_ => {
          this.failedName = this.productName
          this.SET_PRODUCT_LIST(false)
        })
    }
  },
  created () {
    this.readProducts()
  }
}
</script>
