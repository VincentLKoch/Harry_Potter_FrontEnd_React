import axios from "axios";
import { put, takeEvery, call } from "redux-saga/effects";
import { WAITING, STOP_WAITING } from "../actions/waitAction";

export function* getInitData() {
  yield put({ type: WAITING });
  let response;

  try {
    response = yield call(() =>
      axios.get("http://localhost:8081/getInitData/")
    );

    if (response.status !== 200) {
      throw new Error(response);
    }

    for (let ind = 0; ind < response.data.house.length; ind++) {
      response.data.house[ind].inputValue = 0;
    }

    yield put({ type: "INIT_ANSWER_HOUSE", payload: response.data.house });
    yield put({ type: "INIT_ANSWER_STUDENT", payload: response.data.student });
    yield put({
      type: "INIT_ANSWER_PROFESSOR",
      payload: response.data.professor
    });
  } catch (error) {
    console.error("getInitData error:\n", error);
  }

  yield put({ type: STOP_WAITING });
}

export default function* watchInitCall() {
  yield takeEvery("INIT_DATA", getInitData);
}
