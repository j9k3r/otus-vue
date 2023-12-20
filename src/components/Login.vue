<script setup>
import {onMounted, ref} from "vue";
import MenuView from "@/views/MenuView.vue";

import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import router from "@/router";

const email = ref('')
const password = ref('')

const schema = Yup.object().shape({
  email: Yup.string()
      .required('обязательное поле email')
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'email не соответствует шаблону'),
  password: Yup.string()
      .required('обязательное поле password')
      .min(6, 'минимум 6 символов')
});

const emit = defineEmits()

function exitUser() {
  localStorage.removeItem('user')
  email.value = ''
  password.value = ''
}


function onSubmit(values) {
  email.value = values.email
  password.value = values.password

  localStorage.setItem("user", JSON.stringify(values));
  router.push({name: 'home'})

  // console.log(JSON.stringify(values, null, 4));
}

onMounted( () => {
  let user = JSON.parse(localStorage.getItem("user"))
  if (user !== null) {
    email.value = user.email
    password.value = user.password
  }
})
</script>

<template>
  <menu-view></menu-view>
  <section id="login">
    <header class="header">
      Login
    </header>
    <section class="main">
      <Form v-if="email === '' || password === ''" @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
        <div class="form-group col">
          <label>Email <i>*</i> </label>
          <Field name="email" type="text" class="form-control" :class="{ 'is-invalid': errors.email }" />
          <div class="invalid-email">{{errors.email}}</div>
        </div>

        <div class="form-group col">
          <label>Password <i>*</i> </label>
          <Field name="password" type="password" class="form-control" autocomplete="on" :class="{ 'is-invalid': errors.password }" />
          <div class="invalid-password">{{errors.password}}</div>
        </div>
        <button type="submit" class="btn btn-primary mr-1">Подтвердить</button>
      </Form>

      <div v-if="email !== '' && password !== ''">
        <div>Email: {{email}}</div>
        <div>Password: {{password}}</div>
        <button @click="exitUser">Выйти</button>
      </div>
    </section>
    <footer class="footer">
    </footer>
  </section>
</template>

<style>

.form-row {
  margin-top: 10px;
}

.order-error {
  color: yellow;
}

</style>