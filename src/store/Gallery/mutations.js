import ACTIONS from "../ACTION_CONSTANTS";
export default {
  [ACTIONS.ADD_IMAGE](state, payload) {
    state.images = state.images.push(payload);
  }
};
