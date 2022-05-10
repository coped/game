import type { UUID } from "utils/types";
import { AudioTypes as AppaAudioTypes } from "../entities/Appa";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export enum AudioStatus {
  unstarted = "AUDIO_STATUS_UNSTARTED",
  playing = "AUDIO_STATUS_PLAYING",
  paused = "AUDIO_STATUS_PAUSED",
  ended = "AUDIO_STATUS_ENDED",
}

export type AudioTypes = AppaAudioTypes;

type AudioData = {
  type: AudioTypes;
  status: AudioStatus;
};
type AudioManagerState = {
  [uuid: UUID]: AudioData;
};

const initialState: AudioManagerState = {};

export const audioManagerSlice = createSlice({
  name: "audioManager",
  initialState,
  reducers: {
    create: (state, action: PayloadAction<{ uuid: UUID; data: AudioData }>) => {
      const { uuid, data } = action.payload;
      return { ...state, [uuid]: data };
    },
    update: (
      state,
      action: PayloadAction<{ uuid: UUID; data: Partial<AudioData> }>
    ) => {
      const { uuid, data } = action.payload;
      const updatedData = { ...state[uuid], ...data };
      return { ...state, [uuid]: updatedData };
    },
    updateByType: (
      state,
      action: PayloadAction<{ type: AudioTypes; data: Partial<AudioData> }>
    ) => {
      const data = action.payload;

      const ids = Object.keys(state);
      const newState: AudioManagerState = ids.reduce((acc, id) => {
        return state[id].type === data.type ? { ...state[id], ...data } : acc;
      }, {});

      return newState;
    },
    updateByStatus: (
      state,
      action: PayloadAction<{ status: AudioStatus; data: Partial<AudioData> }>
    ) => {
      const data = action.payload;

      const ids = Object.keys(state);
      const newState: AudioManagerState = ids.reduce((acc, id) => {
        return state[id].status === data.status ? { ...state[id], ...data } : acc;
      }, {});

      return newState;
    },
    remove: (state, action: PayloadAction<UUID>) => {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    },
  },
});

export const { create, update, updateByType, updateByStatus, remove } = audioManagerSlice.actions;

/* Selectors */
export const selectAudio = (state: RootState, uuid: UUID): AudioData => {
  return state.audio[uuid];
};

export const selectAllAudio = (state: RootState): AudioManagerState => {
  return state.audio;
};

export const selectByAudioType = (state: RootState, type: AudioTypes): UUID[] => {
  const ids = Object.keys(state.audio);
  return ids.filter((id) => state.audio[id].type === type);
};

export const selectByAudioStatus = (
  state: RootState,
  status: AudioStatus
): UUID[] => {
  const ids = Object.keys(state.audio);
  return ids.filter((id) => state.audio[id].status === status);
};

export default audioManagerSlice.reducer;
