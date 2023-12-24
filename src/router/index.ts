import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateProductForm from "@/components/Products/CreateProductForm.vue";
import Products from "@/components/Products/Products.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Products
    },
    {
      path: '/products/create',
      name: 'create-product',
      component: CreateProductForm
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/hello',
      name: 'hello_otus',
      component: () => import('../views/HelloOtusView.vue')
    },
  ]
})

export default router
