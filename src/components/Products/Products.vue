<script setup>
import {onMounted, ref} from "vue";
import ProductList from "@/components/Products/ProductList.vue";
import Order from "@/components/Products/Order.vue";
import ProductsForm from "@/components/Products/ProductsForm.vue";
import MenuView from "@/views/MenuView.vue";
import {useProductsStore} from "@/stores/products";
import Login from "@/components/Login.vue";

const products = useProductsStore()
// products.getProductsData() //тоже будет работать потому что в setup

const title = ref('')
const price = ref(0.00)

onMounted( () => {
  products.getProductsData()
})
</script>

<template>
  <MenuView></MenuView>
  <section id="products" class="products">
    <header class="header">
      <h1>products</h1>
      <p><input type="text" v-model="title" /><label>название</label></p>
      <p><input type="number" step="0.01" min="0" v-model="price" /><label>максимальная цена</label></p>
      <products-form></products-form>
    </header>
    <section class="main" v-if="!products.isLoading">
      <product-list :raw-products="products.products" :title="title" :price="price"></product-list>
    </section>
    <footer class="footer">
      <Order v-if="!products.isLoading" :raw-products="products.products">
        продукты:
      </Order>
    </footer>
  </section>
</template>

<style>
#products {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  height: 50vh;
  overflow-y: auto;
  border: 1px;

  float: left;
}
</style>