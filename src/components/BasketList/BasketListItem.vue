<template>
  <!-- Начало блока "basket_list--item"-->
  <li class="basket_list__item">
    <figure>
      <img :src="product.image_link" :alt="product.title">
    </figure>

    <product-description :product="product" :quantity="quantity"/>
  </li><!-- Конец блока "basket_list--item"-->
</template>

<script>
import ProductDescription from './BasketListItemDescription'
import mixinsPropsList from '../../mixins/mixinsPropsList'

export default {
  name: 'BasketListItem',
  components: { ProductDescription },
  mixins: [mixinsPropsList],
  props: {
    quantity: {
      type: Number,
      default: 0,
      required: true
    }
  }
}
</script>

<style lang="scss">
  .basket_list__item {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid grey;
    figure {
      max-width: 10%;
      flex: 1 10%;
      position: relative;
      padding-bottom: calc(8% + 4px);
      background-color: lightskyblue;
      overflow: hidden;
      img {
        position: absolute;
        top: 0;
        left: 0;
        max-width: 100%;
        width: 100%;
        transition: all .5s ease-out;

        &:hover {
          transform: scale(1.1);
        }
      }
    }
    .product_description {
      flex: 1 90%;
    }
  }
</style>
