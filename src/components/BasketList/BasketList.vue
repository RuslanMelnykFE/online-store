<template>
  <!-- Начало блока "basket_list"-->
  <ul class="basket_list">
    <!-- Начало блока "basket_list--item"-->
    <li class="basket_list--item" v-if="basket_list.length === 0">Корзина пуста</li>
    <basket-list-item v-for="(item, index) in basket_list"
                      :key="index" :product="item.product"
                      :quantity="item.quantity"/><!-- Конец блока "basket_list--item"-->
    <!-- Начало блока "basket_list--item"-->
    <li class="basket_list--item" v-if="basket_list.length !== 0">
      <!-- Начало блока "total"-->
      <ul class="total">
        <h3>Bceго:</h3>
        <li>Количество - {{ basket.total_amount }}</li>
        <li>Сумма - {{ summa }} UAH</li>
        <li>
          <button @click.stop.prevent="emptyTrash">Очистить корзину</button>
        </li>
      </ul><!-- Конец блока "total"-->
    </li><!-- Конец блока "basket_list--item"-->
  </ul><!-- Конец блока "basket_list"-->
</template>

<script>
import BasketListItem from './BasketListItem'

export default {
  name: 'BasketList',
  components: { BasketListItem },
  computed: {
    basket () { return this.$store.state.basket.basket }, // Получение корзины
    basket_list () { return this.basket.basket_list }, // Получение списка продуктов
    // Получение общей стоимости всех продуктов
    summa () {
      return this.basket_list.reduce((sum, elem) => {
        let price = +elem.product.price.split(' ')[0]
        return sum + price * elem.quantity
      }, 0)
    }
  },
  methods: {
    // Удаление всех продуктов из корзины
    emptyTrash () {
      this.$store.dispatch('basket/emptyTrash')
    }
  }
}
</script>

<style lang="scss">
  .basket_list {
    flex-flow: column nowrap;
    border: 1px solid grey;
    &--item {
      .total {
        align-items: center;
        h3 {
          padding: 15px 30px;
          flex: 1 calc(10% + 1px);
          box-sizing: border-box;
          border-right: 1px solid grey;
        }
        li {
          flex: 1 calc(30% - 1px);
        }
      }
    }
  }
</style>
