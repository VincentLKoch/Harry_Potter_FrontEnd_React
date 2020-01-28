import axios from "axios";
import { put, takeLatest, call } from "redux-saga/effects";
import { WAITING, STOP_WAITING } from "../actions/waitAction";

//Add points :
import { ADD_POINTS, ADD_POINTS_RESULT } from "../actions/addPointsAction";

export function* addPointToAPI(action) {
  const { nbPoints, professorID, houseID } = action.payload;
  if (
    nbPoints === 0 ||
    nbPoints === undefined ||
    professorID === undefined ||
    houseID === undefined
  ) {
    return;
  }

  let response;
  yield put({ type: WAITING });

  try {
    response = yield call(() =>
      axios.post(
        "http://localhost:8081/addPoints/".concat(
          nbPoints,
          "&",
          professorID,
          "&",
          houseID
        )
      )
    );

    if (response.status !== 200) {
      throw new Error(response);
    }
    yield put({
      type: ADD_POINTS_RESULT,
      payload: +response.data.total,
      houseID
    });
  } catch (error) {
    console.error("addPointToAPI error:\n", error);
  }

  yield put({ type: STOP_WAITING });
}

export default function* watchAddPoints() {
  yield takeLatest(ADD_POINTS, addPointToAPI);
}
