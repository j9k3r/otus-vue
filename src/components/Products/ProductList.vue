<template>
  <div>
    <ul id="list-product">
      <li v-for="(product, name, index) in products" :key="product.id">
        <div>
          <label :for="product.id">{{product.title}}</label>
          <div class="add-gr-list">
            <div>{{product.price}}</div>
            <button :id="product.id" @click="emit('checked-product', $event.target.id)">+</button>
          </div>

        </div>
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

#list-product {
  padding: 0px 20px 0px 20px;
  .add-gr-list {
    display: flex;
    justify-content: space-between;
  }
}

</style>