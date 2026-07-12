import BackButton from "./components/BackButton";
import ContinueOverlay from "./components/ContinueOverlay";
import TextInput from "./screens/modals/TextInput";
import NarrationScreen from "./screens/NarrationScreen";

export default function App() {
    return (
        <ContinueOverlay>
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
                <BackButton />
            </div>
        </ContinueOverlay>
    );
}
