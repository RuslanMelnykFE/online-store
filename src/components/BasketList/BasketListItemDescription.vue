<template>
  <!-- Начало блока "product_description"-->
  <div class="product_description">
    <!-- Начало блока описания продукта -->
    <div>
      <h4>Название: {{ product.title }}</h4>
      <p>Описание: {{ product.description }}</p>
      <p>Цена: {{ product.price }}</p>
    </div><!-- Начало блока описания продукта-->
    <!-- Начало блока действий с продуктом -->
    <div>
      <quantity :product_id="product.id" :quantity="quantity"/>
      <p>Сумма: {{ sum }} UAH</p>
      <button @click.stop.prevent="deleteProduct">Удалить из корзины</button>
    </div><!-- Начало блока действий с продуктом -->
  </div><!-- Конец блока "product_description" -->
</template>

<script>
import Quantity from './BasketListItemDescritionQuantity'
import mixinsPropsList from '../../mixins/mixinsPropsList'

export default {
  name: 'ProductDescription',
  components: { Quantity },
  mixins: [mixinsPropsList],
  props: {
    quantity: {
      type: Number,
      default: 0,
      required: true
    }
  },
  computed: {
    // Получение общей стоимости одного наименования продукта
    sum () { return +this.product.price.split(' ')[0] * this.quantity }
  },
  methods: {
    // Удаление одного наименования продукта из корзины
    deleteProduct () {
      this.$store.dispatch('basket/deleteProduct', this.product.id)
    }
  }
}
</script>

<style lang="scss">
  .product_description {
    max-height: 100%;
    height: 100%;
    padding: 12px 24px;
    box-sizing: border-box;
    border-left: 1px solid grey;
    div {
      h4, p {
        text-align: left;
      }
    }
  }
</style>
