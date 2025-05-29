import { useState } from "react";
import useNarrationFunctions from "../hooks/useNarrationFunctions";
import { useQueryCanGoBack } from "../hooks/useQueryInterface";

export default function BackButton() {
  const { data: canGoBack = false } = useQueryCanGoBack();
  const [loading, setLoading] = useState(false);
  const { goBack } = useNarrationFunctions();

  if (!canGoBack) {
    return null;
  }

  return (
    <button
      onClick={() => {
        setLoading(true);
        goBack()
          .then(() => setLoading(false))
          .catch(() => setLoading(false));
      }}
      disabled={loading}
      style={{
        width: 40,
        height: 20,
        pointerEvents: "auto",
      }}
    >
      Back
    </button>
  );
}
