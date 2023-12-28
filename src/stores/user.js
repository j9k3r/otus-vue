import {defineStore} from "pinia";
import {computed, reactive, ref, watch} from "vue";

export const useUserStore =
    defineStore('user', () => {

        const user = ref({});
        const email = computed(() => user.value.email !== undefined ? user.value.email : '')
        const password = computed(() => user.value.password !== undefined ? user.value.password : '')


        const userLocalStorage = localStorage.getItem("user")
        if (userLocalStorage) {
            user.value = JSON.parse(userLocalStorage)._value
        }
        function updateUser(value) {
            user.value = value
        }

        // function $reset() {
        //     user.value = {}
        // } можно и обойтись без этого :D

        watch(() => user, (state) => {
            if (Object.keys(state.value).length !== 0) {
                localStorage.setItem('user', JSON.stringify(state))
            } else {
                localStorage.removeItem('user')
            }
        }, {deep: true}) //  гулбокий объект
        return {user, email, password, updateUser}
    })