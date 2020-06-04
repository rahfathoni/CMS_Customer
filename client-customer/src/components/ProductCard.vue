<template>
    <div class="row row-cols-1 row-cols-md-3">
        <router-link class="col mb-4"
        v-for="(product, i) in productList" :key="i"
        :to="`/product/${product.id}`"
        tag="div"
        >
            <div class="card border-dark mb-3"
            style="max-width: 100%; background-color: rgb(204, 197, 197);"
            >
            <img v-if="product.image_url === 'No image available'"
            src="../assets/noimage.png" alt="NO IMAGE AVAILABLE"
            class="card-img-top mx-auto"
            style="width: 100%; height: 25vw; object-fit: fill;"
            >
            <img v-else :src="product.image_url" alt="image . . ."
            class="card-img-top mx-auto"
            style="width: 100%; height: 25vw; object-fit: fill;"
            >
                <div class="card-body">
                    <hr>
                    <h5 class="card-title text-center">{{ product.name }}</h5>
                    <hr>
                    <p class="card-text"><strong>Price (IDR) : </strong>{{ product.price }}</p>
                    <p v-if="product.stock > 0" class="card-text"><strong>Stock (pcs) :</strong>{{ product.stock }}</p>
                    <p v-else class="card-text text-center text-danger"><strong>SOLD OUT</strong></p>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ProductCard',
  computed: {
    ...mapState(['productList'])
  }
}
</script>

<style>
</style>
