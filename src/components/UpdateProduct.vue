<template>
  <div>
    <b-button @click="modalShow = !modalShow"
      ><i class="fas fa-edit"
    /></b-button>
    <b-modal
      v-model="modalShow"
      title="Update Product"
      @show="showModal"
      @hidden="resetModal"
      @ok="handleSubmit"
    >
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
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'UpdateProduct',
  props: ['product'],
  data() {
    return {
      modalShow: false,
      form: {
        name: '',
        price: '',
        brand: '',
        inventoryStatus: '',
      },
      submitted: false,
    };
  },
  methods: {
    showModal() {
      this.form = {
        name: this.$props.product.name,
        price: this.$props.product.price.split('$')[1],
        brand: this.$props.product.brand,
        inventoryStatus: this.$props.product.inventoryStatus.toString(),
      };
    },
    resetModal() {
      this.form = {};
    },
    async handleSubmit(bvModalEvt) {
      try {
        // prevent modal from closing
        bvModalEvt.preventDefault();
        this.submitted = true;
        let result = await this.$validator.validate();
        if (result) {
          this.$store.dispatch('updateProduct', {
            name: this.form.name,
            price: '$' + this.form.price,
            brand: this.form.brand,
            inventoryStatus: this.form.inventoryStatus === 'true',
            id: this.$props.product.id,
          });
          this.modalShow = false;
          this.submitted = false;
        }
        this.showToast('Product updated successfuly', 'SUCCESS');
      } catch (error) {
        console.log('error', error);
        this.showToast('Product update failed', 'ERROR');
      }
    },
  },
};
</script>

<style></style>
