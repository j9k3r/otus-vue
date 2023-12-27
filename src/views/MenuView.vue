<script setup>
import {useRouter} from "vue-router";

</script>

<template>
  <section id="menu" class="main">
    <nav>
      <ul>
        <li>
          <router-link class="nav-link" :to="{ 'name': 'home' }"><button>Products</button></router-link>
        </li>
        <li>
          <router-link class="nav-link" :to="{ 'name': 'login' }"><button>Login</button></router-link>
        </li>
        <li>
          <router-link class="nav-link" :to="{ 'name': 'createProduct' }"><button>Create Product</button></router-link>
        </li>
        <li>
          <router-link class="nav-link" :to="{ 'name': 'about', params: {test: 'TeSt'} }"><button>About</button></router-link>
        </li>
      </ul>
    </nav>
  </section>
</template>

<style>

  #menu {
    nav ul {
      display: flex;
      justify-content: right;
      li {
        margin-left: 5px;
        margin-right: 5px;
        list-style-type: none;
      }
    }
  }

</style>