export const ADD_POINTS = "ADD_POINTS";
export const ADD_POINTS_RESULT = "ADD_POINTS_RESULT";
export const UPDATE_INPUT_VALUE = "UPDATE_INPUT_VALUE";

export const addPointsAction = (nbPoints, professorID, houseID) => ({
  type: ADD_POINTS,
  payload: { nbPoints, professorID, houseID }
});

export const updateValueAction = (newVal, houseID) => ({
  type: UPDATE_INPUT_VALUE,
  payload: newVal,
  houseID
});
