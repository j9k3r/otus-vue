<script setup>
import {useUserStore} from "@/stores/user";

const user = useUserStore()

</script>

<template>
  <div v-if="user.email !== '' && user.password !== ''">
    <div>Email: {{user.email}}</div>
    <div>Password: {{user.password}}</div>
    <div v-if="user.fio !== ''">ФИО: {{user.fio}}</div>
    <button @click="user.updateUser({})">Выйти</button>
  </div>
</template>

<style scoped>

</style>