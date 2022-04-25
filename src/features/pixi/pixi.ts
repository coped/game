import * as PIXI from "pixi.js";
import { store } from "app/store";
import { GameStatus } from "./pixiSlice";
import { Appa } from "./entities/Appa";
import assign from "lodash/assign";
import type { Entity } from "./entities/Entity";

type PixiOptions = ConstructorParameters<typeof PIXI.Application>[0];
type PixiEngineOptions<T extends HTMLElement> = {
  options?: PixiOptions;
  container: T;
};
type PixiEngineState = {
  gameStatus: GameStatus;
  entities: Entity[];
};

class PixiEngine<CanvasContainer extends HTMLElement> {
  private app: PIXI.Application;
  private defaultOptions: PixiOptions = { width: 800, height: 400 } as const;
  private container: CanvasContainer;
  private state: PixiEngineState = {
    gameStatus: GameStatus.prologue,
    entities: [],
  };

  constructor({ options, container }: PixiEngineOptions<CanvasContainer>) {
    options = assign(this.defaultOptions, options);
    this.app = new PIXI.Application(options);
    this.container = container;
    this.initialize();
  }

  initialize = (): void => {
    this.mountApp();
    store.subscribe(this.gameStatusListener);
  };

  getApp = (): PIXI.Application => this.app;

  getAppView = (): PIXI.Application["view"] => this.app.view;

  getRenderer = (): PIXI.Application["renderer"] => this.app.renderer;

  gameStatusListener = (): void => {
    const state = store.getState();
    const gameStatus = state.pixi.gameStatus;
    if (gameStatus === this.state.gameStatus) return;

    switch (gameStatus) {
      case GameStatus.playing: {
        this.startGame();
        break;
      }
      default: {
        this.stopGame();
        break;
      }
    }
    this.state.gameStatus = gameStatus;
  };

  startGame = (): void => {
    const appa = new Appa();
    this.addEntity(appa);
    const sprite = appa.getSprite();

    this.app.stage.addChild(sprite);

    let elapsed = 0.0;
    this.app.ticker.add((delta) => {
      elapsed += delta;
      sprite.x = this.xDelta(elapsed);
      sprite.y = this.app.renderer.height / 3;
    });
  };

  addEntity = (entity: PixiEngineState["entities"][number]): void => {
    this.state.entities = [...this.state.entities, entity];
  };

  xDelta = (n: number): number => {
    return this.app.renderer.width / 3 + Math.sin(n / 50) * 100;
  };

  // yDelta = (n: number) => {
  //   return this.app.renderer.height /
  // }

  stopGame = (): void => {
    this.destroyEntities();
  }

  destroyEntities = (): void => {
    this.state.entities.forEach((entity) => {
      entity.destroy(this.app);
    });
    this.state.entities = [];
  };

  cleanup = (): void => {
    this.stopGame();
    this.app.destroy();
    this.unmountApp();
  };

  private mountApp = (): void => {
    this.container.appendChild(this.app.view);
  };

  private unmountApp = (): void => {
    this.container.removeChild(this.app.view);
  };
}

export { PixiEngine };
