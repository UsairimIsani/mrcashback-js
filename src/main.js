import Vue from "vue";
import Vuesax from "vuesax";
import device from "vue-device-detector";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./utils";

import "vuesax/dist/vuesax.css";
import "material-icons/iconfont/material-icons.css";

Vue.use(Vuesax);
Vue.use(device);

Vue.config.productionTip = false;
// Clear Local Storage
window.onbeforeunload = function(e) {
  localStorage.clear();
};
export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
