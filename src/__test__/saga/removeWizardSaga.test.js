import { cloneableGenerator } from "@redux-saga/testing-utils";

import {
  REMOVE_WIZARD,
  REMOVE_WIZARD_RESULT
} from "../../actions/removeWizardAction";

import watchRemoveWizard from "../../saga/removeWizardSaga";
import { removeWizardToAPI } from "../../saga/removeWizardSaga";

describe("testing Adding Point Saga", () => {
  it("testing watcher ", () => {
    const gen = watchRemoveWizard();
    let genNext = gen.next();
    expect(genNext.done).toBe(false);
    let args = genNext.value.payload.args;
    expect(args.length).toBe(2);
    expect(args[0]).toBe(REMOVE_WIZARD);
    genNext = gen.next();
    expect(gen.next().done).toBe(true);
  });

  it("testing function*", () => {
    const gen = cloneableGenerator(removeWizardToAPI)({
      type: REMOVE_WIZARD,
      payload: {
        id: 12,
        isProfessor: true
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
    genNext = gen.next({ status: 204 });
    //Expect result action that go to reducer :
    expect(genNext.value.type).toBe("PUT");
    expect(genNext.value.payload.action).toEqual({
      type: REMOVE_WIZARD_RESULT,
      payload: {
        id: 12,
        isProfessor: true
      }
    });

    genNext = gen.next();
    //STOP_WAITING action :
    expect(genNext.value.type).toBe("PUT");
    expect(genNext.value.payload.action).toEqual({ type: "STOP_WAITING" });

    expect(gen.next().done).toBeTruthy();
  });
});
