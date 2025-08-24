import { CharacterBaseModel, RegisteredCharacters } from "@drincs/pixi-vn";
import { onInkHashtagScript, onReplaceTextAfterTranslation } from "@drincs/pixi-vn-ink";

export function initializeInk() {
  onInkHashtagScript((script, props, convertListStringToObj) => {
    if (script[0] === "rename" && script.length === 3) {
      let character = RegisteredCharacters.get<CharacterBaseModel>(script[1]);
      if (character) {
        character.name = script[2];
      }
      return true;
    }
    return false;
  });
  onReplaceTextAfterTranslation((key) => {
    let character = RegisteredCharacters.get<CharacterBaseModel>(key);
    if (character) {
      return character.name;
    }

    // if return undefined, the system will not replace the character id
    return undefined;
  });
}
