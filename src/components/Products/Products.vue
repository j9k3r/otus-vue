<template>
  <div class="products">
    <section class="productsapp">
      <header class="header">
        <h1>products</h1>
      </header>
      <section class="main" v-if="!isLoaded">
        <ul>
          <li v-for="product in rawProducts" :key="product.id">
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
import {computed, onMounted, reactive, ref} from "vue";
import ProductsApi from "@/components/services/productsApi";
const isLoaded = ref(true)
const rawProducts = ref({})

// onMounted(async () => {
onMounted( () => {

  ProductsApi.getProducts(isLoaded.value).then((data) => {
    console.log(data)
    isLoaded.value = data.isLoaded
    rawProducts.value = data.data

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
