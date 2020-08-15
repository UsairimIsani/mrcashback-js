import ACTIONS from "../ACTION_CONSTANTS";
export default {
  [ACTIONS.LOGIN](state, payload) {
    state.user = payload;
    state.user.verified = true;
  },
  [ACTIONS.LOGIN_ERR](state, payload) {
    state.user.err = true;
    state.user.errObj = payload;
    state.user.verified = false;
  },
  [ACTIONS.REGISTER](state, payload) {
    state.user = payload.data.user;
    state.user.token = payload.data.token;
    state.user.verified = true;
  },
  [ACTIONS.REGISTER_ERR](state, payload) {
    state.user.err = true;
    state.user.errObj = payload.data;
    state.user.verified = false;
  }
  // [ACTIONS.VERIFY_ME](state, payload) {
  //   if (state.user.token.toString() === payload.data.token.toString()) {
  //     state.user.verified = true;
  //   } else {
  //     state.user.verified = false;
  //   }
  // }
};
