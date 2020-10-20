export default {
  SET_PRODUCTS: (state, payload) => {
    state.productList = payload;
  },
  ADD_PRODUCT: (state, payload) => {
    state.productList.push(payload);
  },
  DELETE_PRODUCT: (state, payload) => {
    state.productList = state.productList.filter(
      (product) => product.id != payload
    );
  },
  UPDATE_PRODUCT: (state, payload) => {
    state.productList = state.productList.map((product) => {
      if (product.id === payload.id) {
        return payload;
      }
      return product;
    });
  },
};
