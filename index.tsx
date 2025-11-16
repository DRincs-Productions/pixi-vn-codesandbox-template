import { Assets, Container, Game, canvas, narration } from "@drincs/pixi-vn";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BACKGROUND_COLOR, HEIGHT, WIDTH } from "./constants";
import { INTERFACE_DATA_USE_QUEY_KEY } from "./hooks/useQueryInterface";
import "./labels";
import { startLabel } from "./labels/startLabel";
import "./styles.css";
import { defineAssets } from "./utils/assets-utility";

// Canvas setup with PIXI
const body = document.body;
if (!body) {
  throw new Error("body element not found");
}

Game.init(body, {
  height: HEIGHT,
  width: WIDTH,
  backgroundColor: BACKGROUND_COLOR,
}).then(() => {
  // Pixi.JS UI Layer
  canvas.addLayer("ui", new Container());

  // React setup with ReactDOM
  const root = document.getElementById("root");
  if (!root) {
    throw new Error("root element not found");
  }

  const htmlLayout = canvas.addHtmlLayer("ui", root);
  if (!htmlLayout) {
    throw new Error("htmlLayout not found");
  }
  const reactRoot = createRoot(htmlLayout);
  const queryClient = new QueryClient();

  Game.onEnd(async () => {
    Game.clear();
    await narration.jumpLabel(startLabel, {});
  });
  Game.onLoadingLabel(async (_stepId, { id }) => await Assets.backgroundLoadBundle(id));

  reactRoot.render(
    <div
      style={{
        color: "white",
        position: "absolute",
        bottom: 0,
        left: 0,
      }}
    >
      Loading...
    </div>
  );

  defineAssets().then(() => {
    Game.clear();
    narration.callLabel(startLabel, {}).then(() => {
      reactRoot.render(
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      );
      queryClient.invalidateQueries({
        queryKey: [INTERFACE_DATA_USE_QUEY_KEY],
      });
    });
  });
});
