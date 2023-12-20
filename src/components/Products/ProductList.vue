<template>
  <section id="product-list" class="main">
    <ul >
      <li v-for="(product, name, index) in products" :key="product.id">
        <div>
          <label :for="product.id">
            <router-link :to="{'name':'product', params: {productId: product.id} }">{{product.title}}</router-link>
          </label>
          <div class="add-gr-list">

            <div>{{product.price}}</div>
            <button :id="product.id" @click="emit('checked-product', $event.target.id)">+</button>
          </div>

        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

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

const router = useRouter()
const route = useRoute()

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

#product-list {
  padding: 0px 20px 0px 20px;
  overflow-y: scroll;
  height: 400px;
  .add-gr-list {
    display: flex;
    justify-content: space-between;
  }
}

</style>