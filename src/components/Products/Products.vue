<template>
  <div class="products">
    <section class="productsapp">
      <header class="header">
        <h1>products</h1>
      </header>
      <section class="main" v-if="!isLoaded">
        <ul>
          <p><input type="text" v-model="title" /></p>

<!--          <h1 style="color: red">{{products}}</h1>-->

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
import {computed, onMounted, reactive, ref} from "vue";
import ProductsApi from "@/components/services/productsApi";
const rawProducts = ref({})
// const rawProducts = reactive({})
const title = ref('')
const isLoaded = ref(true);
// rawProducts, title
const products = computed( () => {

  // return rawProducts.value
      if (isLoaded) {
        return rawProducts.filter(function (elem) {
          if (title === '') return true;
          else return elem.title.indexOf(title) > -1;
        })
      }
    // return rawProducts.value
    }
)

onMounted(async () => {

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
