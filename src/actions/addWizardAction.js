export const ADD_WIZARD = "ADD_WIZARD";
export const ADD_WIZARD_RESULT = "ADD_WIZARD_RESULT";

export const addWizardAction = (fName, lName, gender, houseID, isProf) => ({
  type: ADD_WIZARD,
  payload: { fName, lName, gender, houseID, isProf }
});
