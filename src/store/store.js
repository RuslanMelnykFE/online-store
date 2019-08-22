import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products'
import basket from './modules/basket'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    products, basket
  }
})
