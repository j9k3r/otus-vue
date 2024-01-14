import {describe, it, expect, beforeEach, afterEach} from "vitest"
// import {mount} from "@vue/test-utils";
import {flushPromises, shallowMount} from "@vue/test-utils";

import { setActivePinia, createPinia } from "pinia"
import {useOrderStore} from "@/stores/order"

import component from "@/components/Products/Order.vue"

describe("Products order component", () => {
    const mockProductsData = JSON.parse( `[
            {
                "id": 1,
                "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                "price": 109.95,
                "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                "category": "men's clothing",
                "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                "rating": {
                    "rate": 3.9,
                    "count": 120
                }
            },
            {
                "id": 2,
                "title": "Mens Casual Premium Slim Fit T-Shirts ",
                "price": 22.3,
                "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
                "category": "men's clothing",
                "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
                "rating": {
                    "rate": 4.1,
                    "count": 259
                }
            },
            {
                "id": 3,
                "title": "Mens Cotton Jacket",
                "price": 55.99,
                "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
                "category": "men's clothing",
                "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
                "rating": {
                    "rate": 4.7,
                    "count": 500
                }
            }]`)
    const mockOrderData = `[
        {"id": 1, "quantity": 1},
        {"id": 2, "quantity": 1},
        {"id": 3, "quantity": 1}
    ]`

    beforeEach(() => {
        setActivePinia(createPinia())
    })
    afterEach(()=> {
        localStorage.clear()
    })

    it('check mount', async () => {
        const wrapper = shallowMount(component)
        expect(wrapper.exists()).toBe(true)
    })

    it('Sum order price', async () => {
        const store = useOrderStore()
        store.order.push(...JSON.parse(mockOrderData))

        const wrapper = shallowMount(component, {
            propsData: {
                rawProducts: mockProductsData
            }
        })

        const sumOrderRendered = wrapper.find('.sum-price')
        // console.log(sumOrder.attributes())  // возвращает класс
        // console.log(sumOrderRendered.text()) // возвращает сумму
        // console.log(wrapper.vm.orderTotalPrice) //computed значение

        await flushPromises()
        expect(sumOrderRendered.exists()).toBe(true)
        expect(parsePrice(sumOrderRendered.text())).toBe(sumPositionQuantity(mockProductsData, store.order))


        // console.log(mockProductsData[0].price + mockProductsData[1].price + mockProductsData[2].price)
        // console.log(sumPositionQuantity(mockProductsData, JSON.parse(mockOrderData)))
    })

    it('Sum order price increase quantity', async () => {
        const store = useOrderStore()
        store.order.push(...JSON.parse(mockOrderData))

        const wrapper = shallowMount(component, {
            propsData: {
                rawProducts: mockProductsData
            }
        })

        await wrapper.find('[data-testid="increase-quantity-2"]').trigger('click')

        const sumOrderRendered = wrapper.find('.sum-price')

        await flushPromises()
        expect(parsePrice(sumOrderRendered.text())).toBe(sumPositionQuantity(mockProductsData, store.order))
    })

    it('Sum order price decrease quantity', async () => {
        const store = useOrderStore()

        store.order.push(...JSON.parse(mockOrderData))

        const wrapper = shallowMount(component, {
            propsData: {
                rawProducts: mockProductsData
            }
        })

        await wrapper.find('[data-testid="increase-quantity-2"]').trigger('click')
        await wrapper.find('[data-testid="increase-quantity-2"]').trigger('click')
        await wrapper.find('[data-testid="increase-quantity-2"]').trigger('click')

        await wrapper.find('[data-testid="decrease-quantity-2"]').trigger('click')

        const sumOrderRendered = wrapper.find('.sum-price')
        await flushPromises()

        expect(parsePrice(sumOrderRendered.text())).toBe(sumPositionQuantity(mockProductsData, store.order))
    })


    it('Sum price position quantity', async () => {
        const store = useOrderStore()

        store.order.push(...JSON.parse(mockOrderData))

        const wrapper = shallowMount(component, {
            propsData: {
                rawProducts: mockProductsData
            }
        })

        await wrapper.find('[data-testid="increase-quantity-1"]').trigger('click')
        await wrapper.find('[data-testid="increase-quantity-2"]').trigger('click')
        await wrapper.find('[data-testid="increase-quantity-3"]').trigger('click')

        const sumPositionQuantity1 = wrapper.find('[data-testid="position-quantity-sum-1"]')
        const sumPositionQuantity2 = wrapper.find('[data-testid="position-quantity-sum-2"]')
        const sumPositionQuantity3 = wrapper.find('[data-testid="position-quantity-sum-3"]')

        await flushPromises()

        expect(sumPositionQuantity1.exists()).toBe(true)
        expect(sumPositionQuantity2.exists()).toBe(true)
        expect(sumPositionQuantity3.exists()).toBe(true)

        expect(parsePrice(sumPositionQuantity1.text())).toBe(sumPositionQuantity(mockProductsData, [store.order[0]]))
        expect(parsePrice(sumPositionQuantity2.text())).toBe(sumPositionQuantity(mockProductsData, [store.order[1]]))
        expect(parsePrice(sumPositionQuantity3.text())).toBe(sumPositionQuantity(mockProductsData, [store.order[2]]))
    })


    function parsePrice(price) {
        return price.replace(/\$/g, '').trim()
    }

    function sumPositionQuantity (positions, quantity) {
        let sumQuantity = 0
        quantity.forEach(item  => {
            let id = positions.findIndex(pos => pos.id === item.id)
            sumQuantity += positions[id].price * item.quantity
        })

        return parseFloat(sumQuantity).toFixed(2)
    }
})