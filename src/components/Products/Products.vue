<template>
  <div class="products">
    <section class="productsapp">
      <header class="header">
        <h1>products</h1>
      </header>
      <section class="main" v-if="!isLoaded">
        <ul>
          l
          <li v-for="product in products" :key="product.id">
            {{ product.id }}, {{ product.title }}
          </li>
        </ul>

      </section>
      <footer class="footer"></footer>
    </section>
    <footer class="info"></footer>
  </div>
</template>

<style scoped></style>

<script setup>
import {onMounted, ref} from "vue";
import ProductsApi from "@/components/services/productsApi";
const products = ref({})
const isLoaded = ref(true);

onMounted(async () => {

  ProductsApi.getProducts(isLoaded).then((data) => {
    isLoaded.value = data.isLoaded
    products.value = data.data
    // console.log(data)
  })


  //через промис
  // products.value = ProductsApi.getProducts()
  //     .then((data) => {
  //     products.value = data
  //   });

  // console.log(products)
})



</script>
