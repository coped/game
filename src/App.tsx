import { ReactElement } from "react";
import { Page } from "features/page/Page";
import { Canvas } from "features/canvas/Canvas";

function App(): ReactElement {
  return (
    <Page>
      <Canvas />
    </Page>
  );
}

export default App;
