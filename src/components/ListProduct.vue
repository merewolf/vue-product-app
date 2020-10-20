<template>
  <b-col class="m-3">
    <b-card header="List Produt">
      <b-card-group deck>
        <b-card
          style="min-width: 30%; max-width: 30%"
          class="m-3"
          :border-variant="product.inventoryStatus ? 'success' : 'danger'"
          align="center"
          v-for="product in productList"
          :key="product.id"
        >
          <b-badge
            class="m-3"
            :variant="product.inventoryStatus ? 'success' : 'danger'"
            >{{
              product.inventoryStatus ? 'IN STOCK' : 'OUT OF STOCK'
            }}</b-badge
          >

          <b-card-text><strong>Name: </strong>{{ product.name }}</b-card-text>
          <b-card-text><strong>Price: </strong>{{ product.price }}</b-card-text>
          <b-card-text><strong>Brand: </strong>{{ product.brand }}</b-card-text>
          <hr />
          <b-row>
            <b-col>
              <b-button variant="danger" @click="deleteProduct(product.id)"
                ><i class="fas fa-trash-alt"></i
              ></b-button>
            </b-col>
            <b-col>
              <update-product :product="product" />
            </b-col>
          </b-row>
        </b-card>
      </b-card-group>
      <h2 v-if="productList.length < 1 && !showPageLoader">
        No Products Found!
      </h2>
      <b-spinner
        variant="secondary"
        class="page-loader"
        v-if="showPageLoader"
      ></b-spinner>
    </b-card>
  </b-col>
</template>

<script>
import UpdateProduct from './UpdateProduct.vue';
/* import { mapState } from 'vuex';
 */
import { mapGetters } from 'vuex';
export default {
  components: {
    UpdateProduct,
  },
  data() {
    return {
      showPageLoader: false,
    };
  },
  methods: {
    async deleteProduct(productId) {
      try {
        await this.$store.dispatch('deleteProduct', productId);
        this.showToast('Product deleted successfuly', 'SUCCESS');
      } catch (error) {
        console.log('error', error);
        this.showToast(error.message, 'ERROR');
      }
    },
  },
  computed: {
    /*  ...mapState({testList: 'productList'})
    ...mapState(['productList'])
*/
    ...mapGetters(['productList']),
  },
  async mounted() {
    try {
      this.showPageLoader = true;
      await this.$store.dispatch('setProducts');
      this.showPageLoader = false;
    } catch (error) {
      console.log('error', error);
      this.showPageLoader = false;
    }
  },
};
</script>

<style></style>
