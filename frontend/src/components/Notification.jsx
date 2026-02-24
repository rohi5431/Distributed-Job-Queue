import { useEffect, useState } from "react";

export default function Notification() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handler = (e) => {
      setMessage(e.detail);

      setTimeout(() => setMessage(""), 3000);
    };

    window.addEventListener("notify", handler);

    return () => window.removeEventListener("notify", handler);
  }, []);

  if (!message) return null;

  return <div className="toast">{message}</div>;
}