import { all } from "redux-saga/effects";
import watchInitCall from "./initialSaga";
import watchAddPoints from "./addingPointSaga";
import watchAddWizard from "./addingWizardSaga";
import watchRemoveWizard from "./removeWizardSaga";

export default function* rootSaga() {
  yield all([
    watchInitCall(),
    watchAddPoints(),
    watchAddWizard(),
    watchRemoveWizard()
  ]);
}
