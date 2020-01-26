import { SELECT_WIZARD } from "../actions/selectWizardAction";
import { ADD_WIZARD_RESULT } from "../actions/addWizardAction";
import { REMOVE_WIZARD_RESULT } from "../actions/removeWizardAction";

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
    case ADD_WIZARD_RESULT:
      if (action.isProf) {
        state.professors.push(action.payload);
      } else {
        state.students.push(action.payload);
      }
      return state;
    case REMOVE_WIZARD_RESULT:
      const { id, isProfessor } = action.payload;
      if (isProfessor) {
        state.professors = state.professors.filter(prof => prof.id !== id);
      } else {
        state.students = state.students.filter(prof => prof.id !== id);
      }
      return { ...state, selected: { id: -1, isProfessor: false } };
    default:
      return state;
  }
};
