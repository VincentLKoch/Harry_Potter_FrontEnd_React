import { cloneableGenerator } from "@redux-saga/testing-utils";

import { ADD_POINTS, ADD_POINTS_RESULT } from "../../actions/addPointsAction";

import watchAddPoints from "../../saga/addingPointSaga";
import { addPointToAPI } from "../../saga/addingPointSaga";

describe("testing Adding Point Saga", () => {
  it("testing watcher ", () => {
    const gen = watchAddPoints();
    let genNext = gen.next();
    expect(genNext.done).toBe(false);
    let args = genNext.value.payload.args;
    expect(args.length).toBe(2);
    expect(args[0]).toBe(ADD_POINTS);
    genNext = gen.next();
    expect(gen.next().done).toBe(true);
  });

  it("testing function*", () => {
    const gen = cloneableGenerator(addPointToAPI)({
      type: "ADD_POINTS",
      payload: { nbPoints: 10, professorID: 2, houseID: 1 }
    });
    let genNext = gen.next();
    //Waiting action :
    expect(genNext.value.type).toBe("PUT");
    expect(genNext.value.payload.action).toEqual({ type: "WAITING" });

    //API Call :
    genNext = gen.next();
    expect(genNext.value.type).toBe("CALL");

    //We pass some dummy data to simulate API Response :
    genNext = gen.next({ status: 200, data: { total: 10 } });
    //Expect result action that go to reducer :
    expect(genNext.value.type).toBe("PUT");
    expect(genNext.value.payload.action).toEqual({
      type: ADD_POINTS_RESULT,
      payload: 10,
      houseID: 1
    });

    genNext = gen.next();
    //STOP_WAITING action :
    expect(genNext.value.type).toBe("PUT");
    expect(genNext.value.payload.action).toEqual({ type: "STOP_WAITING" });

    expect(gen.next().done).toBeTruthy();
  });
});
