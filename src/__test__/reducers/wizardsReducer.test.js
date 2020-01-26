import wizardsReducer from "../../reducers/wizardsReducer";

const initialState = {
  //Current wizard selected in the UI :
  selected: { id: -1, isProfessor: false },
  //List of professor / student object :
  professors: [],
  students: []
};

describe("Houses Reducer Tests", () => {
  it.each([
    ["Init test", , { type: "INIT" }, { ...initialState }],
    [
      "Unkown Type test ",
      { DummyState: true },
      { type: "Dummy" },
      { DummyState: true }
    ],
    [
      "Init Professor data from API",
      { ...initialState },
      {
        type: "INIT_ANSWER_PROFESSOR",
        payload: { content: "dummy" }
      },
      { ...initialState, professors: { content: "dummy" } }
    ],
    [
      "Init Student data from API",
      { ...initialState },
      {
        type: "INIT_ANSWER_STUDENT",
        payload: { content: "dummy" }
      },
      { ...initialState, students: { content: "dummy" } }
    ],
    [
      "Select Wizard test",
      { ...initialState },
      {
        type: "SELECT_WIZARD",
        payload: { content: "dummy" }
      },
      { ...initialState, selected: { content: "dummy" } }
    ],
    [
      "add Wizard test 1 : prof",
      { ...initialState },
      {
        type: "ADD_WIZARD_RESULT",
        payload: { content: "dummy" },
        isProf: true
      },
      { ...initialState, professors: [{ content: "dummy" }] }
    ],
    [
      "add Wizard test 2 : student",
      { ...initialState },
      {
        type: "ADD_WIZARD_RESULT",
        payload: { content: "dummy" },
        isProf: false
      },
      { ...initialState, students: [{ content: "dummy" }] }
    ],
    [
      "remove Wizard test 1 : prof",
      {
        ...initialState,
        professors: [{ id: 0 }, { id: 1 }, { id: 3 }],
        selected: {}
      },
      {
        type: "REMOVE_WIZARD_RESULT",
        payload: { id: 1, isProfessor: true }
      },
      {
        ...initialState,
        professors: [{ id: 0 }, { id: 3 }],
        selected: { id: -1, isProfessor: false }
      }
    ],
    [
      "remove Wizard test 2 : student",
      {
        ...initialState,
        students: [{ id: 0 }, { id: 1 }, { id: 3 }],
        selected: {}
      },
      {
        type: "REMOVE_WIZARD_RESULT",
        payload: { id: 1, isProfessor: false }
      },
      {
        ...initialState,
        students: [{ id: 0 }, { id: 3 }],
        selected: { id: -1, isProfessor: false }
      }
    ]
  ])("%s", (testName, state, action, outputState) => {
    expect(wizardsReducer(state, action)).toEqual(outputState);
  });
});
