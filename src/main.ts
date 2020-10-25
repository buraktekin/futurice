import Vue from 'vue';
import Sui from 'semantic-ui-vue';
import VueApexCharts from 'vue-apexcharts';
import App from './App.vue';
import router from './router';
import store from './store';

// 3rd party styles required
import 'semantic-ui-css/semantic.min.css';
import 'leaflet/dist/leaflet.css';
import './assets/css/style.scss';

Vue.config.productionTip = false;
Vue.use(Sui);
Vue.use(VueApexCharts);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
