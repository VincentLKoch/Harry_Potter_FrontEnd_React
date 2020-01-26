export const REMOVE_WIZARD = "REMOVE_WIZARD";
export const REMOVE_WIZARD_RESULT = "REMOVE_WIZARD_RESULT";

export const removeWizardAction = (id, isProfessor) => ({
  type: REMOVE_WIZARD,
  payload: { id, isProfessor }
});
