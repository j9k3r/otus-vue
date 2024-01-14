<script setup>
import {computed, ref} from "vue";
import {useOrderStore} from "@/stores/order";

const props = defineProps({
  order: Array,
  rawProducts: Object
})

const order = useOrderStore()

const items = computed(() => {
  //меняем ключи из сырого на ид (для использования в корзине)
  return Object.entries(props.rawProducts).reduce((acc, [value,key]) => {
    acc[key.id] = key
    return acc;
  }, {})

})

//оставляю для unit теста
const orderTotalPrice =  computed(() => {
  let totalSum = 0
  order.order.forEach(item  => {
    totalSum += items.value[item.id].price * item.quantity
  })
  return totalSum.toFixed(2)
})


</script>

<template>
  <section id="order">
    <header>
      <h1>Корзина товаров</h1>
    </header>

    <section class="main">
      <div>всего на: <span class="sum-price">{{orderTotalPrice}}$</span></div>
      <slot></slot> <button @click="order.removeOrder()">очистить</button>
      <ul>
        <!--      <li v-for="item in items" :key="item.id" @click="emit('checked-product', item.id)">{{item.id}} {{item.title}} <span style="color: red">X</span></li>-->
        <!--      <li v-for="item in order" :key="item" @click="emit('checked-product', item)">{{items[item].id}} {{items[item].title}} <span style="color: red">X</span></li>-->

        <li v-for="item in order.order" :key="item.id">
          id = {{items[item.id].id}} на сумму: <span class="sum-price" :data-testid="'position-quantity-sum-' + item.id">{{ (item.quantity * items[item.id].price).toFixed(2) }}$</span><br>
          {{items[item.id].title}} <br>
          <div class="btn-order-gr">
            <div>количество: <span style="color: cornflowerblue">{{item.quantity}}</span></div>

            <button :id="item.id" @click="order.updateOrder($event.target.id)" :data-testid="'increase-quantity-' + item.id" style="color: green">+</button>
            <button :id="item.id" @click="order.decreaseOrder($event.target.id)" :data-testid="'decrease-quantity-' + item.id" style="color: red">-</button>
          </div>
        </li>
      </ul>
    </section>

    <footer>

    </footer>
  </section>

</template>

<style>
#order {
  padding: 10px;
  .btn-order-gr {
    display: flex;
    justify-content: space-between;
  }
  .sum-price {
    color: pink;
  }
}

</style>