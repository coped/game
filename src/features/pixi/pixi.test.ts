import { PixiEngine } from "./pixi";

describe("PixiEngine", () => {
  it("should construct", () => {
    const construct = () => new PixiEngine();

    expect(construct).not.toThrow();
  });
});
