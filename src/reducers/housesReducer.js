import {
  ADD_POINTS_RESULT,
  UPDATE_INPUT_VALUE
} from "../actions/addPointsAction";

const initialState = {
  0: {
    id: 1,
    name: "Gryffindor",
    point: 0,
    inputValue: 0
  },
  1: {
    id: 2,
    name: "Hufflepuff",
    point: 0,
    inputValue: 0
  },
  2: {
    id: 3,
    name: "Ravenclaw",
    point: 0,
    inputValue: 0
  },
  3: {
    id: 4,
    name: "Slytherin",
    point: 0,
    inputValue: 0
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "INIT_ANSWER_HOUSE":
      return { ...action.payload };
    case ADD_POINTS_RESULT:
      const addNewState = state;
      addNewState[action.houseID - 1].point = +action.payload;
      return { ...state, ...addNewState };
    case UPDATE_INPUT_VALUE:
      const inputValNewState = state;
      inputValNewState[action.houseID].inputValue = +action.payload;
      return { ...state, ...inputValNewState };
    default:
      return state;
  }
};
