<template>
  <div class="basket_page">
    <h2>Basket list</h2>
    <basket-list/>
  </div>
</template>

<script>
import BasketList from '@/components/BasketList/BasketList.vue'

export default {
  name: 'BasketPage',
  components: { BasketList }
}
</script>
