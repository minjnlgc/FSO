import counterReducer from "./counterReducer";
import deepFreeze from "deep-freeze";

describe("counterReducer", () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  test("should return a proper initial state when called with undefined state", () => {
    const state = {}
    const action = {
      type: "DO_NOTHING",
    };

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test("good is incremented", () => {
    const stateAtStart = {
      good: 2,
      ok: 4,
      bad: 5,
    };
    const action = {
      type: "GOOD",
    };

    deepFreeze(stateAtStart);

    const newState = counterReducer(stateAtStart, action);
    expect(newState).toEqual({ ...stateAtStart, good: stateAtStart.good + 1 });
  });

  test("bad is decreased", () => {
    const stateAtStart = {
      good: 2,
      ok: 4,
      bad: 5,
    };

    const action = {
      type: "BAD",
    };

    deepFreeze(stateAtStart);

    const newState = counterReducer(stateAtStart, action);
    expect(newState).toEqual({ ...stateAtStart, bad: stateAtStart.bad + 1 });
  });

  test("ok is incremented", () => {
    const stateAtStart = {
        good: 2,
        ok: 4,
        bad: 5,
      };

    const action = {
      type: "OK",
    };

    deepFreeze(stateAtStart);

    const newState = counterReducer(stateAtStart, action);
    expect(newState).toEqual({...stateAtStart, ok: stateAtStart.ok + 1});
  });

  test("zero is reset all to zero", () => {
    const stateAtStart = {
      good: 10,
      ok: 10,
      bad: 10,
    };

    const action = {
      type: "ZERO",
    };

    deepFreeze(stateAtStart);

    const newState = counterReducer(stateAtStart, action);
    expect(newState).toEqual(initialState);
  });
});
