import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export enum GameStatus {
  prologue = "prologue",
  playing = "playing",
  win = "win",
  loss = "loss",
}

export interface PixiState {
  message: string;
  gameStatus: GameStatus;
  clicks: number;
}

const initialState: PixiState = {
  message: "",
  gameStatus: GameStatus.prologue,
  clicks: 0,
};

export const pixiSlice = createSlice({
  name: "pixi",
  initialState,
  reducers: {
    setGameStatus: (state, action: PayloadAction<GameStatus>) => {
      state.gameStatus = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    incrementClicks: (state) => {
      state.clicks += 1;
    },
    resetClicks: (state) => {
      state.clicks = 0;
    },
  },
});

export const { setGameStatus, setMessage, incrementClicks, resetClicks } =
  pixiSlice.actions;

/* Selectors */
export const selectGameStatus = (state: RootState) => state.pixi.gameStatus;
export const selectMessage = (state: RootState) => state.pixi.message;
export const selectClicks = (state: RootState) => state.pixi.clicks;

export default pixiSlice.reducer;
