<template>
  <div id="app">
    <header-page/>
    <router-view/>
  </div>
</template>

<script>
import HeaderPage from '@/components/Header/HeaderPage.vue'

export default {
  components: { HeaderPage },
  mounted () { this.$store.dispatch('basket/getBasketList') }
}
</script>

<style lang="scss">
  @import './assets/main.scss'
</style>
