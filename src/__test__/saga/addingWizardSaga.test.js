import { cloneableGenerator } from "@redux-saga/testing-utils";

import { ADD_WIZARD, ADD_WIZARD_RESULT } from "../../actions/addWizardAction";

import watchAddWizard from "../../saga/addingWizardSaga";
import { addWizardToAPI } from "../../saga/addingWizardSaga";

describe("testing Adding Point Saga", () => {
  it("testing watcher ", () => {
    const gen = watchAddWizard();
    let genNext = gen.next();
    expect(genNext.done).toBe(false);
    let args = genNext.value.payload.args;
    expect(args.length).toBe(2);
    expect(args[0]).toBe(ADD_WIZARD);
    genNext = gen.next();
    expect(gen.next().done).toBe(true);
  });

  it("testing function*", () => {
    const gen = cloneableGenerator(addWizardToAPI)({
      type: "ADD_WIZARD",
      payload: {
        fName: "Henry",
        lName: "PotDeBeurre",
        gender: "M",
        houseID: 1,
        isProf: false
      }
    });

    let genNext = gen.next();
    //Waiting action :
    expect(genNext.value.type).toBe("PUT");
    expect(genNext.value.payload.action).toEqual({ type: "WAITING" });

    //API Call :
    genNext = gen.next();
    expect(genNext.value.type).toBe("CALL");

    //We pass some dummy data to simulate API Response :
    genNext = gen.next({ status: 200, data: "Yes" });
    //Expect result action that go to reducer :
    expect(genNext.value.type).toBe("PUT");
    expect(genNext.value.payload.action).toEqual({
      type: ADD_WIZARD_RESULT,
      isProf: false,
      payload: "Yes"
    });

    genNext = gen.next();
    //STOP_WAITING action :
    expect(genNext.value.type).toBe("PUT");
    expect(genNext.value.payload.action).toEqual({ type: "STOP_WAITING" });

    expect(gen.next().done).toBeTruthy();
  });
});
