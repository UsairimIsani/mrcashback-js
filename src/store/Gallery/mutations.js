import ACTION_CONSTANTS from "../ACTION_CONSTANTS";

export default {
  [ACTION_CONSTANTS.ADD_IMAGE](state, payload) {
    state.images.push(payload);
  },
  [ACTION_CONSTANTS.ADD_IMAGE_FAILED](state, payload) {
    state.err = payload;
  },
  [ACTION_CONSTANTS.GET_ALL_USER_IMAGES](state, payload) {
    state.images = payload;
  },
  [ACTION_CONSTANTS.GET_ALL_USER_IMAGES_FAILED](state, payload) {
    state.err = payload;
  },
  [ACTION_CONSTANTS.GET_IMAGE](state, payload) {
    state.image = payload;
  },
  [ACTION_CONSTANTS.GET_IMAGE_FAILED](state, payload) {
    state.err = payload;
  }
};
