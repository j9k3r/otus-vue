import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Products from "@/components/Products/Products.vue";
import Product from "@/components/Products/Product.vue";
import Login from "@/components/Login.vue";
import CreateProductForm from "@/components/Products/CreateProductForm.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Products,
      alias: '/products',
      // component: HomeView
      beforeEnter() {
        return auth()
      }
    },
    {
      path: '/products/:productId',
      name: 'product',
      component: Product,
      props: (route) => ({productId: parseInt(route.params.productId)}),
      beforeEnter() {
        return auth()
      }
    },
    {
      path: '/products/create',
      name: 'createProduct',
      component: CreateProductForm,
      beforeEnter() {
        return auth()
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/about/:test',
      name: 'about',
      props: true,
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

function auth() {
  let user = JSON.parse(localStorage.getItem("user"))
  return user !== null ? true : {name: 'login'}
}

export default router
