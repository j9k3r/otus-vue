<template>
  <MenuView></MenuView>
  <section id="products" class="products">
      <header class="header">
        <h1>products</h1>
        <p><input type="text" v-model="title" /><label>название</label></p>
        <p><input type="number" step="0.01" min="0" v-model="price" /><label>цена</label></p>
        <products-form :order="order"></products-form>
      </header>
      <section class="main" v-if="!isLoaded">
<!--        <product :product-id="productId" :is-loaded="isLoaded" v-on:is-loaded="isLoad"></product>-->
<!--        <product :product-id="productId" :is-loaded="isLoaded"></product>-->
        <product-list v-if="!isLoaded" :raw-products="rawProducts" :title="title" :price="price" :order="order" v-on:checked-product="updateOrder"></product-list>
      </section>
      <footer class="footer">
        <Order v-if="!isLoaded" :raw-products="rawProducts" :order="order" v-on:checked-product="updateOrder" v-on:checked-product-decrease="decreaseOrder" v-on:remove-order="removeOrder">
            продукты:
        </Order>
      </footer>
  </section>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import ProductsApi from "@/components/services/productsApi";
import ProductList from "@/components/Products/ProductList.vue";
import Order from "@/components/Products/Order.vue";
import ProductsForm from "@/components/Products/ProductsForm.vue";
import MenuView from "@/views/MenuView.vue";
// import Product from "@/components/Products/Product.vue";

// const productId = ref(1);

const rawProducts = ref({})
const title = ref('')
const price = ref(0.00)
const isLoaded = ref(true)

const order = ref([])
// rawProducts, title

watch(order.value,  (newOrder, oldOrder) => {
  console.log(newOrder)
  localStorage.setItem("order", JSON.stringify(newOrder));
  // localStorage.order = newOrder
})

function updateOrder(product) {

  // console.log(product)

  let prId = parseInt(product)

  //поиск элемента
  let orderProduct = -1
  if (order.value.length !== 0) {
    // orderProduct = order.value.find(ord => ord.id === prId)
    orderProduct = order.value.findIndex(ord => ord.id === prId)

  }
  // let orderProduct = order.value.indexOf(parseInt(product))

  // let orderProduct = order.value.find(ord => ord ===  parseInt(product))

  // console.log(typeof orderProduct)
  // console.log( orderProduct)
  if (orderProduct === -1) {
    order.value.push({ id: prId, quantity: 1})
    // order.value.push(parseInt(product))
    // order.value.splice(0, 0, { id: prId, quantity: 1})
  } else {
    order.value[orderProduct].quantity += 1

    // order.value.splice(orderProduct, 1, { id: prId, quantity: orderProduct.quantity+1})
    // console.log(orderProduct.key)
    // order.value.splice(orderProduct,1)
  }
  localStorage.setItem("order", JSON.stringify(order.value));
  // console.log(orderProduct)
}

function isLoad(loadState) {
  isLoaded.value = loadState
}

function decreaseOrder (product) {
  let prId = parseInt(product)
  let orderProduct = order.value.findIndex(ord => ord.id === prId)
  if (order.value[orderProduct].quantity !== 1) {
    order.value[orderProduct].quantity -= 1
  } else {
    order.value.splice(orderProduct,1)
  }
  localStorage.setItem("order", JSON.stringify(order.value));
}

function removeOrder () {
  if (order.value.length !== 0) {
    order.value.splice(0, order.value.length)
  }
  localStorage.setItem("order", JSON.stringify(order.value));
}

onMounted( () => {
  let localOrder = JSON.parse(localStorage.getItem("order"))
  // console.log(localOrder)
  if (localOrder !== null) {
    order.value = localOrder;
  }


  ProductsApi.getProducts(isLoaded.value).then((data) => {
    // console.log(data)
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  height: 50vh;
  overflow-y: auto;
  border: 1px;

  float: left;
}
</style>