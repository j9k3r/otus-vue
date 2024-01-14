import { describe, it, expect, vi, beforeEach, afterEach, expectTypeOf } from "vitest"

import { setActivePinia, createPinia } from "pinia"
import {useOrderStore} from "@/stores/order"

describe("Order store", () => {
    // const store = useOrderStore()
    const mockOrderData = JSON.parse( `[
        {"id": 1, "quantity": 1},
        {"id": 2, "quantity": 1},
        {"id": 3, "quantity": 1}
    ]`)

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
        const orderLocalStorage = JSON.parse(localStorage.getItem("order"))

        expect(orderLocalStorage).toStrictEqual(mockOrderData)

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
        store.order.push({ id: 2, quantity: 2})
        const mockIdStr = '2'
        const mockIdInt = 2
        store.decreaseOrder(mockIdStr)
        store.decreaseOrder(mockIdInt)

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