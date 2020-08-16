import { client } from "../../utils";
import ACTION_CONSTANTS from "../ACTION_CONSTANTS";
export default {
  [ACTION_CONSTANTS.GET_ALL_IMAGES](ctx, payload) {
    client
      .get("imgs")
      .then(images => {
        // console.log("ADMIN ACTION IMAGES", images);
        ctx.commit(ACTION_CONSTANTS.GET_ALL_IMAGES, images);
      })
      .catch(e => ctx.commit(ACTION_CONSTANTS.GET_ALL_IMAGES_FAILED, e));
  },
  [ACTION_CONSTANTS.GET_ALL_USERS](ctx, payload) {
    client
      .get("users")
      .then(users => {
        // console.log("ADMIN ACTION USERS", users);

        ctx.commit(ACTION_CONSTANTS.GET_ALL_USERS, users);
      })
      .catch(e => ctx.commit(ACTION_CONSTANTS.GET_ALL_IMAGES_FAILED, e));
  },
  [ACTION_CONSTANTS.GET_IMAGE](ctx, payload) {
    client
      .get(`img/${payload}`)
      .then(image => {
        ctx.commit(ACTION_CONSTANTS.GET_IMAGE, image);
      })
      .catch(e => ctx.commit(ACTION_CONSTANTS.GET_IMAGE_FAILED, e));
  }
  // TODO: Actions for Fetching State.
};
