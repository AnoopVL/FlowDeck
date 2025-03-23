import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import {
  Circle,
  Pencil,
  RectangleHorizontalIcon,
  Eraser,
  ArrowRight,
  LetterText,
} from "lucide-react";
import { Game } from "@/draw/Game";

export type Tool = "circle" | "rect" | "pencil" | "eraser" | "arrow" | "text";

export function Canvas({
  roomId,
  socket,
}: {
  socket: WebSocket;
  roomId: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game>();
  const [selectedTool, setSelectedTool] = useState<Tool>("circle");

  useEffect(() => {
    game?.setTool(selectedTool);
  }, [selectedTool, game]);

  useEffect(() => {
    if (canvasRef.current) {
      const g = new Game(canvasRef.current, roomId, socket);
      setGame(g);

      return () => {
        g.destroy();
      };
    }
  }, [canvasRef]);

  return (
    <div
      style={{
        height: "100vh",
        overflow: "hidden",
      }}>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}></canvas>
      <Topbar setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
    </div>
  );
}

function Topbar({
  selectedTool,
  setSelectedTool,
}: {
  selectedTool: Tool;
  setSelectedTool: (s: Tool) => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 10,
        left: 10,
      }}>
      <div className="flex gap-t">
        <IconButton
          onClick={() => {
            setSelectedTool("rect");
          }}
          activated={selectedTool === "rect"}
          icon={<RectangleHorizontalIcon />}></IconButton>
        <IconButton
          onClick={() => {
            setSelectedTool("circle");
          }}
          activated={selectedTool === "circle"}
          icon={<Circle />}></IconButton>
        <IconButton
          onClick={() => {
            setSelectedTool("eraser");
          }}
          activated={selectedTool === "eraser"}
          icon={<Eraser />}></IconButton>
        <IconButton
          onClick={() => {
            setSelectedTool("arrow");
          }}
          activated={selectedTool === "arrow"}
          icon={<ArrowRight />}></IconButton>
        <IconButton
          onClick={() => {
            setSelectedTool("text");
          }}
          activated={selectedTool === "text"}
          icon={<LetterText />}></IconButton>
      </div>
    </div>
  );
}

// import { initDraw } from "@/draw";
// import { useEffect, useRef, useState } from "react";
// import { IconButton } from "./IconButton";
// import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";

// export type Tool = "circle" | "rect" | "pencil";

// export function Canvas({
//   roomId,
//   socket,
// }: {
//   roomId: string;
//   socket: WebSocket;
// }) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [selectedTool, setSelectedTool] = useState<Tool>();

//   useEffect(() => {
//     if (canvasRef.current) {
//       const canvas = canvasRef.current;
//       const context = canvas.getContext("2d");
//       if (context) {
//         const { width, height } = canvas.getBoundingClientRect();
//         canvas.width = width;
//         canvas.height = height;
//         initDraw(canvas, roomId, socket);
//       }
//     }
//   }, [canvasRef]);

//   return (
//     <>
//       <div className="relative h-screen">
//         <canvas ref={canvasRef} className="w-full h-full"></canvas>
//         <div className="absolute bottom-0 left-0 w-full flex justify-center items-center">
//           <button
//             className="absolute bottom-10 left-10 bg-blue-500 text-white px-4 py-2 rounded"
//             style={{ zIndex: 1 }}
//             onClick={setShape()}>
//             Rectangle
//           </button>
//           <button
//             className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded"
//             style={{ zIndex: 1 }}>
//             Circle
//           </button>
//           <button
//             className="absolute bottom-10 right-10 bg-blue-500 text-white px-4 py-2 rounded"
//             style={{ zIndex: 1 }}>
//             Pencil
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// function Topbar({
//   selectedTool,
//   setSelectedTool,
// }: {
//   selectedTool: Tool;
//   setSelectedTool: (s: Tool) => void;
// }) {
//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 10,
//         left: 10,
//       }}>
//       <div className="flex gap-t">
//         <IconButton
//           onClick={() => {
//             setSelectedTool("pencil");
//           }}
//           activated={selectedTool === "pencil"}
//           icon={<Pencil />}
//         />
//         <IconButton
//           onClick={() => {
//             setSelectedTool("rect");
//           }}
//           activated={selectedTool === "rect"}
//           icon={<RectangleHorizontalIcon />}></IconButton>
//         <IconButton
//           onClick={() => {
//             setSelectedTool("circle");
//           }}
//           activated={selectedTool === "circle"}
//           icon={<Circle />}></IconButton>
//       </div>
//     </div>
//   );
// }
