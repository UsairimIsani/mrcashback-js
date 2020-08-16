import { client } from "../../utils";
import ACTION_CONSTANTS from "../ACTION_CONSTANTS";
export default {
  // * Add new image to DB.
  [ACTION_CONSTANTS.ADD_IMAGE](ctx, payload) {
    client
      .post("img", payload)
      .then(image => {
        ctx.commit(ACTION_CONSTANTS.ADD_IMAGE, payload);
        ctx.dispatch(ACTION_CONSTANTS.UPDATE_USER, image);
      })
      .catch(err => {
        ctx.commit(ACTION_CONSTANTS.ADD_IMAGE_FAILED, err);
      });
  },
  // * Get All images of current Uer
  [ACTION_CONSTANTS.GET_ALL_USER_IMAGES](ctx, payload) {
    client
      .get(`imgs/${payload}`)
      .then(images => {
        ctx.commit(ACTION_CONSTANTS.GET_ALL_USER_IMAGES, images);
      })
      .catch(e => {
        ctx.commit(ACTION_CONSTANTS.GET_ALL_USER_IMAGES_FAILED, e);
      });
  },
  [ACTION_CONSTANTS.GET_IMAGE](ctx, payload) {
    client
      .get(`img/${payload}`)
      .then(image => {
        console.log("IMAGE", image);
        ctx.commit(ACTION_CONSTANTS.GET_IMAGE, image);
      })
      .catch(e => ctx.commit(ACTION_CONSTANTS.GET_IMAGE_FAILED, e));
  }
  // TODO: Actions for Fetching State.
};
