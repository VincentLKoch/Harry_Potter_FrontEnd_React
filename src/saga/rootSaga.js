import { all } from "redux-saga/effects";
import watchInitCall from "./initialSaga";
import watchAddPoints from "./addingSaga";

export default function* rootSaga() {
  yield all([watchInitCall(), watchAddPoints()]);
}
