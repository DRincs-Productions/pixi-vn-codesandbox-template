import { canvas, MoveTicker, newLabel, showImageContainer } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  async () => {
    let james = await showImageContainer("james", ["m01-body", "m01-eyes", "m01-mouth"], {
      xAlign: 0.5,
      yAlign: 1,
    });
  },
  () => {
    canvas.removeAllTickers();
    let tickerId = canvas.addTicker("james", new MoveTicker({ destination: { x: 0, y: 1, type: "align" } }));
  },
]);
