import housesReducer from "../../reducers/housesReducer";

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

describe("Houses Reducer Tests", () => {
  it.each([
    ["Init test", , { type: "INIT" }, initialState],
    [
      "Unkown Type test ",
      { DummyState: true },
      { type: "Dummy" },
      { DummyState: true }
    ],
    [
      "Init data from API",
      initialState,
      {
        type: "INIT_ANSWER_HOUSE",
        payload: { filterContent: "dummy" }
      },
      { filterContent: "dummy" }
    ],
    [
      "ADD_POINTS_RESULT",
      initialState,
      {
        type: "ADD_POINTS_RESULT",
        payload: 42,
        houseID: 1
      },
      {
        ...initialState,
        0: {
          id: 1,
          name: "Gryffindor",
          point: 42,
          inputValue: 0
        }
      }
    ],
    [
      "UPDATE_INPUT_VALUE Action Test",
      initialState,
      {
        type: "UPDATE_INPUT_VALUE",
        payload: "45",
        houseID: 3
      },
      {
        ...initialState,
        3: {
          id: 4,
          name: "Slytherin",
          point: 0,
          inputValue: 45
        }
      }
    ]
  ])("%s", (testName, state, action, outputState) => {
    expect(housesReducer(state, action)).toEqual(outputState);
  });
});
