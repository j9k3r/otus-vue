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




</script>

<template>
  <section id="order">
    <header>
      <h1>Корзина товаров</h1>
    </header>

    <section class="main">
      <slot></slot> <button @click="order.removeOrder()">очистить</button>
      <ul>
        <!--      <li v-for="item in items" :key="item.id" @click="emit('checked-product', item.id)">{{item.id}} {{item.title}} <span style="color: red">X</span></li>-->
        <!--      <li v-for="item in order" :key="item" @click="emit('checked-product', item)">{{items[item].id}} {{items[item].title}} <span style="color: red">X</span></li>-->

        <li v-for="item in order.order" :key="item.id">
          id = {{items[item.id].id}} <br>
          {{items[item.id].title}} <br>
          <div class="btn-order-gr">
            <div>количество: <span style="color: cornflowerblue">{{item.quantity}}</span></div>
            <button :id="item.id" @click="order.updateOrder($event.target.id)" style="color: green">+</button>
            <button :id="item.id" @click="order.decreaseOrder($event.target.id)" style="color: red">-</button>
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
}

</style>