<script setup>
import {Field, Form} from "vee-validate";
import axios from "axios";
import * as Yup from "yup";
import {computed} from "vue";

const categories = [
                    {id: 1, title: "Category 1"},
                    {id: 2, title: "Category 2"},
                    {id: 3, title: "Category 3"},
                    {id: 4, title: "Category 4"},
];

const cats = computed(() => {
   return categories.map((cat, key) => (
       cat.id.toString()
  ))
})

function onSubmit(values) {
  axios.post(
      'https://httpbin.org/post',
      {
        data: values
      }
  ).then(() => {
    console.log('форма отправлена')
  })

  console.log(JSON.stringify(values, null, 4));
}

const schema = Yup.object().shape({
  id: Yup.number()
        .positive('число не должно быть отрицательным')
        .integer('должно быть число')
        .transform((value) => (isNaN(value) ? undefined : value)).nullable(),
  category: Yup.string()
        .required("Выберите категорию")
        .oneOf(cats.value, 'должно соответствовать id категории'),
        // .transform((values) => {
        //   return parseInt(values)
        // }),
  title: Yup.string()
        .required('Укажите название')
        .min(3,'минимум 3 знака'),
  description: Yup.string()
        .required('Укажите описание')
        .min(10, 'минимум 10 знаков')
        .max(250, 'максимум 250 знаков'),
  image: Yup.string()
        .url('не является ссылкой')
        .nullable(),
  price: Yup.number()
        .required('Введите цену товара')
        .transform((values) => {
          return Number(values.toFixed(2))
        })
        .typeError('Цена должна быть числом'),
        // .test(
        //     'is-decimal',
        //     'invalid decimal',
        //     value => (value + "").match(/^\d*\.{1}\d*$/),
        // ),
  count: Yup.number()
      .required('Введите количество товара'),
});
</script>

<template>
  <header>
    <h1>Создание товара</h1>
  </header>
  <section id="create-product">
    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">

      <div class="form-row">
        <div class="form-group col">
          <label>Id </label>
          <Field name="id" type="number" class="form-control" :class="{ 'is-invalid': errors.id }" />
          <div v-show="errors.id" class="err invalid-id">{{errors.id}}</div>
        </div>
        <div class="form-group col">
          <label>Категория <i>*</i> </label>
          <Field id="category" as="select" name="category" class="form-control" :class="{ 'is-invalid': errors.category }">
            <option value="">Выберите категорию</option>
            <option v-for="(category, index) in categories" :value="category.id" :key="category.id">{{category.title}}</option>
<!--            <option :value="1">Яблоки</option>-->
<!--            <option :value="2">Бананы</option>-->
<!--            <option :value="3">Апельсины</option>-->
          </Field>
          <div v-show="errors.category" class="err invalid-category">{{errors.category}}</div>
        </div>
        <div class="form-group col">
          <label>Название <i>*</i> </label>
          <Field name="title" type="text" class="form-control" :class="{ 'is-invalid': errors.title }" />
          <div v-show="errors.title" class="err invalid-title">{{errors.title}}</div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col">
          <label>Описание <i>*</i> </label>
          <Field name="description" type="text" class="form-control" :class="{ 'is-invalid': errors.description }" />
          <div v-show="errors.description" class="err invalid-description">{{errors.description}}</div>
        </div>
        <div class="form-group col">
          <label>Изображение </label>
          <Field name="image" type="text" placeholder="ссылка на изображение" class="form-control" :class="{ 'is-invalid': errors.image }" />
          <div v-show="errors.image" class="err invalid-image">{{errors.image}}</div>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col">
          <label>Цена <i>*</i></label>
          <Field name="price" type="number" step="0.01" class="form-control" :class="{ 'is-invalid': errors.price }" />
          <div v-show="errors.price" class="err invalid-price">{{errors.price}}</div>
        </div>
        <div class="form-group col">
          <label>Количество <i>*</i></label>
          <Field name="count" type="number" class="form-control" :class="{ 'is-invalid': errors.count }" />
          <div v-show="errors.count" class="err invalid-count">{{errors.count}}</div>
        </div>
      </div>

      <div class="form-action form-group">
        <button type="submit" class="btn btn-primary mr-1">Отправить</button>
        <button type="reset" class="btn btn-secondary">Сбросить</button>
      </div>

  </Form>
  </section>
</template>

<style scoped>
form {
  .form-group {
    display: flex;
    flex-direction: column;
    //justify-content: space-between;
  }
  .form-action {
    margin-top: 25px;
    flex-direction: row-reverse;;
    button {
      width: 150px;
      margin-right: 20px;
    }
  }
  label {
    padding-right: 5px;
    i {
      color: yellow;
    }
  }
  .err {
    color: red;
  }
}
</style>