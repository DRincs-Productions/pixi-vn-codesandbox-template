import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { useQueryCanGoBack, useQueryCanGoNext, useQueryDialogue } from "../hooks/useQueryInterface";
import ChoiceMenu from "./ChoiceMenu";

export default function NarrationScreen() {
  const { data: { text, character } = {} } = useQueryDialogue();
  const { data: canGoNext = false } = useQueryCanGoNext();
  const { data: canGoBack = false } = useQueryCanGoBack();

  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <div style={{ flex: 1, minHeight: 0 }}>
        {/* READ THIS: https://pixi-vn.web.app/start/choices.html#how-to-create-the-choice-menu-ui-screen */}
        <ChoiceMenu />
      </div>
      {text && (
        <div
          style={{
            flex: "0 0 auto",
            height: "30%",
            minHeight: 0,
            pointerEvents: "auto",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {character && character.name && <b>{`${character?.name || ""} ${character?.surname || ""}`}</b>}
          <div
            style={{
              marginRight: canGoNext || canGoBack ? "40px" : undefined,
              display: "flex",
              flexDirection: "row",
              height: "100%",
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            {character?.icon && (
              <img
                src={character?.icon}
                loading='lazy'
                alt=''
                style={{
                  maxWidth: "30%",
                  height: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            )}
            <div style={{ flex: 1, minHeight: 0, overflow: "auto", height: "100%" }}>
              <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {text}
              </Markdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
