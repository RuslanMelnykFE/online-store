<template>
  <li class="product_list__item">
    <figure>
      <img :src="product.image_link" :alt="product.title">
    </figure>
    <div class="product_list__item__description">
      <h4>{{ product.title }}</h4>
      <p>{{ product.price }}</p>
      <button-add :product_id="product.id"/>
    </div>
  </li>
</template>

<script>
import ButtonAdd from '../Button/ButtonAdd'
import mixinsPropsList from '../../mixins/mixinsPropsList'

export default {
  name: 'ProductListItem',
  components: { ButtonAdd },
  mixins: [mixinsPropsList]
}
</script>

<style lang="scss">
  .product_list__item {
    figure {
      position: relative;
      max-width: 100%;
      width: 100%;
      padding-bottom: 83%;
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
    &__description {
      padding: 10px;
      box-sizing: border-box;
      border-top: 1px solid #808080;
      h4 {
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      p {
        margin-bottom: 15px;
        font-weight: 900;
        color: coral;
      }
    }
  }
</style>
