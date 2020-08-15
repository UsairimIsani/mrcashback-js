<template >
  <vs-row vs-type="flex" vs-justify="center" vs-align="center">
    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" class="form-container">
      <vs-input
        size="large"
        success-text="Email"
        danger-text="You've typed a wrong email format."
        type="email"
        label-placeholder="Email"
        v-model="email"
      />

      <vs-input
        size="large"
        success-text="Password"
        danger-text="Password Should Contain Numbers, Letter and Characters"
        type="password"
        label="Password"
        label-placeholder="Password"
        v-model="password"
      />
      <vs-checkbox vs-value="success" v-model="rememberMe">Remember Me</vs-checkbox>
      <vs-button size="large" vs-type="success-filled" class="submit" @click="login">Login</vs-button>
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
      const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
      if (
        re.test(String(this.email).toLowerCase()) &&
        this.password.toString().length > 0
      ) {
        const user = {
          email: this.email,
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
