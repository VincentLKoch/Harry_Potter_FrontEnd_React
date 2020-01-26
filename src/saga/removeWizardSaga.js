import axios from "axios";
import { put, takeEvery, call } from "redux-saga/effects";
import { WAITING, STOP_WAITING } from "../actions/waitAction";
import {
  REMOVE_WIZARD,
  REMOVE_WIZARD_RESULT
} from "../actions/removeWizardAction";

export function* removeWizardToAPI(action) {
  const { id, isProfessor } = action.payload;

  let response;
  yield put({ type: WAITING });

  try {
    if (!isProfessor) {
      response = yield call(() =>
        axios.delete("http://localhost:8081/removeStudent/".concat(id))
      );
    } else {
      response = yield call(() =>
        axios.delete("http://localhost:8081/removeProfessor/".concat(id))
      );
    }

    if (response.status !== 204) {
      throw new Error(response);
    }
    yield put({
      type: REMOVE_WIZARD_RESULT,
      payload: action.payload
    });
  } catch (error) {
    console.error("removeWizardToAPI error:\n", error);
  }

  yield put({ type: STOP_WAITING });
}

export default function* watchRemoveWizard() {
  yield takeEvery(REMOVE_WIZARD, removeWizardToAPI);
}
