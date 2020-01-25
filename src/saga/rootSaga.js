import { all } from "redux-saga/effects";
import watchInitCall from "./initialSaga";

export default function* rootSaga() {
  yield all([watchInitCall()]);
}
