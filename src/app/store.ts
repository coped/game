import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "features/counter/counterSlice";
import pixiReducer from "features/pixi/pixiSlice";
import audioManagerReducer from "features/pixi/helpers/audioManagerSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    pixi: pixiReducer,
    audio: audioManagerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
