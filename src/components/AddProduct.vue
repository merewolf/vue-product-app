<template>
  <b-col md="6" class="m-3">
    <b-card header="Add Produt">
      <b-card-body>
        <b-form autocomplete="off">
          <b-form-group label="Name">
            <b-form-input
              v-validate="{ required: true, min: 3 }"
              v-model="form.name"
              id="name"
              name="name"
              trim
            ></b-form-input>
            <div v-if="submitted" class="error-message">
              {{ errors.first('name') }}
            </div>
          </b-form-group>
          <b-form-group label="Price ($)">
            <b-form-input
              v-validate="{ required: true, numeric: true }"
              v-model="form.price"
              id="price"
              name="price"
              trim
            ></b-form-input>
          </b-form-group>
          <div v-if="submitted" class="error-message">
            {{ errors.first('price') }}
          </div>
          <b-form-group label="Brand">
            <b-form-input
              v-validate="{ required: true }"
              v-model="form.brand"
              id="brand"
              name="brand"
              trim
            ></b-form-input>
          </b-form-group>
          <div v-if="submitted" class="error-message">
            {{ errors.first('brand') }}
          </div>
          <b-form-group label="Inventory?">
            <div v-if="submitted" class="error-message">
              {{ errors.first('inventoryStatus') }}
            </div>
            <b-form-radio
              v-validate="{ required: true }"
              v-model="form.inventoryStatus"
              name="inventoryStatus"
              value="true"
              >In Stock</b-form-radio
            >
            <b-form-radio
              v-model="form.inventoryStatus"
              name="inventoryStatus"
              value="false"
              >Out Of Stock</b-form-radio
            >
          </b-form-group>
        </b-form>
      </b-card-body>
      <b-button block variant="primary" @click="add">
        Add Product
        <b-spinner
          small
          variant="light"
          v-if="showAddProductSpinner"
        ></b-spinner>
      </b-button>
    </b-card>
  </b-col>
</template>

<script>
import { mapActions } from 'vuex';
// if don't want to register globally
//import myMixin from '@/mixins/myMixin';
export default {
  //mixins: [myMixin],
  data() {
    return {
      form: {
        name: '',
        price: '',
        brand: '',
        inventoryStatus: '',
      },
      submitted: false,
      showAddProductSpinner: false,
    };
  },
  methods: {
    ...mapActions(['addProduct']),
    async add() {
      try {
        this.submitted = true;
        let result = await this.$validator.validate();
        if (result) {
          this.showAddProductSpinner = true;
          await this.addProduct({
            name: this.form.name,
            price: '$' + this.form.price,
            brand: this.form.brand,
            inventoryStatus: this.form.inventoryStatus === 'true',
          });
          this.showAddProductSpinner = false;
          this.showToast('Product added successfuly', 'SUCCESS');
          this.form = {
            name: '',
            price: '',
            brand: '',
            inventoryStatus: '',
          };
          this.submitted = false;
        }
      } catch (error) {
        console.log('error', error);
        this.showAddProductSpinner = false;
        this.showToast(error.message, 'ERROR');
      }
    },
  },
};
</script>

<style></style>
