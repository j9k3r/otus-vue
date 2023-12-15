<template>
  <div class="products">
    <section class="productsapp">
      <header class="header">
        <h1>products</h1>
        <p><input type="text" v-model="title" /><label>название</label></p>
        <p><input type="number" step="0.01" min="0" v-model="price" /><label>цена</label></p>
      </header>
      <section class="main" v-if="!isLoaded">
        <product-list id="products" v-if="!isLoaded" :raw-products="rawProducts" :title="title" :price="price" :order="order" v-on:checked-product="updateOrder"></product-list>
        <products-form :order="order"></products-form>
      </section>
      <footer class="footer">
        <Order v-if="!isLoaded" :raw-products="rawProducts" :order="order" v-on:checked-product="updateOrder">
            продукты:
        </Order>
      </footer>
    </section>
    <footer class="info"></footer>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import ProductsApi from "@/components/services/productsApi";
import ProductList from "@/components/Products/ProductList.vue";
import Order from "@/components/Products/Order.vue";
import ProductsForm from "@/components/Products/ProductsForm.vue";

const rawProducts = ref({})
const title = ref('')
const price = ref(0.00)
const isLoaded = ref(true)

const order = ref([])
// rawProducts, title

function updateOrder(product) {
  // console.log(product)

  //поиск элемента
  // let orderProduct = order.value.find(ord => ord.id === product.id)
  let orderProduct = order.value.indexOf(parseInt(product))

  // let orderProduct = order.value.find(ord => ord ===  parseInt(product))

  console.log(orderProduct)
  if (orderProduct === -1) {
    order.value.push(parseInt(product))
  } else {
    order.value.splice(orderProduct,1)
  }

  // console.log(orderProduct)
}

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

<style>
#products {
  height: 50vh;
  overflow-y: auto;
  width: 50vw;
  border: 1px;

  float: left;
}
</style>