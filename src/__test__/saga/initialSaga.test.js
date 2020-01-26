import { cloneableGenerator } from "@redux-saga/testing-utils";

import watchInitCall from "../../saga/initialSaga";
import { getInitData } from "../../saga/initialSaga";

describe("testing Adding Point Saga", () => {
  it("testing watcher ", () => {
    const gen = watchInitCall();
    let genNext = gen.next();
    expect(genNext.done).toBe(false);
    let args = genNext.value.payload.args;
    expect(args.length).toBe(2);
    expect(args[0]).toBe("INIT_DATA");
    genNext = gen.next();
    expect(gen.next().done).toBe(true);
  });

  it("testing function*", () => {
    const gen = cloneableGenerator(getInitData)({
      type: "INIT_DATA",
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

    genNext = gen.next({
      status: 200,
      data: { house: [{ id: 0 }], student: ["test"], professor: ["toto"] }
    });
    expect(genNext.value.type).toBe("PUT");
    expect(genNext.value.payload.action).toEqual({
      type: "INIT_ANSWER_HOUSE",
      payload: [{ id: 0, inputValue: 0 }]
    });

    genNext = gen.next();
    expect(genNext.value.type).toBe("PUT");
    expect(genNext.value.payload.action).toEqual({
      type: "INIT_ANSWER_STUDENT",
      payload: ["test"]
    });

    genNext = gen.next();
    expect(genNext.value.type).toBe("PUT");
    expect(genNext.value.payload.action).toEqual({
      type: "INIT_ANSWER_PROFESSOR",
      payload: ["toto"]
    });

    genNext = gen.next();
    //STOP_WAITING action :
    expect(genNext.value.type).toBe("PUT");
    expect(genNext.value.payload.action).toEqual({ type: "STOP_WAITING" });

    expect(gen.next().done).toBeTruthy();
  });
});
