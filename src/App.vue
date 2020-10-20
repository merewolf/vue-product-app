<template>
  <div>
    <app-header></app-header>
    <b-container>
      <b-row class="justify-content-center">
        <router-view />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
export default {
  components: {
    AppHeader,
  },
};
</script>
<style>
a {
  text-decoration: none !important;
  color: #ffffff !important;
}
.error-message {
  color: red;
}
.page-loader {
  top: 45%;
  left: 46%;
  position: absolute;
}
</style>
