import type { Entity } from "./Entity";
import type { UUID } from "utils/types";
import * as PIXI from "pixi.js";
import { store } from "app/store";
import { incrementClicks } from "../pixiSlice";
import { AudioManager } from "../helpers/AudioManager";
import cloneDeep from "lodash/cloneDeep";
import { EmptyObject } from "@reduxjs/toolkit";

type AppaState = EmptyObject;

export enum AudioTypes {
  roar = "Appa-roar",
  meow = "Appa-meow",
  test = "Appa-test",
}
enum SpriteFiles {
  appa = "appa-icon.png",
}
const audioTypeFileMap = {
  [AudioTypes.meow]: 'meow.mp3',
  [AudioTypes.roar]: 't-rex-roar.mp3',
  [AudioTypes.test]: 'test-notification.wav'
} as const;

export class Appa implements Entity {
  readonly uuid: UUID;
  private app: PIXI.Application;
  private sprite: PIXI.Sprite;
  private audioManager: AudioManager<AudioTypes>;
  private state: AppaState = {};

  constructor(app: PIXI.Application) {
    this.uuid = crypto.randomUUID();
    this.app = app;

    this.audioManager = new AudioManager<AudioTypes>(audioTypeFileMap);

    this.sprite = PIXI.Sprite.from(SpriteFiles.appa);
    this.sprite.interactive = true;

    this.registerEvents();
  }

  registerEvents = (): void => {
    this.sprite.on("pointerdown", async () => {
      store.dispatch(incrementClicks());
      this.meow();
    });
  };

  getSprite = (): PIXI.Sprite => this.sprite;

  /**
   * Deep clone of Appa entity state.
   *
   * Note: Modifying value returned from this function will not modify entity state.
   */
  getState = (): AppaState => cloneDeep(this.state);

  /**
   * Movement
   */

  addToStage = (): void => {
    this.app.stage.addChild(this.sprite);
  };

  oscillate = (): void => {
    const getX = (n: number): number => {
      return this.app.renderer.width / 3 + Math.sin(n / 50) * 100;
    };

    let elapsed = 0.0;
    this.app.ticker.add((delta) => {
      elapsed += delta;
      this.sprite.x = getX(elapsed);
      this.sprite.y = this.app.renderer.height / 3;
    });
  };

  /**
   * Audio
   */

  roar = () => this.audioManager.playAudio(AudioTypes.roar);

  meow = () => this.audioManager.playAudio(AudioTypes.meow);

  destroy = (): void => {
    this.app.stage.removeChild(this.sprite);
    // this.audioManager.pauseAllAudio();
  };
}
