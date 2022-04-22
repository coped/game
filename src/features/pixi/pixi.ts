import * as PIXI from "pixi.js";

type PixiOptions = ConstructorParameters<typeof PIXI.Application>[0];

class PixiEngine<CanvasContainer extends HTMLElement> {
  private app: PIXI.Application;
  private defaultOptions: PixiOptions = { width: 640, height: 320 };

  constructor(options?: PixiOptions) {
    options = { ...this.defaultOptions, ...options };
    this.app = new PIXI.Application(options);
  }

  getApp = (): PIXI.Application => this.app;

  getAppView = (): HTMLCanvasElement => this.getApp().view;

  mountApp = (container: CanvasContainer): void => {
    container.appendChild(this.getAppView());
  };

  unmountApp = (container: CanvasContainer): void => {
    container.removeChild(this.getAppView());
  };

  animateIdle = (): void => {
    const sprite = PIXI.Sprite.from("appa-icon.png");
    this.makeClickable(sprite);
    this.getApp().stage.addChild(sprite);

    let elapsed = 0.0;
    this.getApp().ticker.add((delta) => {
      elapsed += delta;
      sprite.x = 100.0 + Math.cos(elapsed / 50.0) * 100.0;
    });
  };

  makeClickable = (sprite: PIXI.Sprite) => {
    sprite.interactive = true;
    sprite.on("pointerdown", () => {
      console.log("I've been clicked!");
    });
  };
}

export { PixiEngine };
