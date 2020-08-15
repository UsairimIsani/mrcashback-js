import ACTIONS from "../ACTION_CONSTANTS";
import { client } from "../../utils";
export default {
  [ACTIONS.ADD_IMAGE](ctx, payload) {
    client
      .post("/img")
      .then(image => {
        ctx.commit(ACTIONS.ADD_IMAGE, image);
      })
      .catch(err => {
        ctx.commit(ACTIONS.ADD_IMAGE_FAILED, err);
      });
  }
};
