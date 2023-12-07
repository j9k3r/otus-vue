<template>
  <div class="products">
    <section class="productsapp">
      <header class="header">
        <h1>products</h1>
      </header>
      <section class="main" v-if="!isLoaded">

          <p><input type="text" v-model="title" /></p>

<!--          <h1 style="color: red">{{products}}</h1>-->
<!--        <ul>-->
<!--          <li v-if="!isLoaded" v-for="product in rawProducts" :key="product.id">-->
<!--            {{ product.id }}, {{ product.title }}-->
<!--          </li>-->
<!--        </ul>-->
          <product-list v-if="!isLoaded" :raw-products="rawProducts" :title="title"></product-list>
<!--          <product-list v-if="!isLoaded" :raw-roducts="rawProducts.value"></product-list>-->



      </section>
      <footer class="footer"></footer>
    </section>
    <footer class="info"></footer>
  </div>
</template>

<style scoped></style>

<script setup>
import {computed, onMounted, ref} from "vue";
import ProductsApi from "@/components/services/productsApi";
import ProductList from "@/components/Products/ProductList.vue";

const rawProducts = ref({})
// const rawProducts = reactive({})
const title = ref('')
const isLoaded = ref(true);
// rawProducts, title


onMounted( () => {

  ProductsApi.getProducts(isLoaded.value).then((data) => {
    console.log(data)
    isLoaded.value = data.isLoaded
    rawProducts.value = data.data

    // console.log(data)
  })


  //через промис
  // rawProducts.value = ProductsApi.getProducts()
  //     .then((data) => {
  //       isLoaded.value = false
  //       rawProducts.value = data
  //   });

  // console.log(products)
})



</script>
