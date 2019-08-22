const getSum = (arr) => { return arr.reduce((sum, elem) => { return sum + elem.quantity }, 0) }

const getQuantity = (arr, id) => {
  const filterArr = arr.filter(elem => elem.product.id === id)
  return getSum(filterArr)
}

const changeQuantity = (arr, id, value) => {
  return arr.forEach((elem, index) => {
    if (elem.product.id === id) arr[index].quantity = value
  })
}

export default {
  namespaced: true,
  state: {
    basket: {
      basket_list: [], // список товаров в корзине
      total_amount: 0 // общее количество товаров в корзине
    }
  },
  mutations: {
    changeBasket (state, value) {
      state.basket = value
    },
    changeBasketList (state, value) {
      state.basket.basket_list = value
    },
    changeTotalAmount (state, value) {
      state.basket.total_amount = value
    }
  },
  actions: {
    // Получение данных корзины
    getBasketList ({ state, commit }) {
      if (localStorage.getItem('basket')) {
        try {
          commit('changeBasket', JSON.parse(localStorage.getItem('basket')))
        } catch (e) {
          localStorage.removeItem('basket')
        }
      } else {
        localStorage.setItem('basket', JSON.stringify(state.basket))
      }
    },

    // Пересчет количества продуктов
    recount ({ state, commit }) {
      const basket = state.basket.basket_list
      const totalAmount = getSum(basket)
      commit('changeTotalAmount', totalAmount)
    },

    // Добавление товаров в корзину
    addToCard ({ state, commit, dispatch }, product) {
      const basket = state.basket.basket_list

      basket.push({ product: product, quantity: 1, date: new Date() })
      basket.sort((a, b) => new Date(b.date) - new Date(a.date))

      const quantity = getQuantity(basket, product.id)

      const collection = new Set()

      const filter = (val) => basket.filter(item => {
        let value = val(item)
        return collection.has(value) ? false : collection.add(value)
      })

      const filterBasket = filter(val => val.product.id)

      filterBasket.forEach((elem, index) => {
        if (elem.product.id === product.id) filterBasket[index].quantity = quantity
      })

      commit('changeBasketList', filterBasket)
      dispatch('recount')
      localStorage.setItem('basket', JSON.stringify(state.basket))
    },

    changesQuantityProduct ({ state, commit, dispatch }, changes) {
      const basket = state.basket.basket_list
      changeQuantity(basket, changes.id, changes.quantity)
      commit('changeBasketList', basket)
      dispatch('recount')
      localStorage.setItem('basket', JSON.stringify(state.basket))
    },

    // Удалить продукт из корзины
    deleteProduct ({ state, commit, dispatch }, id) {
      const basket = state.basket.basket_list
      const filterBasket = basket.filter(elem => {
        return elem.product.id !== id
      })
      commit('changeBasketList', filterBasket)
      dispatch('recount')
      localStorage.setItem('basket', JSON.stringify(state.basket))
    },

    // Очистить корзину
    emptyTrash ({ state, commit }) {
      commit('changeBasketList', [])
      commit('changeTotalAmount', 0)
      localStorage.setItem('basket', JSON.stringify(state.basket))
    }
  }
}
