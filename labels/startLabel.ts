import { narration, newLabel } from "@drincs/pixi-vn";

export const startLabel = newLabel("start_label", [
  () => (narration.dialogue = "Hello"),
  (props, { labelId }) => narration.jumpLabel(labelId, props),
]);
