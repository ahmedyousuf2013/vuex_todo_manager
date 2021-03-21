import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VeeValidate from "vee-validate";

import VueRouter from 'vue-router';
import HomePage from './components/Homepage.vue'
import Aboutus from './components/Aboutus.vue'
Vue.use(VeeValidate);

Vue.use(VueRouter);

const router = new VueRouter({
mode:"history",

  routes: [{ path: "/", component: HomePage },
  { path: "/about", component: Aboutus }
  ]

})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
