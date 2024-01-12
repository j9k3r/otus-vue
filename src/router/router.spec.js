import {describe, it, expect, vi, afterEach} from "vitest"

import { mount, config } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'

import  routes  from "./index"
// import { routes } from "@/router"

// import App from "@/App.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: routes.options.routes,
    // routes: routes.getRoutes(), // чистые маршруты
})


config.global.plugins = [router]

describe("Router", () => {
    const getLocalStorItemSpy = vi.spyOn(Storage.prototype, 'getItem')
    const mockUser = {email: "test@test.do", password: "qwerty123"}

    afterEach(()=> {
        localStorage.clear()
        getLocalStorItemSpy.mockClear()
    })


    it('page login', async () => {
        await router.push({ name: 'login' })
        await router.isReady()

        expect(router.currentRoute.value.name).toBe('login')
        expect(getLocalStorItemSpy).not.toHaveBeenCalledWith('user')
    })

    it('page about', async () => {
        await router.push({ name: 'about', params: { test: 'test' } })
        await router.isReady()

        expect(router.currentRoute.value.name).toBe('about')
        expect(getLocalStorItemSpy).not.toHaveBeenCalledWith('user')
    })


    it('page home not authorized', async () => {
        await router.push({ name: 'home' })
        await router.isReady()

        expect(router.currentRoute.value.name).toBe('login')
        expect(getLocalStorItemSpy).toHaveBeenCalledWith('user')

        // const wrapper = mount(App)
        // expect(wrapper.html()).toContain('Login')
    })

    it('page home authorized', async () => {
        localStorage.setItem('user', JSON.stringify(mockUser))

        await router.push({ name: 'home' })
        await router.isReady()

        expect(router.currentRoute.value.name).toBe('home')
        expect(getLocalStorItemSpy).toHaveBeenCalledWith('user')
    })

    it('page product not authorized', async () => {
        await router.push({ name: 'product', params: { productId: 1 } })
        await router.isReady()

        expect(router.currentRoute.value.name).toBe('login')
        expect(getLocalStorItemSpy).toHaveBeenCalledWith('user')
    })

    it('page product authorized', async () => {
        localStorage.setItem('user', JSON.stringify(mockUser))

        await router.push({ name: 'product', params: { productId: 1 } })
        await router.isReady()

        expect(router.currentRoute.value.name).toBe('product')
        expect(getLocalStorItemSpy).toHaveBeenCalledWith('user')
    })


    it('page create product not authorized', async () => {
        await router.push({ name: 'createProduct' })
        await router.isReady()

        expect(router.currentRoute.value.name).toBe('login')
        expect(getLocalStorItemSpy).toHaveBeenCalledWith('user')
    })

    it('page create product authorized', async () => {
        localStorage.setItem('user', JSON.stringify(mockUser))

        await router.push({ name: 'createProduct' })
        await router.isReady()

        expect(router.currentRoute.value.name).toBe('createProduct')
        expect(getLocalStorItemSpy).toHaveBeenCalledWith('user')
    })

})