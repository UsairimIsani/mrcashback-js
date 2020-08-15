import ACTIONS from "../ACTION_CONSTANTS";
import { client } from "../../utils";
import router from "../../router";
import vue from "../../main";
export default {
  // * Login User with Email and Password
  [ACTIONS.LOGIN](ctx, payload) {
    client
      .post(`user/login`, payload.user)
      .then(user => {
        // * Update the User State with logged in User.
        ctx.commit(ACTIONS.LOGIN, user);
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
        // * Login Failed.
        ctx.commit(ACTIONS.LOGIN_FAILED, err);
        // * Notification for Login Failure
        vue.$vs.notify({
          title: "Login Failure",
          text: err.message,
          color: "danger",
          position: "top-right"
        });
        // * Redirect to Register on Login Failure.
        // * Non exhaustive Error Handling : TODO Exhaustive Error Handling
        // TODO : Cases
        // TODO : Wrong Email or Password
        // TODO : Network Error
        // TODO : Non existent User.
        // TODO : More Unknown Cases
        vue.$router.push("/register");
      });
  },
  [ACTIONS.REGISTER](ctx, payload) {
    // * Register New User. (Mock Add to DB)
    client
      .post(`user/register?signin=${payload.user.signIn}`, payload.user) // * Sign In -> Auto Sign In user after account registration.
      .then(user => {
        // * Update User State with new User.
        ctx.commit(ACTIONS.REGISTER, user);
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
        ctx.commit(ACTIONS.REGISTER_FAILED, err);
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
  [ACTIONS.VERIFY_ME](ctx) {
    client
      .get(`user/me`)
      .then(user => {
        ctx.commit(ACTIONS.VERIFY_ME, user);
      })
      .catch(() => {
        router.push("/login");
      })
      .catch(err => {
        ctx.commit(ACTIONS.VERIFY_ME_FAILURE, err);
        router.push("/login");
      });
  }
};
