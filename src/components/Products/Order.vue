<template>
  <header>
    <h1>Корзина товаров</h1>
  </header>

  <main>
    <slot></slot>
    <ul>
<!--      <li v-for="item in items" :key="item.id" @click="emit('checked-product', item.id)">{{item.id}} {{item.title}} <span style="color: red">X</span></li>-->
      <li v-for="item in order" :key="item" @click="emit('checked-product', item)">{{items[item].id}} {{items[item].title}} <span style="color: red">X</span></li>
    </ul>
  </main>

  <footer>

  </footer>

</template>

<script setup>
import {computed, ref} from "vue";

const props = defineProps({
  order: Array,
  rawProducts: Object
})

const items = computed(() => {

  //отфильтровываем сырые данные по корзине
  // let x = []
  // props.rawProducts.forEach((element) => {
  //   console.log(element)
  //   if (props.order.includes(element.id)) {
  //     x.push(element)
  //   }
  // })
  // return x

  //меняем ключи из сырого на ид (для использования в корзине)
  return Object.entries(props.rawProducts).reduce((acc, [value,key]) => {
    acc[key.id] = key;
    return acc;
  }, {})

})


const emit = defineEmits(['checked-product'])


</script>



<style >

</style>