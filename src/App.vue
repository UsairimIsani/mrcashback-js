<template>
  <div style="height:100%;">
    <div>
      <vs-navbar style="height:100%;">
        <div slot="title">
          <vs-navbar-title>
            <router-link to="/">
              <img src="@/assets/logo.svg" alt />
            </router-link>
            {{$route.name}}
          </vs-navbar-title>
        </div>
        <vs-navbar-item index="0">
          <router-link
            class="home-link"
            v-if="$route.path !== '/dashboard' && $route.path !=='/login'&& $route.path !=='/signup'"
            to="/dashboard"
          >Dashboard</router-link>
        </vs-navbar-item>
        <vs-navbar-item index="0">
          <router-link
            class="home-link"
            v-if="$route.path !=='/login'&& $route.path !=='/signup' && auth.isAdmin()"
            to="/admin"
          >Admin</router-link>
        </vs-navbar-item>
        <vs-navbar-item index="2">
          <a v-if="$route.path !=='/login'&& $route.path !=='/signup'" @click="logout">
            <vs-icon icon="exit_to_app"></vs-icon>
          </a>
        </vs-navbar-item>
      </vs-navbar>
    </div>
    <div class="router-view">
      <transition>
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
import { auth } from "./utils";
import { mapActions } from "vuex";
import ACTION_CONSTANTS from "./store/ACTION_CONSTANTS";
export default {
  data() {
    return {
      title: "",
      auth,
    };
  },
  methods: {
    ...mapActions([ACTION_CONSTANTS.LOGOUT]),
    logout() {
      this[ACTION_CONSTANTS.LOGOUT]();
    },
  },
};
</script>
<style lang="scss">
html,
body {
  height: 100%;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.vs-navbar--header {
  padding: 1em;
  & h3 {
    & img {
      margin: 0 0.5em;
      width: 2em;
    }
    display: flex;
    align-items: center;
    font-size: 1.2em;
  }
}

.router-view {
  height: 90vh;
  padding: 1em;
}
.vs-row,
.vs-col {
  height: 100%;
}
.column {
  flex-direction: column;
}
.form-container {
  flex-direction: column;
  & div {
    width: 100%;
    margin: 0.5em;
  }
  .submit {
    min-width: 200px;
    max-width: 500px;
    width: auto;
  }
}
.vs-input {
  min-width: 200px;
  max-width: 500px;
  width: auto;
}

.default-img-size {
  min-width: 200px;
  max-width: 500px;
  min-height: 200px;
  height: auto;
}
.home-link {
  font-weight: 500;
}
.vs-navbar--item a {
  cursor: pointer;
}
</style>
