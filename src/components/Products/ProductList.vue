<template>
  <div>
    <ul>
      <li v-for="(product, name, index) in products" :key="product.id">
<!--        <input type="checkbox" @change="emit('checked-product', product)" :id="product.id" :value="product.id" v-model="checkedProducts" >-->
<!--        <input type="checkbox" :id="product.id" :value="product.id" v-model="checkedProducts">-->
<!--        <input type="checkbox" :id="product.id" :value="product.id" v-model="prOrder" @change="emit('checked-product', $event.target)">-->
<!--        <input type="checkbox" :id="product.id" :value="product.id" :checked="props.order.includes(product.id)" @change="emit('checked-product', $event.target.id)">-->
        <input type="checkbox" :id="product.id" :value="product.id" :checked="props.order.includes(product.id)" @change="emit('checked-product', $event.target.id)">
        <label :for="product.id">{{product.title}}</label>
        <div>{{product.price}}</div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {computed, onMounted, reactive, ref} from "vue";
const props = defineProps({
  rawProducts: Object,
  title: String,
  price: null,
  order: Array
    // {
    // type: Number,
    // required: true
  // }
})

// const emits =  defineEmits(['checkedProducts'])
const emit = defineEmits()

// function checkedProduct() {
//   emit('checked-product', 'new value')
//   // console.log(e)
// }


// const checkedOrder = computed(() => {
//   return props.rawProducts.map(object => object.id);
  // return Object.keys(props.rawProducts).map((key) => key.id);
// })

// const checkedProducts = computed({
//   get: () => props.order.map(object => object.id),
//   set: val => {
//     console.log(Event.target)
//     emit('checked-product', val)
//   }
// })

// const checkedProducts = computed(() => {
//   props.order.map(object => object.id)
// })

const prOrder = computed({
  get: () =>  props.order.map(object => object.id),
  set: val => {
    // console.log(val)
  }
})


const flagFilterTitle = computed(() => {
  if (props.title === '') return false
  return true
})

const flagFilterPrice = computed( () => {
  if (props.price === 0.00 || props.price === '') return false
  return true
})

// сумма всех цен в сыром запросе
// const calcSum = computed( () => {
//   let total = 0;
//   props.rawProducts.forEach((item, i) => {
//     total += item.price
//   });
//   return total;
// })

//максимальная сумма товара в сыром запросе
// const maxPrice = computed(() => {
//   return Math.max(...props.rawProducts.map(property => property.price))
// })

//фильтр по названию
// const filterTitleProduct = computed( () => {
//   return props.rawProducts.filter(function (elem) {
//     if (!flagFilterTitle.value) return true
//     return elem.title.indexOf(props.title) > -1;
//   })
// })

//фильтр по цене
// const filterPriceProduct = computed( () => {
//   return props.rawProducts.filter(function (elem) {
//     if (!flagFilterPrice.value) return true
//     else {
//       // return elem.price >= props.price  // цена больше заданного значения
//       return (elem.price >= 0 && elem.price <= props.price); // цена меньше заданного значения
//     }
//   })
// })


const products = computed( () => {
  return props.rawProducts.filter(function (elem) {
    let conditions = [true];

    if (flagFilterTitle.value) {
      conditions.push(elem.title.indexOf(props.title) > -1)
    }

    if (flagFilterPrice.value) {
      conditions.push(elem.price >= 0 && elem.price <= props.price)
    }
    return conditions.every(condition => condition);
  })

// количество объектов в фильтрах
//   let rawProductsCount = Object.keys(props.rawProducts.value).length
//   let filterTitleCount = Object.keys(filterTitleProduct.value).length
//   let filterPriceCount = Object.keys(filterPriceProduct.value).length






  })

// const checkedProducts = ref([])

// проверка наличия объекта по ид в массиве
// function isInArray(id, arr) {
//   if (arr.some(e => e.id === id)) {
//     return true
//   }
//   return false
// }




// onMounted( () => {
  // console.log(rawProducts)
// })


</script>



<style>

</style>