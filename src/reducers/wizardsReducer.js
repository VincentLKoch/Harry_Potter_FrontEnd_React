export default (state = { professor: [], student: [] }, action) => {
  switch (action.type) {
    case "INIT_ANSWER_PROFESSOR":
      return { ...state, professor: action.payload };
    case "INIT_ANSWER_STUDENT":
      return { ...state, student: action.payload };
    default:
      return state;
  }
};
