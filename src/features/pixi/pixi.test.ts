import { PixiEngine } from "./pixi";

describe("PixiEngine", () => {
  // Temporarily skipping because WebGL isn't supported in JSDOM
  it.skip("should construct", () => {
    const container = document.createElement("div");
    const construct = () => new PixiEngine({ container });
    expect(construct).not.toThrow();
  });
});
