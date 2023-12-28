import {defineStore} from "pinia";
import {computed, ref } from "vue";

export const useOrderStore =
    defineStore('order', () => {

        const order = ref([]);

        const orderLocalStorage = localStorage.getItem("order")
        if (orderLocalStorage) {
            // order.value = JSON.parse(orderLocalStorage)
            // order.value = [...JSON.parse(orderLocalStorage)]
            // order.value = order.value.concat(JSON.parse(orderLocalStorage))
            // order.value = [].concat(order.value, order.value.concat(JSON.parse(orderLocalStorage)))

            order.value.push(...JSON.parse(orderLocalStorage))
        }

        // const orderPositions = computed(() => order.value.length)

        function updateOrder(product) {
            let prId = parseInt(product)

            //поиск элемента
            let orderProduct = -1
            if (order.value.length !== 0) {
                orderProduct = order.value.findIndex(ord => ord.id === prId)

            }
            if (orderProduct === -1) {
                order.value.push({ id: prId, quantity: 1})
            } else {
                order.value[orderProduct].quantity += 1
            }
            localStorage.setItem("order", JSON.stringify(order.value));
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

        return {order, updateOrder, decreaseOrder, removeOrder}

    })