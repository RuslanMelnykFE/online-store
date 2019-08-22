<template>
  <header>
    <nav id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/basket">
        <icon-basket/>
        <span>{{ number_products }}</span>
      </router-link>
    </nav>
  </header>
</template>

<script>
import IconBasket from '../Svg/SvgBusket'

export default {
  name: 'HeaderPage',
  components: { IconBasket },
  computed: {
    number_products () { return this.$store.state.basket.basket.total_amount }
  }
}
</script>

<style lang="scss">
  header {
    max-width: 100%;
    width: 100%;
    box-sizing: border-box;
    background-color: #15284b;
    #nav {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      max-width: 1280px;
      width: 100%;
      margin: auto;
      box-sizing: border-box;
      a {
        display: inline-block;
        padding: 12px 36px;
        font-size: 20px;
        font-weight: bold;
        text-decoration: none;
        color: #ffffff;
        &:first-child {
          padding: 32px 36px;
          height: 100%;
        }
        &:last-child {
          position: relative;
          svg {
            width: 60px;
            height: 60px;
          }
          span {
            position: absolute;
            top: calc(50% - 28px);
            right: 8px;
            z-index: 5;
            font-size: 30px;
            color: #ffffff;
          }
        }
        &.router-link-exact-active {
          background-color: #0000b9;
        }
      }
    }
  }
</style>
