import axios from "axios";
import { put, takeEvery, call } from "redux-saga/effects";
import { WAITING, STOP_WAITING } from "../actions/waitAction";
import { ADD_WIZARD, ADD_WIZARD_RESULT } from "../actions/addWizardAction";

export function* addWizardToAPI(action) {
  const { fName, lName, gender, houseID, isProf } = action.payload;

  let response;
  yield put({ type: WAITING });

  try {
    if (!isProf) {
      if (houseID === undefined) {
        response = yield call(() =>
          axios.get(
            "http://localhost:8081/addStudent/".concat(
              fName,
              "&",
              lName,
              "&",
              gender,
              "&"
            )
          )
        );
      } else {
        response = yield call(() =>
          axios.get(
            "http://localhost:8081/addStudent/".concat(
              fName,
              "&",
              lName,
              "&",
              gender,
              "&",
              houseID
            )
          )
        );
      }
    } else {
      response = yield call(() =>
        axios.get(
          "http://localhost:8081/addProfessor/".concat(
            fName,
            "&",
            lName,
            "&",
            gender
          )
        )
      );
    }

    if (response.status !== 200) {
      throw new Error(response);
    }
    yield put({
      type: ADD_WIZARD_RESULT,
      payload: response.data,
      isProf
    });
  } catch (error) {
    console.error("addWizardToAPI error:\n", error);
  }

  yield put({ type: STOP_WAITING });
}

export default function* watchAddWizard() {
  yield takeEvery(ADD_WIZARD, addWizardToAPI);
}
