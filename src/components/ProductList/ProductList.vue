<template>
  <!-- Начало блока "product_list" -->
  <ul class="product_list">
    <product-list-item v-for="(item, index) in product_list" :key="index" :product="item"/>
  </ul><!-- Конец блока "product_list" -->
</template>

<script>
import ProductListItem from './ProductListItem'

export default {
  name: 'ProductList',
  components: { ProductListItem },
  computed: {
    // Получение списка продуктов
    product_list () { return this.$store.state.products.products }
  }
}
</script>

<style lang="scss">
  .product_list {
    margin-right: -20px;
    margin-bottom: -20px;
    & > * {
      margin-right: 20px;
      margin-bottom: 20px;
      max-width: calc(25% - 20px);
      flex: 1 calc(25% - 20px);
      border: 1px solid #808080;
    }
  }
</style>
