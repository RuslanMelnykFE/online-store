<template>
  <button class="button_add"
          @click.stop.prevent="addToCard">
    Добавить в корзину
  </button>
</template>

<script>
export default {
  name: 'ButtonAdd',
  props: {
    product_id: {
      type: Number,
      required: true
    }
  },
  methods: {
    addToCard () {
      const product = this.$store.state.products.products
      let selectedProduct = null
      product.forEach(item => {
        if (item.id === this.product_id) selectedProduct = item
      })
      this.$store.dispatch('basket/addToCard', selectedProduct)
    }
  }
}
</script>
