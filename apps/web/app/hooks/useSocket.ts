import { useEffect, useState } from "react";
import { WS_URL } from "../config";

export function useSocket() {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const ws = new WebSocket(
      `${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkODZlMjBkMi1mNWZiLTQ5MjQtYTliYi03ODczMmZlNDM5OTkiLCJpYXQiOjE3NDA3NzEwOTR9.9CxuxoDbeDk1M2F0n30FoCRvvYKb__pWQLlJSkIXZ14`
    );
    ws.onopen = () => {
      setLoading(false);
      setSocket(ws);
    };
  }, []);

  return {
    socket,
    loading,
  };
}
