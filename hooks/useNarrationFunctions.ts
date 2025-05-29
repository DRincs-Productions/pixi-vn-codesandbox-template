import { narration, stepHistory, StoredIndexedChoiceInterface } from "@drincs/pixi-vn";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { INTERFACE_DATA_USE_QUEY_KEY } from "./useQueryInterface";

export default function useNarrationFunctions() {
  const queryClient = useQueryClient();
  const gameProps = {};

  const goNext = useCallback(async () => {
    try {
      if (!narration.canGoNext) {
        return;
      }
      return narration
        .goNext(gameProps)
        .then(() => queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] }))
        .catch((e) => console.error(e));
    } catch (e) {
      console.error(e);
      return;
    }
  }, [gameProps, queryClient]);

  const goBack = useCallback(async () => {
    return stepHistory
      .goBack((_path) => {
        // TODO: navigate in the url path
        // READ THIS: https://pixi-vn.web.app/start/interface.html#navigate-switch-between-ui-screens
      })
      .then(() => queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] }))
      .catch((e) => console.error(e));
  }, [gameProps, queryClient]);

  const selectChoice = useCallback(
    async (item: StoredIndexedChoiceInterface) => {
      return narration
        .selectChoice(item, gameProps)
        .then(() => queryClient.invalidateQueries({ queryKey: [INTERFACE_DATA_USE_QUEY_KEY] }))
        .catch((e) => console.error(e));
    },
    [gameProps, queryClient]
  );

  return {
    goNext,
    goBack,
    selectChoice,
  };
}
