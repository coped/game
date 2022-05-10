import type { UUID } from "utils/types";
import { store } from "app/store";
import {
  create,
  update,
  remove,
  updateByType,
  AudioStatus,
  AudioTypes as ReduxAudioTypes,
} from "./audioManagerSlice";

type AudioManagerState = Record<UUID, HTMLAudioElement>;
type AudioTypeFileMap<T extends string> = Record<T, string>;

type AudioUnsubscriber = () => void;
type AudioSubscriber = () => AudioUnsubscriber;
type Subscriptions = () => unknown;

export class AudioManager<AudioTypes extends ReduxAudioTypes> {
  state: AudioManagerState = {};
  fileMap: AudioTypeFileMap<AudioTypes>;
  subscriptions: Subscriptions[] = [];

  constructor(audioTypeFileMap: AudioTypeFileMap<AudioTypes>) {
    this.fileMap = audioTypeFileMap;
    store.subscribe(this.removedAudioListener);
  }

  /* Store listeners */

  removedAudioListener = (): void => {
    const { audio: reduxAudio } = store.getState();

    this.audioIds().forEach((id) => {
      if (!reduxAudio[id]) {
        this.state[id].pause();
        delete this.state[id];
      }
    });
  };

  /* Helpers */

  audioIds = (): UUID[] => Object.keys(this.state);

  /**
   * Audio subscription
   */
  unsubscribe: AudioUnsubscriber = (): void => {};

  subscribe: AudioSubscriber = (): typeof this.unsubscribe => {
    return this.unsubscribe;
  };

  // pauseAllAudio = () => {
  //   for (const type in this.fileMap) {
  //     store.dispatch(
  //       updateByType({ type: type, data: { status: AudioStatus.paused } })
  //     );
  //   }
  // };

  // TODO instead of notifying via Promises, have this fn
  // return an event subscription fn.
  playAudio = (type: AudioTypes, { overlappingAudio = false } = {}): void => {
    !overlappingAudio &&
      store.dispatch(
        updateByType({ type, data: { status: AudioStatus.paused } })
      );

    const id = this.makeAudio(type);
    const audio = this.state[id];

    audio.addEventListener("canplaythrough", () => {
      audio.play();
      store.dispatch(
        update({ uuid: id, data: { status: AudioStatus.playing } })
      );
    });

    audio.addEventListener("ended", () => {
      store.dispatch(remove(id));
    });
  };

  makeAudio = (type: AudioTypes): UUID => {
    const id = crypto.randomUUID();
    const audio = new Audio(this.fileMap[type]);

    this.state[id] = audio;
    store.dispatch(
      create({
        uuid: id,
        data: { status: AudioStatus.unstarted, type: type },
      })
    );

    return id;
  };
}
