import { combineReducers } from "redux";
import housesReducer from "./housesReducer";
import waitingReducer from "./waitingReducer";
import wizardsReducer from "./wizardsReducer";

export default combineReducers({
  houses: housesReducer,
  wizards: wizardsReducer,
  wait: waitingReducer
});
