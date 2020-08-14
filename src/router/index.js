import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/dashboard",
    name: "Dashboard",

    component: () => import("../views/Dashboard.vue")
  },
  {
    path: "/signup",
    name: "SignUp",

    component: () => import("../views/SignUp.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
