import {defineStore} from "pinia";
import {computed, ref, watch} from "vue";
import {useOrderStore} from "@/stores/order";
import router from "@/router";

export const useUserStore =
    defineStore('user', () => {

        const order= useOrderStore()

        const user = ref({})
        const userInfo = ref({})
        const email = computed(() => user.value.email !== undefined ? user.value.email : '')
        const password = computed(() => user.value.password !== undefined ? user.value.password : '')
        const fio = computed(() => userInfo.value.fio !== undefined ? userInfo.value.fio : '')




        const userLocalStorage = localStorage.getItem("user")
        if (userLocalStorage) {
            user.value = JSON.parse(userLocalStorage)._value
        }

        const userInfoLocalStorage = localStorage.getItem("user_info")
        if (userInfoLocalStorage) {
            // console.log(JSON.parse(userInfoLocalStorage))
            userInfo.value = JSON.parse(userInfoLocalStorage)
        }


        function updateUser(state) {
            user.value = state
        }
        function updateUserInfo(state) {
            userInfo.value = state
            localStorage.setItem('user_info', JSON.stringify(state))
        }

        // function $reset() {
        //     user.value = {}
        // } можно и обойтись без этого :D

        watch(() => user, (state) => {
            if (Object.keys(state.value).length !== 0) {
                localStorage.setItem('user', JSON.stringify(state))
            } else {
                localStorage.removeItem('user')
                localStorage.removeItem('user_info')
                userInfo.value = {}
                order.removeOrder()
                router.push({name: 'login'})

            }
        }, {deep: true}) //  гулбокий объект
        return {user, userInfo, email, password, fio, updateUser, updateUserInfo}
    })