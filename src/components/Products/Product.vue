<template>
<!--Hello = {{props.productId}}-->
  <MenuView></MenuView>
  <section id="product" v-if="Object.keys(product).length !== 0">
    <header>
      <h2>{{product.title}}</h2>
      <div>
        <h4>Id: {{product.id}}, Категория: {{product.category}}</h4>
      </div>
    </header>
    <section class="main">
      <h3>{{product.description}}</h3>
      <img :src="product.image">
    </section>
    <footer>
      <div>Цена: <span>{{product.price}}</span></div>
      <div>Рейтинг: <span>{{product.rating.rate}}</span></div>
      <div>Количество: <span>{{product.rating.count}}</span></div>
    </footer>
  </section>

</template>

<script setup>
import {ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import ProductsApi from "@/components/services/productsApi";
import MenuView from "@/views/MenuView.vue";

const props = defineProps({
  'productId': Number,
  // 'isLoaded': {
  //   type: Boolean,
  //   default: true
  // }
})

const router = useRouter()
const route = useRoute()

const emit = defineEmits(['is-loaded'])

const product = ref({})
const isLoaded = ref(true)

watch(() => props.productId,  (newProductId, oldProductId) => {
  // console.log(props.isLoaded)
  if (newProductId !== 0 && isLoaded.value === true) {
    isLoaded.value = false
    ProductsApi.getProduct(isLoaded.value, props.productId).then((data) => {
      console.log(data)
      product.value = data.data

      // emit('is-loaded', data.isLoaded)
      isLoaded.value = data.isLoaded
    })
  }
}, {immediate: true})



</script>

<style scoped>

</style>