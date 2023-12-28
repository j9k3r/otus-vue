import axios from 'axios';

export default {
    getProducts() {
        return axios.get('https://fakestoreapi.com/products').then((response) => {
            return response.data
        })
    },

    getProduct(productId) {
        return axios.get('https://fakestoreapi.com/products/' + productId).then((response) => {
            return response.data
        })
    }

};