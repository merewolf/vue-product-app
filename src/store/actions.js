import axios from 'axios';

const BASE_URL = process.env.VUE_APP_BASE_URL;
export default {
  setProducts: async ({ commit }) => {
    try {
      let result = await axios.get(`${BASE_URL}/products`);
      commit('SET_PRODUCTS', result.data);
    } catch (error) {
      throw new Error(error);
    }
  },
  addProduct: async ({ commit }, payload) => {
    try {
      let result = await axios.post(`${BASE_URL}/products`, payload);
      commit('ADD_PRODUCT', result.data);
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteProduct: async ({ commit }, payload) => {
    try {
      await axios.delete(`${BASE_URL}/products/${payload}`);
      commit('DELETE_PRODUCT', payload);
    } catch (error) {
      throw new Error(error);
    }
  },
  updateProduct: async ({ commit }, payload) => {
    try {
      let result = await axios.put(
        `${BASE_URL}/products/${payload.id}`,
        payload
      );
      commit('UPDATE_PRODUCT', result.data);
    } catch (error) {
      throw new Error(error);
    }
  },
};
