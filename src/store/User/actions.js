import { client } from "../../utils";
import router from "../../router";
import vue from "../../main";
import ACTION_CONSTANTS from "../ACTION_CONSTANTS";
export default {
  // * Login User with Email and Password

  [ACTION_CONSTANTS.LOGIN](ctx, payload) {
    client
      .post(`user/login`, payload.user)
      .then(user => {
        // * Update the User State with logged in User.

        ctx.commit(ACTION_CONSTANTS.LOGIN, user);

        // * Notification of Successful SignIn

        vue.$vs.notify({
          title: "Success",
          text: "You have Successfully Logged In.",
          color: "success",
          position: "top-right"
        });

        // * Redirect to Dashboard.

        vue.$router.push("/dashboard");
      })
      .catch(err => {
        // * Notification for Login Failure

        vue.$vs.notify({
          title: "Login Failure",
          text: err.message,
          color: "danger",
          position: "top-right"
        });
        // * Login Failed.
        ctx.commit(ACTION_CONSTANTS.LOGIN_FAILED, err);

        // * Redirect to Register on Login Failure.
        // * Non exhaustive Error Handling : TODO Exhaustive Error Handling
        // TODO : Cases
        // TODO : Wrong Email or Password
        // TODO : Network Error
        // TODO : Non existent User.
        // TODO : More Unknown Cases

        // vue.$router.push("/register");
      });
  },
  [ACTION_CONSTANTS.REGISTER](ctx, payload) {
    // * Register New User. (Mock Add to DB)
    client
      .post(`user/register?signin=${payload.user.signIn}`, payload.user) // * Sign In -> Auto Sign In user after account registration.
      .then(user => {
        // * Update User State with new User.
        ctx.commit(ACTION_CONSTANTS.REGISTER, user);
        if (payload.signIn) {
          router.push("/dashboard");
        } else {
          router.push("/login");
        }
      })
      .catch(() => {
        // * Failed to Register new User.
        // * Redirect to Login
        router.push("/login");
      })
      .catch(err => {
        ctx.commit(ACTION_CONSTANTS.REGISTER_FAILED, err);
        // * Notification of Registration Failure.
        vue.$vs.notify({
          title: "Registration Failure",
          text: err.message,
          color: "danger",
          position: "top-right"
        });
      });
  },
  // * Authenticate User session.
  [ACTION_CONSTANTS.VERIFY_ME](ctx) {
    client
      .get(`user/me`)
      .then(user => {
        ctx.commit(ACTION_CONSTANTS.VERIFY_ME, user);
      })
      .catch(() => {
        router.push("/login");
      })
      .catch(err => {
        ctx.commit(ACTION_CONSTANTS.VERIFY_ME_FAILURE, err);
        router.push("/login");
      });
  },

  [ACTION_CONSTANTS.UPDATE_USER](ctx, payload) {
    client
      .post(`user/img/${payload}`, {
        user: ctx.state.user.email,
        imageId: payload
      })
      .then(user => {
        ctx.commit(ACTION_CONSTANTS.UPDATE_USER, user);
      })
      .catch(err => {
        ctx.commit(ACTION_CONSTANTS.UPDATE_USER_FAILED, err);
      });
  }
};
