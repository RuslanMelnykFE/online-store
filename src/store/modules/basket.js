// Получение общего количества выбранных продуктов
const getSum = arr => arr.reduce((sum, elem) => sum + elem.quantity, 0)
// Получение количества одного продукта
const getQuantity = (arr, id) => getSum(arr.filter(elem => elem.product.id === id))
// Изменение количества в выбраном продукте
const changeQuantity = (arr, id, value) =>
  arr.map(elem => (elem.product.id === id) ? { ...elem, quantity: value } : elem)
// Получение коллекции уникальных продуктов
const getUniqueProducts = arr => {
  const collection = new Set()
  const filter = val => arr.filter(item => {
    let value = val(item)
    return collection.has(value) ? false : collection.add(value)
  })
  return filter(val => val.product.id)
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
    // Мутация корзины
    changeBasket (state, value) {
      state.basket = value
    },
    // Мутация списка продуктов в корзине
    changeBasketList (state, value) {
      state.basket.basket_list = value
    },
    // Муеация общего количества продуктов в корзине
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
      // Добавление товаров в корзину
      basket.push({ product: product, quantity: 1, date: new Date() })
      // Сортировка товаров по времени их добавлени в корзину
      basket.sort((a, b) => new Date(b.date) - new Date(a.date))
      // Вычисления количества одного товара в корзине
      const quantity = getQuantity(basket, product.id)
      // Отфильтрованный список уникальных продуктов с изменением количества продуктов
      const filterBasket = changeQuantity(getUniqueProducts(basket), product.id, quantity)

      commit('changeBasketList', filterBasket)
      dispatch('recount')
      localStorage.setItem('basket', JSON.stringify(state.basket))
    },

    changesQuantityProduct ({ state, commit, dispatch }, changes) {
      const basket = state.basket.basket_list
      const changeQuantityProduct = changeQuantity(basket, changes.id, changes.quantity)
      commit('changeBasketList', changeQuantityProduct)
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
