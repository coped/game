import { Canvas } from "./Canvas";
import { Provider } from "react-redux";
import { store } from "app/store";
import { render } from "@testing-library/react";
import { PixiEngine } from "features/pixi/pixi";

describe("Canvas", () => {
  it.skip("should render", () => {
    rtlRender();
  });
  
  it.skip("should instantiate pixi", () => {
    const spy = jest.fn();
    jest.spyOn(PixiEngine, "prototype").mockReturnValue(spy);
    spyOn(PixiEngine, 'prototype').and.returnValue({ constructor: spy });

    rtlRender();

    expect(spy).toHaveBeenCalled();
  })

  const rtlRender = () =>
    render(
      <Provider store={store}>
        <Canvas />
      </Provider>
    );
});
