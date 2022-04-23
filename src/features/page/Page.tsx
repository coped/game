import { ReactElement, ReactNode, MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  selectGameStatus,
  selectClicks,
  GameStatus,
  setGameStatus,
  resetClicks,
} from "features/pixi/pixiSlice";

type Props = { children: ReactNode };
export function Page({ children }: Props): ReactElement {
  const dispatch = useAppDispatch();
  const gameStatus = useAppSelector(selectGameStatus);
  const clicks = useAppSelector(selectClicks);

  const toggleGame = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    switch (gameStatus) {
      case GameStatus.prologue: {
        return dispatch(setGameStatus(GameStatus.playing));
      }
      case GameStatus.playing: {
        dispatch(resetClicks());
        dispatch(setGameStatus(GameStatus.prologue));
        return;
      }
    }
  };

  return (
    <div>
      <h1>
        Game status: <em>{gameStatus}</em>
      </h1>
      {children}
      <p>Appa clicked {clicks} times</p>
      <button onClick={toggleGame}>
        {gameStatus === GameStatus.playing ? "Stop playing" : "Start playing"}
      </button>
    </div>
  );
}
