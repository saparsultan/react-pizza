export const addPizzaToCart = (pizzaObj) => ({
  type: 'ADD_PIZZA_CART',
  payload: pizzaObj
})

export const minusItem = (id) => ({
  type: 'MINUS_ITEM_CART',
  payload: id
})

export const plusItem = (id) => ({
  type: 'PLUS_ITEM_CART',
  payload: id
})

export const removeItemCart = (id) => ({
  type: 'REMOVE_ITEM_CART',
  payload: id
})

export const clearCart = () => ({
  type: 'CLEAR_CART',
})
