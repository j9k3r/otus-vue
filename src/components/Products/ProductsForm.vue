<template>
  <section id="product-form" class="main">
    Vue 3 - VeeValidate - yup
<!-- yup + vee-->
<!--    <Form @submit="onSubmit" :validation-schema="schema">-->
<!--      <label class="label">email</label>-->
<!--      <Field name="email" type="email" :rules="isRequired" />-->
<!--      <ErrorMessage class="error" name="email" />-->
<!---->
<!--      <button type="submit" class="btn btn-primary mr-1">Register</button>-->


<!--  yup-->
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">

      <div class="form-row">
        <div class="form-group col">
          <label>ФИО <i>*</i> </label>
          <Field name="fio" type="text" class="form-control" :class="{ 'is-invalid': errors.fio }" />
          <div class="invalid-feedback">{{errors.fio}}</div>
        </div>
        <div class="form-group col">
          <label>Дата рождения <i>*</i> </label>
          <Field name="dob" type="date" class="form-control" :class="{ 'is-invalid': errors.dob }" />
          <div class="invalid-feedback">{{errors.dob}}</div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col">
          <label>Телефон <i>*</i> </label>
          <Field name="phone" type="text" class="form-control" :class="{ 'is-invalid': errors.phone }" />
          <div class="invalid-feedback">{{errors.phone}}</div>
        </div>
        <div class="form-group col">
          <label>Email <i>*</i> </label>
          <Field name="email" type="text" class="form-control" :class="{ 'is-invalid': errors.email }" />
          <div class="invalid-email">{{errors.email}}</div>
        </div>
        <div class="form-group col">
          <label>согласие на обработку <i>*</i> </label>
          <Field name="isAgree" type="checkbox" :value="false" class="form-control" :class="{ 'is-invalid': errors.isAgree }" />
          <div class="invalid-email">{{errors.isAgree}}</div>
        </div>
      </div>


<!--      <div v-if="(order.length === 0 && errors) || (order.length === 0 && !errors)">-->
      <div class="order-error" v-if="props.order.length === 0">
        Вы забыли выбрать товар
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary mr-1">Отправить</button>
        <button type="reset" class="btn btn-secondary">Сбросить</button>
      </div>

<!--Vee-->
<!--    <Form @submit="onSubmit" :validation-schema="schema">-->
<!--      <div class="input">-->
<!--        <label class="label">email</label>-->
<!--        <Field name="email" type="email" placeholder="email" :rules="validateEmail"/>-->
<!--        <ErrorMessage class="error" name="email" />-->
<!--      </div>-->
<!---->
<!--      <div class="input">-->
<!--        <label class="label">email</label>-->
<!--        <Field name="phone" type="text" placeholder="email" :rules="validateEmail"/>-->
<!--        <ErrorMessage class="error" name="email" />-->
<!--      </div>-->
<!---->
<!--      <button>Отправить</button>-->

    </Form>
  </section>
</template>

<script setup>
import {defineEmits, ref} from "vue";
import axios from "axios";

const props = defineProps({
  order: Array
})


//vee + yup
// import { Field, Form, ErrorMessage } from 'vee-validate';
// import * as Yup from 'yup';

//yup
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';


//vee
// import {defineRule, ErrorMessage, Field, Form, useForm} from 'vee-validate'



function onSubmit(values) {
  if (props.order.length !== 0) {
    let ord = JSON.stringify({form:values, order:props.order})
    axios.post(
        'https://httpbin.org/post',
        {
          data: ord
        }
    ).then(() => {
      success()
    })
  }

  console.log(JSON.stringify(values, null, 4));
}

// yupp + vee
// const isRequired = Yup.string().required()

//yupp

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
  // .email('Email is invalid'),
  // title: Yup.string()
  //     .required('Title is required'),
  // firstName: Yup.string()
  //     .required('First Name is required'),
  // lastName: Yup.string()
  //     .required('Last name is required'),
  dob: Yup.string()
      .required('обязательное поле дата рождения')
      .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'формат даты не YYYY-MM-DD'),
  isAgree: Yup.boolean()
      .required('обязательное поле')
      // .oneOf([true], "подтвердите согласие на обработку")
  // password: Yup.string()
  //     .min(6, 'Password must be at least 6 characters')
  //     .required('Password is required'),
  // confirmPassword: Yup.string()
  //     .oneOf([Yup.ref('password'), null], 'Passwords must match')
  //     .required('Confirm Password is required'),
  // acceptTerms: Yup.string()
  //     .required('Accept Ts & Cs is required')
});

//vee

// function isRequired(value) {
//   if (!value) {
//     return 'this field is required';
//   }
//   return true;
// }

// function validateEmail(value) {
//   // if the field is empty
//   if (!value) {
//     return 'обязательное поле';
//   }
//   // if the field is not a valid email
//   const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
//   if (!regex.test(value)) {
//     return 'некорректный email';
//   }
//   // All is good
//   return true;
// }

// function validatePhone(value) {
//   if (!value) {
//     return 'обязательное поле';
//   }
//
//   const regex = "\\+[0-9]{11}";
//   if (!regex.test(value)) {
//     return 'некорректный телефон';
//   }
//   return true;
// }


</script>

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
}

.order-error {
  color: yellow;
}

</style>