<script setup>
import {useRoute, useRouter} from "vue-router";
const props = defineProps({
  test: String
})

const router = useRouter()
const route = useRoute()
</script>

<template>
  <div class="about">

    <h1>This is an about page</h1>
    <h2>{{test}}</h2>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
