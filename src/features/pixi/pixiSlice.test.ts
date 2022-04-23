import pixiReducer, { GameStatus } from "./pixiSlice";

describe("pixiReducer", () => {
  it("should handle initial state", () => {
    expect(pixiReducer(undefined, { type: "unknown" })).toEqual({
      message: "",
      gameStatus: GameStatus.prologue,
    });
  });
});
