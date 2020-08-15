import ACTIONS from "../ACTION_CONSTANTS";
import router from "../../router";
import { setTokenInLocalStorage } from "../../asyncUtil/cryptopins";
export default {
  [ACTIONS.LOGIN](state, payload) {
    state.user = payload.userData.data;
    state.user.verified = true;
    console.log(payload.rememberMe);
    if (payload.rememberMe) {
      localStorage.setItem("rememberMe", true);
      setTokenInLocalStorage(payload.userData);
    }
    router.push("/app/tickets");
  },
  [ACTIONS.LOGIN_ERR](state, payload) {
    state.user.err = true;
    state.user.errObj = payload.data;
    state.user.verified = false;
  },
  [ACTIONS.REGISTER](state, payload) {
    state.user = payload.data.user;
    state.user.token = payload.data.token;
    state.user.verified = true;

    router.push("/app/tickets");
  },
  [ACTIONS.REGISTER_ERR](state, payload) {
    state.user.err = true;
    state.user.errObj = payload.data;
    state.user.verified = false;
  },
  [ACTIONS.VERIFY_ME](state, payload) {
    console.log("PAYLOAD OF VERIFY", payload);
    if (state.user.token.toString() === payload.data.token.toString()) {
      state.user.verified = true;
    } else {
      state.user.verified = false;
    }
  }
};
