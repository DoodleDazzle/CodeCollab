import { useState } from "react";

export function useToast() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000); // Auto-dismiss after 3 seconds
  };

  const Toast = () => (
    toastMessage && (
      <div style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "black",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
      }}>
        {toastMessage}
      </div>
    )
  );

  return { showToast, Toast };
}
