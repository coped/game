import { Appa, AudioTypes } from "./Appa";
import { removeChildren } from "utils/utils";

describe("Appa", () => {
  afterEach(() => {
    removeChildren(document.body);
  });

  type AppaOptions = ConstructorParameters<typeof Appa>[0];

  const getAppa = ({ app = jest.fn() as unknown as AppaOptions } = {}) =>
    new Appa(app);

  it("should construct", () => {
    expect(getAppa).not.toThrow();
  });

  it("should get sprite", () => {
    const appa = getAppa();
    expect(appa.getSprite().isSprite).toEqual(true);
  });

  it("should get state", () => {
    const appa = getAppa();
    expect(appa.getState()).toBeTruthy();
  });

  it("should not be able to externally modify state", () => {
    // const appa = getAppa();
    // const state = appa.getState();

    // state.playingAudio[AudioTypes.roar].push(new Audio());
    // const newState = appa.getState();

    // expect(state).not.toEqual(newState);
  });

  it("should track playing audio in state", () => {
    // const audioType = AudioTypes.test;
    // const appa = getAppa();

    // appa.playAudio(audioType);

    // // globalThis.slee

    // expect(appa.getState().playingAudio[audioType]).toHaveLength(1);
  })
});
