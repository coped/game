import { Appa } from "./Appa";
import { removeChildren } from "utils/utils";

describe("Appa", () => {
  afterEach(() => {
    removeChildren(document.body);
  });

  it("should construct", () => {
    expect(() => new Appa()).not.toThrow();
  });

  it("should get sprite", () => {
    const appa = new Appa();
    expect(appa.getSprite().isSprite).toEqual(true);
  });

  it("should get state", () => {
    const appa = new Appa();
    expect(appa.getState()).toBeTruthy();
  });

  it("should not be able to externally modify state", () => {
    const appa = new Appa();
    const state = appa.getState();

    state.audioPlaying.roar.push(new Audio());
    const newState = appa.getState();

    expect(state).not.toEqual(newState);
  });
});
