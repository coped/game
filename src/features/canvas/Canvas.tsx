import { ReactElement, useRef, useEffect } from "react";
import { PixiEngine } from "../pixi/pixi";
import { nonNull } from "../../utils/utils";

export function Canvas(): ReactElement {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = nonNull(canvasRef.current);

    const pixi = new PixiEngine();
    pixi.mountApp(canvas);

    return () => {
      pixi.unmountApp(canvas);
    };
  }, [canvasRef]);

  return (
    <div>
      <div ref={canvasRef}></div>
    </div>
  );
}
