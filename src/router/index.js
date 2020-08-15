import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import { auth } from "@/utils";
Vue.use(VueRouter);

const routes = [
  // * Redirect to Login Page
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: {
      requiresAuth: true
    },

    component: () => import("../views/Dashboard.vue")
  },
  {
    path: "/signup",
    name: "Sign Up",

    component: () => import("../views/SignUp.vue")
  },
  {
    path: "/admin/id",
    meta: {
      requiresAuth: true
      // * requiresAdmin: true
    },
    component: () => import("../views/Admin.vue")
  },
  {
    path: "/img/:id",
    Name: "Image Detail",
    component: () => import("../components/ImageDetails.vue")
  },
  {
    path: "*", // * For any other route redirect to Login Page
    redirect: "/login"
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // * this route requires auth,
    // * check if logged in redirect to dashboard
    // * if not, redirect to login page.
    if (!auth.isLoggedIn()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
