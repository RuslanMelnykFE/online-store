<template>
  <!-- Начало блока "quantity" -->
  <p class="quantity">Количество:
    <button @click.stop.prevent="decrement" :class="{'no-active': quantity === 0}">-</button>
    <span>{{ quantity }}</span>
    <button @click.stop.prevent="increment">+</button>
  </p><!-- Конец блока "quantity" -->
</template>

<script>
export default {
  name: 'DescriptionItem',
  props: {
    product_id: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  },
  methods: {
    // Увеличение количества одного наименования продукта
    increment () {
      let quantity = this.quantity
      quantity += 1
      this.$store.dispatch('basket/changesQuantityProduct', { id: this.product_id, quantity: quantity })
    },
    // Уменьшение количества одного наименования продукта
    decrement () {
      let quantity = this.quantity
      if (quantity !== 0) quantity -= 1
      this.$store.dispatch('basket/changesQuantityProduct', { id: this.product_id, quantity: quantity })
    }
  }
}
</script>

<style lang="scss">
  .quantity {
    display: flex;
    align-items: center;
    button, span {
      display: inline;
      padding: 0 0 3px;
      line-height: 20px;
      font-size: 20px;
      font-weight: 800;
      text-align: center;
      color: #ffffff;
    }
    button {
      width: 25px;
      &:first-child {
        margin-left: 5px;
        border-top-left-radius: 50%;
        border-bottom-left-radius: 50%;
      }
      &:last-child {
        border-top-right-radius: 50%;
        border-bottom-right-radius: 50%;
      }
    }
    .no-active {
      background-color: #b8b8b8;
    }
    span {
      font-size: 16px;
      padding: 2px 10px 1px;
      box-sizing: border-box;
      background-color: chocolate;
      border-left: 1px solid #ffffff;
      border-right: 1px solid #ffffff;
    }
  }
</style>
