<template>
  <div class="products">
    <section class="productsapp">
      <header class="header">
        <h1>products</h1>
      </header>
      <section class="main">
        <ul>
          <li v-for="product in products">
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
// export default {};
import {onMounted, ref} from "vue";
import axios from "axios";
const products = ref([])


onMounted(async () => {
  const res =  (((await axios.get("https://fakestoreapi.com/products"))))
  products.value = res.data
  console.log(products)
})



</script>
