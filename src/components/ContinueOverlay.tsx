import { type ReactNode, useState } from "react";
import useNarrationFunctions from "../hooks/useNarrationFunctions";
import { useQueryCanGoNext } from "../hooks/useQueryInterface";

export default function ContinueOverlay({ children }: { children: ReactNode }) {
    const { data: canGoNext = false } = useQueryCanGoNext();
    const [loading, setLoading] = useState(false);
    const { goNext } = useNarrationFunctions();

    return (
        <div
            onClick={() => {
                if (!canGoNext || loading) {
                    return;
                }
                setLoading(true);
                goNext()
                    .then(() => setLoading(false))
                    .catch(() => setLoading(false));
            }}
            style={{
                height: "100%",
                width: "100%",
                pointerEvents: "auto",
            }}
        >
            {children}
        </div>
    );
}
