<script setup>
import MenuView from "@/views/MenuView.vue";

import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import router from "@/router";
import {useUserStore} from "@/stores/user";

const user = useUserStore()

const schema = Yup.object().shape({
  email: Yup.string()
      .required('обязательное поле email')
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'email не соответствует шаблону'),
  password: Yup.string()
      .required('обязательное поле password')
      .min(6, 'минимум 6 символов')
});

function onSubmit(values) {
  user.updateUser(values)
  router.push({name: 'home'})
}
</script>

<template>
  <menu-view></menu-view>
  <section id="login">
    <header class="header">
      <h1>Login</h1>
    </header>
    <section class="main">
      <Form v-if="user.email === '' || user.password === ''" @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
        <div class="form-group col">
          <label>Email <i>*</i> </label>
          <Field name="email" type="text" class="form-control" :class="{ 'is-invalid': errors.email }" />
          <div class="err invalid-email">{{errors.email}}</div>
        </div>

        <div class="form-group col">
          <label>Пароль <i>*</i> </label>
          <Field name="password" type="password" class="form-control" autocomplete="on" :class="{ 'is-invalid': errors.password }" />
          <div class="err invalid-password">{{errors.password}}</div>
        </div>
        <button type="submit" class="btn btn-primary mr-1">Подтвердить</button>
      </Form>

<!--      <div v-else>-->
<!--        <div>Email: {{user.email}}</div>-->
<!--        <div>Password: {{user.password}}</div>-->
<!--        <div v-if="user.fio !== ''">ФИО: {{user.fio}}</div>-->
<!--        <button @click="user.updateUser({})">Выйти</button>-->
<!--      </div>-->
    </section>
    <footer class="footer">
    </footer>
  </section>
</template>

<style>

.form-row {
  margin-top: 10px;
}

form {
  label {
    padding-right: 10px;
    i {
      color: yellow;
    }
  }

  .err {
    color: red;
}
  button {
    margin-top: 10px;
  }

  .form-group {
    //display: flex;
  }
}

</style>