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
        success-text="Password "
        danger-text="Password Should Contain Numbers, Letter and Characters"
        type="password"
        label-placeholder="Password"
        v-model="password"
      />
      <vs-input
        size="large"
        success-text="Password "
        danger-text="Password Should Contain Numbers, Letter and Characters"
        type="password"
        label-placeholder="Retype Your Password"
        v-model="rePassword"
      />
      <vs-button vs-type="success-filled" class="submit" @click="register">Register</vs-button>
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
.form-container {
  flex-direction: column;
  div {
    padding: 1em;
    width: 100%;
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
.remeber-me {
  align-self: flex-start;
  margin: 2% 0;
}
</style>

