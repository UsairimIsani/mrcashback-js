import ACTIONS from "../ACTION_CONSTANTS";
export default {
  // * User State after Logine
  [ACTIONS.LOGIN](state, payload) {
    state.user = payload;
    state.user.verified = true;
  },
  // * User State after Login Failed
  [ACTIONS.LOGIN_FAILED](state, payload) {
    state.user.err = true;
    state.user.errObj = payload;
    state.user.verified = false;
  },
  // * User State after Registration
  [ACTIONS.REGISTER](state, payload) {
    state.user = payload.data.user;
    state.user.token = payload.data.token;
    state.user.verified = true;
  },
  // * User State after Registration Failed
  [ACTIONS.REGISTER_FAILED](state, payload) {
    state.user.err = true;
    state.user.errObj = payload.data;
    state.user.verified = false;
  }
  // * Authenticate User Session
  // [ACTIONS.VERIFY_ME](state, payload) {
  //   if (state.user.token.toString() === payload.data.token.toString()) {
  //     state.user.verified = true;
  //   } else {
  //     state.user.verified = false;
  //   }
  // }
};
