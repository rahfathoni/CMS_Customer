<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-lg-8 mx-auto">
              <div class="input-group mb-3">
                <input type="text" @input.prevent="" v-model="productName" class="form-control border-dark" placeholder="search product.." required>
              </div>
              <div class="form-label-group">
              </div><br>
            </div>
        </div>
      <div>
        <ProductCard />
      </div>
      <!-- <div v-else>
          <div class="container">
            <div class="text-center">
              <h2><a class="text-uppercase">{{ productName }}</a> NOT FOUND</h2>
            </div>
         </div>
      </div> -->
    </div>
</template>

<script>
import ProductCard from '../components/ProductCard'
export default {
  name: 'Main',
  components: {
    ProductCard
  },
  data () {
    return {
      productName: ''
    }
  }
}
</script>
