import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/clients";
const wss = new WebSocketServer({ port: 8080 });

interface User {
  ws: WebSocket | unknown;
  rooms: [];
  userId: string;
}

const users: User[] = [];

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded == "string") {
      return null;
    }
    if (!decoded || !decoded.userId) {
      return null;
    }
    return decoded.userId;
  } catch (error) {
    return null;
  }
}

wss.on("connection", function connection(ws, request) {
  const url = request.url;
  if (!url) {
    request;
  }
  const queryParams = new URLSearchParams(url?.split("?")[1]);
  const token = queryParams.get("token") || "";
  const userId = checkUser(token);
  if (userId == null) {
    ws.close();
    return null;
  }

  users.push({
    ws,
    rooms: [],
    userId,
  });

  ws.on("message", function message(data) {
    const parsedData = JSON.parse(data as unknown as string);
    if (parsedData.type === "join_room") {
      const user = users.find((x) => x.ws === ws);
      if (user) {
        user.rooms.push(parsedData.roomId as never);
      }
    }

    // if (parsedData.type === "leave_room") {
    //   const user = users.find((x) => x.ws === ws);
    //   if (user) {
    //     user.rooms = user.rooms.filter((x) => x !== parsedData.room) as [];
    //   }
    // }
    if (parsedData.type === "leave_room") {
      const user = users.find((x) => x.ws === ws);
      if (!user) {
        return;
      }
      user.rooms = user?.rooms.filter((x) => x === parsedData.room) as [];
    }

    if (parsedData.type === "chat") {
      const roomId = parsedData.roomId;
      const message = parsedData.message;

      users.forEach((user) => {
        if ((user.rooms as string[]).includes(roomId)) {
          (user.ws as WebSocket).send(
            JSON.stringify({
              type: "chat",
              message: message,
              roomId,
            })
          );
        }
      });
    }
  });
});
