<template >
  <vs-row vs-type="flex" vs-justify="center" vs-align="center">
    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center">
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
      <vs-input
        :vs-valid.sync="valid.rePassword"
        class="full-width"
        vs-success-text="Password "
        vs-danger-text="Password Should Contain Numbers, Letter and Characters"
        vs-type="password"
        vs-label-placeholder="Retype Your Password"
        v-model="rePassword"
      />
      <vs-checkbox vs-color="success" v-model="signIn" class="remeber-me">Sign Me In</vs-checkbox>
      <vs-row vs-type="flex" vs-justify="space-evenly" vs-align="center" vs-w="12">
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="12">
          <vs-button vs-type="success-filled" class="full-width" @click="register">Register</vs-button>
        </vs-col>
      </vs-row>
      <div class="link">
        <router-link to="/login">Already a member.Log In.</router-link>
      </div>
    </vs-col>
  </vs-row>
</template>
<script>
import ACTIONS from "../store/ACTION_CONSTANTS";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      rePassword: "",
      signIn: false,
      valid: {
        email: false,
        password: false,
        rePassword: false,
      },
    };
  },
  methods: {
    ...mapActions([ACTIONS.REGISTER]),
    register() {
      if (
        this.valid.email &&
        this.valid.password &&
        this.valid.rePassword &&
        this.password.toString() === this.rePassword.toString()
      ) {
        const user = {
          username: this.email,
          password: this.password,
        };

        this[ACTIONS.REGISTER]({
          user,
          signIn: this.signIn,
        });
        this.email = "";
        this.password = "";
        this.rePassword = "";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.padding-5 {
  padding: 5%;
}
.remeber-me {
  align-self: flex-start;
  margin: 2% 0;
}
</style>

