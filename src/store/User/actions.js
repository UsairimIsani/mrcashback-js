import ACTIONS from "../ACTION_CONSTANTS";
import { client } from "../../utils";
import router from "../../router";
import vue from "../../main";
export default {
  [ACTIONS.LOGIN](ctx, payload) {
    client
      .post(`user/login`, payload.user)
      .then(user => {
        ctx.commit(ACTIONS.LOGIN, user);
        vue.$vs.notify({
          title: "Success",
          text: "You have Successfully Logged In.",
          color: "success",
          position: "top-right"
        });
        vue.$router.push("/dashboard");
      })
      .catch(err => {
        ctx.commit(ACTIONS.LOGIN_ERR, err);
        vue.$vs.notify({
          title: "Login Failure",
          text: err.message,
          color: "danger",
          position: "top-right"
        });
      });
  },
  [ACTIONS.REGISTER](ctx, payload) {
    client
      .post(`user/register?signin=${payload.user.signIn}`, payload.user)
      .then(user => {
        ctx.commit(ACTIONS.REGISTER, user);
      })
      .catch(() => {
        router.push("/login");
      })
      .catch(err => {
        ctx.commit(ACTIONS.REGISTER_ERR, err);
      });
  },
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
        ctx.commit(ACTIONS.VERIFY_ME, err);
        router.push("/login");
      });
  }
};
