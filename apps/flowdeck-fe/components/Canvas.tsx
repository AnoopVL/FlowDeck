"use client";

import { WS_URL } from "@/config";
import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";

export default async function canvas({ roomId }: { roomId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    ws.onopen = () => {
      setSocket(ws);
    };
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;

      initDraw(canvas, roomId);
    }
  }, [canvasRef]);

  if (!socket) {
    return (
      <>
        <div>Connecting to server</div>
      </>
    );
  }

  return (
    <>
      <div>
        <canvas
          ref={canvasRef}
          width={window.innerWidth}
          height={window.innerHeight}></canvas>
      </div>
      <div className="bg-white text-neutral-950 p-2 m-2">Rectange</div>
      <div className="bg-white text-neutral-950 p-2 m-2">Circle</div>
    </>
  );
}
