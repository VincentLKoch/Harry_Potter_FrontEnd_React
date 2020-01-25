import { WAITING, STOP_WAITING } from "../actions/waitAction";
import { put, takeEvery, call } from "redux-saga/effects";
import axios from "axios";

function* getInitData() {
  yield put({ type: WAITING });
  let response;

  try {
    response = yield call(() =>
      axios.get("http://localhost:8081/getInitData/")
    );

    if (response.status !== 200) {
      throw new Error(response);
    }

    yield put({ type: "INIT_ANSWER_HOUSE", payload: response.data.house });
    yield put({ type: "INIT_ANSWER_STUDENT", payload: response.data.student });
    yield put({
      type: "INIT_ANSWER_PROFESSOR",
      payload: response.data.professor
    });
  } catch (error) {
    console.error("getInitData error:\n", error);
    if (error.message) {
      yield put({ type: "Error", payload: error.message });
    } else {
      yield put({ type: "Error", payload: error });
    }
  }

  yield put({ type: STOP_WAITING });
}

export default function* watchInitCall() {
  yield takeEvery("INIT_DATA", getInitData);
}
