import axios from 'axios';


// axios.defaults.withCredentials = true;
// axios.defaults.url = 'https://fakestoreapi.com';

export default {
    getProducts(isLoaded) {
        return axios.get('https://fakestoreapi.com/products').then((response) => {
            return {isLoaded: isLoaded = false, data: response.data};
        })

//через промис
//     async getProducts() {
//         return (await Promise.resolve(axios.get('https://fakestoreapi.com/products').then((response) => {
//             return (response.data);
//         })))
    },

    getProduct(isLoaded, productId) {
        return axios.get('https://fakestoreapi.com/products/' + productId).then((response) => {
            return {isLoaded: isLoaded = true, data: response.data};
        })
    }

};