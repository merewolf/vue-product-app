import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import myMixin from './mixins/myMixin';

import BootstrapVue from 'bootstrap-vue';
import VeeValidate from 'vee-validate';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(VeeValidate);
Vue.mixin(myMixin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
