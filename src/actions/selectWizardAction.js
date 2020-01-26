export const SELECT_WIZARD = "SELECT_WIZARD";

export const selectWizardAction = (id, isProfessor) => ({
  type: SELECT_WIZARD,
  payload: { id, isProfessor }
});
