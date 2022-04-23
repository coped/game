import { ReactElement, useRef, useEffect } from "react";
import { useAppDispatch } from "app/hooks";
import { PixiEngine } from "features/pixi/pixi";
import { setGameStatus, GameStatus } from "features/pixi/pixiSlice"
import { nonNull } from "utils/utils";

export function Canvas(): ReactElement {
  const dispatch = useAppDispatch();
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = nonNull(canvasRef.current);
    const pixi = new PixiEngine({ container: canvas });
    dispatch(setGameStatus(GameStatus.playing));

    return () => {
      pixi.cleanup()
    };
  }, [canvasRef, dispatch]);

  return <div ref={canvasRef}></div>;
}
