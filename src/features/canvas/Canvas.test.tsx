import { Canvas } from "./Canvas";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { render } from "@testing-library/react";
import { PixiEngine } from "../pixi/pixi";

describe("Canvas", () => {
  it("should render", () => {
    rtlRender();
  });
  
  it("should instantiate pixi", () => {
    const spy = jasmine.createSpy();
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
