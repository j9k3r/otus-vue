<script setup>
import axios from "axios";

import {Form, Field} from 'vee-validate';
import * as Yup from 'yup';
import {useOrderStore} from "@/stores/order";
import {useUserStore} from "@/stores/user";

const order = useOrderStore()
const user = useUserStore()

function onSubmit(values, { resetForm }) {
  if (order.order.length !== 0) {
    let ord = JSON.stringify({form:values, order: order.order})
    axios.post(
        'https://httpbin.org/post',
        {
          data: ord
        }
    ).then(() => {
      user.updateUserInfo(values)
      order.removeOrder()
      console.log('форма отправлена')
      // resetForm()
      // console.log('форма сброшена')
    })
  }

  // console.log(JSON.stringify(values, null, 4));
}

const schema = Yup.object().shape({
  fio: Yup.string()
      .required('обязательное поле ФИО')
      .matches(/([А-ЯЁ][а-яё]+[\-\s]?){3,}/, 'ФИО неправильного формата'),
  email: Yup.string()
      .required('обязательное поле email')
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'email не соответствует шаблону'),
  phone: Yup.string()
      .required('обязательное поле телефон')
      .matches(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/, 'телефон не соответствует формату'),
  dob: Yup.string()
      .required('обязательное поле дата рождения')
      .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'формат даты не YYYY-MM-DD'),
  isAgree: Yup.boolean()
      .required('обязательное поле')
});
</script>


<template>
  <section id="product-form" class="main">
    Vue 3 - VeeValidate - yup
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }" :initial-values="user.userInfo">

      <div class="form-row">
        <div class="form-group col">
          <label>ФИО <i>*</i> </label>
          <Field name="fio" type="text" class="form-control" :class="{ 'is-invalid': errors.fio }" />
          <div class="err invalid-feedback">{{errors.fio}}</div>
        </div>
        <div class="form-group col">
          <label>Дата рождения <i>*</i> </label>
          <Field name="dob" type="date" class="form-control" :class="{ 'is-invalid': errors.dob }" />
          <div class="err invalid-feedback">{{errors.dob}}</div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col">
          <label>Телефон <i>*</i> </label>
          <Field name="phone" type="text" class="form-control" :class="{ 'is-invalid': errors.phone }" />
          <div class="err invalid-feedback">{{errors.phone}}</div>
        </div>
        <div class="form-group col">
          <label>Email <i>*</i> </label>
          <Field name="email" type="text" class="form-control" :class="{ 'is-invalid': errors.email }" />
          <div class="err invalid-email">{{errors.email}}</div>
        </div>
        <div class="form-group col">
          <label>согласие на обработку <i>*</i> </label>
          <Field name="isAgree" type="checkbox" :value="true" class="form-control" :class="{ 'is-invalid': errors.isAgree }" />
          <div class="err invalid-email">{{errors.isAgree}}</div>
        </div>
      </div>

      <div class="order-error" v-if="order.order.length === 0">
        Вы забыли выбрать товар
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary mr-1">Отправить</button>
        <button type="reset" class="btn btn-secondary">Сбросить</button>
      </div>
    </Form>
  </section>
</template>

<style scoped>
.input {
  padding: 20px 0px 20px 0px;
  .label {
    padding-right: 10px;
  }
  .error {
    padding-left: 10px;
    color: red;
  }
}

label {
  padding-right: 10px;
  i {
    color: yellow;
  }
}

.is-invalid {
  color: red;
}

form {
  .form-row {
    margin-top: 10px;
    .form-group {
      display: flex;
      flex-direction: column;
    }
  }
  .err {
    color: red;
  }
}

.order-error {
  color: yellow;
}

</style>