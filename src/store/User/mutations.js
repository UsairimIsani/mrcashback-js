import ACTION_CONSTANTS from "../ACTION_CONSTANTS";

export default {
  // * User State after Login
  [ACTION_CONSTANTS.LOGIN](state, payload) {
    state.user = payload;
    state.user.verified = true;
  },
  // * User State after Login Failed
  [ACTION_CONSTANTS.LOGIN_FAILED](state, payload) {
    state.err = true;
    state.errObj = payload;
    state.verified = false;
  },
  // * User State after Registration
  [ACTION_CONSTANTS.REGISTER](state, payload) {
    state.user = payload.data.user;
    state.user.token = payload.data.token;
    state.user.verified = true;
  },
  // * User State after Registration Failed
  [ACTION_CONSTANTS.REGISTER_FAILED](state, payload) {
    state.err = true;
    state.errObj = payload.data;
    state.verified = false;
  },
  [ACTION_CONSTANTS.UPDATE_USER](state, payload) {
    state.user = payload;
  },
  [ACTION_CONSTANTS.UPDATE_USER_FAILED](state, payload) {
    state.err = true;
    state.errObj = payload;
  },
  [ACTION_CONSTANTS.LOGOUT](state, payload) {
    state.user = {};
    state.verified = false;
  }
  // * Authenticate User Session
  // [ACTION_CONSTANTS.VERIFY_ME](state, payload) {
  //   if (state.user.token.toString() === payload.data.token.toString()) {
  //     state.user.verified = true;
  //   } else {
  //     state.user.verified = false;
  //   }
  // }
};
