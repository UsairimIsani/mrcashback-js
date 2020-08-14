<template >
  <vs-row vs-type="flex" vs-justify="center" vs-align="center">
    <vs-col vs-type="flex" vs-justify="flex-start">
      <h1>MRCASHBACK</h1>
      <vs-input
        :vs-valid.sync="valid.email"
        class="full-width"
        vs-success-text="Email"
        vs-danger-text="You've typed a wrong email format."
        vs-type="email"
        vs-label-placeholder="Email"
        v-model="email"
      />

      <vs-input
        :vs-valid.sync="valid.password"
        class="full-width"
        vs-success-text="Password "
        vs-danger-text="Password Should Contain Numbers, Letter and Characters"
        vs-type="password"
        vs-label-placeholder="Password"
        v-model="password"
      />
      <vs-checkbox vs-color="success" v-model="rememberMe" class="remeber-me">Remember Me</vs-checkbox>
      <vs-row vs-type="flex" vs-justify="space-evenly" vs-align="center" vs-w="12">
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
          <vs-button vs-type="success-filled" class="full-width" @click="login">Login</vs-button>
        </vs-col>
      </vs-row>
      <div class="link">
        <router-link to="/signup">Register As a New User.</router-link>
      </div>
    </vs-col>
  </vs-row>
</template>

<script >
import { mapActions } from "vuex";
import ACTIONS from "../store/ACTION_CONSTANTS";
export default {
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false,
      valid: {
        email: false,
        password: false,
      },
    };
  },
  methods: {
    ...mapActions([ACTIONS.LOGIN]),
    login() {
      if (this.valid.email && this.valid.password) {
        const user = {
          username: this.email,
          password: this.password,
        };
        this.password = "";
        this.email = "";
        this[ACTIONS.LOGIN]({
          user,
          rememberMe: this.rememberMe,
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
