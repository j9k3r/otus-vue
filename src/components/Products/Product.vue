<script setup>
import {watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import MenuView from "@/views/MenuView.vue";
import {useProductsStore} from "@/stores/products";

const props = defineProps({
  'productId': Number,
})

const router = useRouter()
const route = useRoute()

const products = useProductsStore()

//оставил вотчер на случай если куда то встроить, а так в хук onMounted
watch(() => props.productId,  (newProductId, oldProductId) => {
  products.getProductData(props.productId)
  if (newProductId !== 0 && products.isLoading === false) {
    products.getProductData(newProductId)
  }
}, {immediate: true})
</script>

<template>
  <MenuView></MenuView>
  <section id="product" v-if="Object.keys(products.product).length !== 0">
    <header>
      <h2>{{products.product.title}}</h2>
      <div>
        <h4>Id: {{products.product.id}}, Категория: {{products.product.category}}</h4>
      </div>
    </header>
    <section class="main">
      <h3>{{products.product.description}}</h3>
      <img :src="products.product.image">
    </section>
    <footer>
      <div>Цена: <span>{{products.product.price}}</span></div>
      <div>Рейтинг: <span>{{products.product.rating.rate}}</span></div>
      <div>Количество: <span>{{products.product.rating.count}}</span></div>
    </footer>
  </section>

</template>

<style scoped>

</style>