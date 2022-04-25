import * as PIXI from "pixi.js";
import { store } from "app/store";
import { incrementClicks } from "../pixiSlice";
import cloneDeep from "lodash/cloneDeep";
import type { Entity } from "./Entity";

type AppaState = {
  audioPlaying: Record<AudioTypes, HTMLAudioElement[]>;
};

export enum AudioTypes {
  roar = "roar",
  meow = "meow",
}

export enum AudioFiles {
  roar = "t-rex-roar.mp3",
  meow = "meow.mp3",
}

enum SpriteFiles {
  appa = "appa-icon.png",
}

export class Appa implements Entity {
  private sprite: PIXI.Sprite;
  private state: AppaState = {
    audioPlaying: { roar: [], meow: [] },
  };

  constructor() {
    this.sprite = PIXI.Sprite.from(SpriteFiles.appa);
    this.sprite.interactive = true;
    this.registerEvents();
  }

  registerEvents = (): void => {
    this.sprite.on("pointerdown", () => {
      store.dispatch(incrementClicks());
      this.meow();
    });
  };

  getSprite = (): PIXI.Sprite => this.sprite;

  getState = (): AppaState => cloneDeep(this.state);

  roar = (): void => {
    this.playAudio(AudioTypes.roar);
  };

  meow = (): void => {
    this.playAudio(AudioTypes.meow, { noOverlap: false });
  };

  pausePlayingAudio = (key: AudioTypes): void => {
    this.state.audioPlaying[key].forEach((audio) => {
      audio.pause();
    });
    this.state.audioPlaying.roar = [];
  };

  playAudio = (key: AudioTypes, { noOverlap = true } = {}): void => {
    noOverlap && this.pausePlayingAudio(key);

    const audio = this.makeAudio(key);
    audio.addEventListener("canplaythrough", () => {
      audio.play();
      this.state.audioPlaying[key] = [...this.state.audioPlaying[key], audio];
    });

    audio.addEventListener("ended", () => {
      this.state.audioPlaying[key] = this.state.audioPlaying[key].filter(
        (a) => a !== audio
      );
    });
  };

  makeAudio = (key: AudioTypes): HTMLAudioElement => {
    switch (key) {
      case AudioTypes.roar: {
        return new Audio(AudioFiles.roar);
      }
      case AudioTypes.meow: {
        return new Audio(AudioFiles.meow);
      }
      default: {
        return new Audio();
      }
    }
  };

  destroy = (app?: PIXI.Application): void => {
    app?.stage.removeChild(this.sprite);

    const audioKeys = Object.keys(this.state.audioPlaying);
    audioKeys.forEach((key) => {
      this.state.audioPlaying[key as AudioTypes].forEach((audio) => {
        audio.pause();
      });
      this.state.audioPlaying[key as AudioTypes] = [];
    });
  };
}
