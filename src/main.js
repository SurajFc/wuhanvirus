import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from 'axios';
import VueAxios from 'vue-axios';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import VueGoogleCharts from 'vue-google-charts';

Vue.use(VueGoogleCharts);
Vue.use(require("moment"));

Vue.use(VueAxios, axios);

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
