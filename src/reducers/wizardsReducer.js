import { SELECT_WIZARD } from "../actions/selectWizardAction";

const initialState = {
  //Current wizard selected in the UI :
  selected: { id: -1, isProfessor: false },
  //List of professor / student object :
  professors: [],
  students: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "INIT_ANSWER_PROFESSOR":
      return { ...state, professors: action.payload };
    case "INIT_ANSWER_STUDENT":
      return { ...state, students: action.payload };
    case SELECT_WIZARD:
      return { ...state, selected: action.payload };
    default:
      return state;
  }
};
