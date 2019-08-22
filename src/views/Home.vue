<template>
  <div class="home">
    <h2>Product list</h2>
    <product-list/>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductList from '@/components/ProductList/ProductList.vue'

export default {
  name: 'home',
  components: {
    ProductList
  }
}
</script>
