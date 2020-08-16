import ACTION_CONSTANTS from "../ACTION_CONSTANTS";

export default {
  async [ACTION_CONSTANTS.GET_ALL_USERS](state, payload) {
    state.users = await payload;
  },
  [ACTION_CONSTANTS.GET_ALL_USERS_FAILED](state, payload) {
    state.err = payload;
  },
  async [ACTION_CONSTANTS.GET_ALL_IMAGES](state, payload) {
    state.images = await payload;
  },
  [ACTION_CONSTANTS.GET_ALL_IMAGES_FAILED](state, payload) {
    state.err = payload;
  },
  [ACTION_CONSTANTS.GET_IMAGE](state, payload) {
    state.image = payload;
  },
  [ACTION_CONSTANTS.GET_IMAGE_FAILED](state, payload) {
    state.err = payload;
  }
};
