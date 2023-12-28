import {defineStore} from "pinia";
import {ref} from "vue";
import ProductsApi from "@/components/services/productsApi";

export const useProductsStore =
    defineStore('products', () => {
        const products = ref([])
        const product = ref({})

        const isLoading = ref(true)

        const getProductsData = async () => {
            isLoading.value = true;
             await ProductsApi.getProducts().then((data) => {
                products.value.push(...data)
                isLoading.value = false
            })
        }

        const getProductData = async (state) => {
            isLoading.value = true;
            await ProductsApi.getProduct(state).then((data) => {
                product.value = data
                isLoading.value = false
            })
        }

        return {products, product, isLoading, getProductsData, getProductData}
    })