import { describe, it, expect, vi, beforeEach, afterEach, expectTypeOf } from "vitest"

import { setActivePinia, createPinia } from "pinia"
import {useOrderStore} from "@/stores/order"

describe("Product store", () => {
    // const store = useOrderStore()
    const mockOrderData = JSON.parse( `[
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

    const getLocalStorItemSpy = vi.spyOn(Storage.prototype, 'getItem')
    const setLocalStorItemSpy = vi.spyOn(Storage.prototype, 'setItem')

    beforeEach(() => {
        setActivePinia(createPinia())
    })
    afterEach(()=> {
        localStorage.clear()
        getLocalStorItemSpy.mockClear()
        setLocalStorItemSpy.mockClear()
    })

    it('store order is array', () => {
        const store = useOrderStore()
        expectTypeOf(store.order).toBeArray()
    })

    it('store order is empty init', () => {
        const store = useOrderStore()
        expect(store.order).toHaveLength(0)
    })

    it('order mock local storage correct', () => {
        localStorage.setItem('order', JSON.stringify(mockOrderData))
        const orderLocalStorage = JSON.parse(localStorage.getItem("order")) //Todo избыточно?

        expect(orderLocalStorage).toStrictEqual(mockOrderData) //Todo избыточно?
        expect(orderLocalStorage).not.toBeNull() //Todo избыточно

        expect(setLocalStorItemSpy).toHaveBeenCalledWith('order', JSON.stringify(mockOrderData))
        expect(getLocalStorItemSpy).toHaveBeenCalledWith('order')
    });

    it('order in local storage', () => {
        localStorage.setItem('order', JSON.stringify(mockOrderData))
        const store = useOrderStore()

        expect(store.order).toEqual(mockOrderData)

        expect(getLocalStorItemSpy).toHaveBeenCalledWith('order')

    })

    it('order no local storage', () => {
        const orderLocalStorage = JSON.parse(localStorage.getItem("order"))
        const store = useOrderStore()

        expect(orderLocalStorage).toBeNull()
        expect(store.order).toHaveLength(0)

        expect(getLocalStorItemSpy).toHaveBeenCalledWith('order')
    })

    it('order store check push mock', () => {
        const store = useOrderStore()
        expect(store.order).toHaveLength(0)

        store.order.push(...mockOrderData)
        expect(store.order).toHaveLength(3)
    })

    it('store order update increase quantity +2', () => {
        const store = useOrderStore()
        store.order.push({ id: 2, quantity: 1})

        store.updateOrder(mockOrderData[1].id)
        store.updateOrder(mockOrderData[1].id)

        expect(store.order).toHaveLength(1)
        expect(store.order[0]).toHaveProperty('id', 2)
        expect(store.order[0]).toHaveProperty('quantity', 3)

        // expect(setLocalStorItemSpy).toHaveBeenCalledWith('order', JSON.stringify(store.order))
        expect(setLocalStorItemSpy).toHaveBeenLastCalledWith('order', JSON.stringify([{id: 2, quantity: 3}]))

        const orderLocalStorage = JSON.parse(localStorage.getItem("order"))

        expect(orderLocalStorage).toHaveLength(1)
        expect(orderLocalStorage[0]).toHaveProperty('id', 2)
        expect(orderLocalStorage[0]).toHaveProperty('quantity', 3)
    })

    it('store order update', () => {
        const store = useOrderStore()
        store.updateOrder(mockOrderData[1].id)
    })

    it('store order decrease delete position', () => {
        const store = useOrderStore()
        store.order.push({ id: 2, quantity: 1})
        const mockId = '2' // Todo допилить интовый тип
        store.decreaseOrder(mockId)

        expect(store.order).toHaveLength(0)
        expect(setLocalStorItemSpy).toHaveBeenCalledWith('order', JSON.stringify(store.order))
    })

    it('store order decrease position -1', () => {
        const store = useOrderStore()
        store.order.push({ id: 2, quantity: 2})
        const mockId = '2'
        store.decreaseOrder(mockId)

        expect(store.order).toHaveLength(1)
        expect(store.order[0]).toHaveProperty('id', 2)
        expect(store.order[0]).toHaveProperty('quantity', 1)
        expect(setLocalStorItemSpy).toHaveBeenLastCalledWith('order', JSON.stringify([{id: 2, quantity: 1}]))
    })

    it('store order remove no order position', () => {
        const store = useOrderStore()
        store.removeOrder()

        expect(store.order).toHaveLength(0)

        expect(setLocalStorItemSpy).toHaveBeenCalledWith('order', JSON.stringify(store.order))
    });

    it('store order remove have order', () => {
        const store = useOrderStore()
        store.order.push(...mockOrderData)

        store.removeOrder()

        expect(store.order).toHaveLength(0)
        expect(setLocalStorItemSpy).toHaveBeenCalledWith('order', JSON.stringify(store.order))
    });
})