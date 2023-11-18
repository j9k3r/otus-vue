<template>
  <div id="app">
    <Products/>
  </div>
</template>


<script>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Products from "./components/Products/Products.vue";

export default {
  name: "App",
  components: {
    Products
  }
};

</script>



<style scoped></style>
