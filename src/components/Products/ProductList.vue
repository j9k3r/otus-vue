<template>
  <div>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.id }}, {{ product.title }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import {computed, onMounted, reactive, ref} from "vue";
const props = defineProps(['rawProducts', 'title'])


const products = computed( () => {

// return props.rawProducts
//     if (isLoaded) {
      return props.rawProducts.filter(function (elem) {
        if (props.title === '') return true;
        else return elem.title.indexOf(props.title) > -1;
      })
    // }

  }
)

// console.log(props.rawProducts)

// const Products = ref(rawProducts.data)
// onMounted( () => {

  // console.log(rawProducts)
// })
</script>



<style>

</style>