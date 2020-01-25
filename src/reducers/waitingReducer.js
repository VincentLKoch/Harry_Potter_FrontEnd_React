import { WAITING, STOP_WAITING } from "../actions/waitAction";

export default (state = false, action) => {
  switch (action.type) {
    case WAITING:
      return true;
    case STOP_WAITING:
      return false;
    default:
      return state;
  }
};
