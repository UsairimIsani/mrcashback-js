import Vue from "vue";
import Vuex from "vuex";
import User from "./User";
import Gallery from "./Gallery";
import Admin from "./Admin";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    User,
    Gallery,
    Admin
  }
});
