import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VeeValidate from "vee-validate";

import VueRouter from 'vue-router';
import routes from "./routes";


Vue.use(VeeValidate);

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",

  routes: routes
})
router.beforeEach((tor, from, next)=>{
  
  console.log("router :before each")
  next();

})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
