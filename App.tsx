import { useEffect } from "react";
import BackButton from "./components/BackButton";
import NextButton from "./components/NextButton";
import TextInput from "./screens/modals/TextInput";
import NarrationScreen from "./screens/NarrationScreen";
import { initializeInk } from "./utils/ink-utility";

export default function App() {
  useEffect(() => {
    initializeInk();
  }, []);
  return (
    <div>
      <NarrationScreen />
      <TextInput />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: "70%",
          width: 40,
        }}
      >
        <NextButton />
        <BackButton />
      </div>
    </div>
  );
}
