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

  ws.on("message", async function message(data) {
    let parsedData = JSON.parse(data as unknown as string);
    if (typeof data !== "string") {
      parsedData = JSON.parse(data.toString());
    } else {
      parsedData = JSON.parse(data);
    }

    if (parsedData.type === "join_room") {
      const user = users.find((x) => x.ws === ws);
      user?.rooms.push(parsedData.roomId as never);
    }

    if (parsedData.type === "leave_room") {
      const user = users.find((x) => x.ws === ws);
      if (!user) {
        return;
      }
      user.rooms = user?.rooms.filter((x) => x === parsedData.room) as [];
    }

    console.log("message received");
    console.log(JSON.stringify(parsedData, null, 2));

    if (parsedData.type === "chat") {
      const roomId = parsedData.roomId;
      const message = parsedData.message;

      const createdChat = await prismaClient.chat.create({
        data: {
          roomId: Number(roomId),
          message,
          userId,
        },
      });

      users.forEach((user) => {
        if (user.rooms.includes(roomId as never)) {
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

    // Improved erase handler
    if (parsedData.type === "erase") {
      const roomId = parsedData.roomId;
      const erasedShapes = JSON.parse(parsedData.message).shapes;

      try {
        // Find and delete chat records for the specific shapes
        const deletePromises = erasedShapes.map(async (shape: any) => {
          // Try to find chats that match the shape exactly
          const chatsToDelete = await prismaClient.chat.findMany({
            where: {
              roomId: Number(roomId),
              message: JSON.stringify({ shape }),
            },
          });

          // Delete found chats
          if (chatsToDelete.length > 0) {
            await prismaClient.chat.deleteMany({
              where: {
                id: {
                  in: chatsToDelete.map((chat) => chat.id),
                },
              },
            });
          }

          return chatsToDelete.length;
        });

        // Wait for all deletion operations to complete
        const deletionResults = await Promise.all(deletePromises);
        console.log("Erase deletion results:", deletionResults);

        // Broadcast the erase event to all users in the room
        users.forEach((user) => {
          if (user.rooms.includes(roomId as never)) {
            (user.ws as WebSocket).send(
              JSON.stringify({
                type: "erase",
                message: parsedData.message,
                roomId,
              })
            );
          }
        });
      } catch (error) {
        console.error("Error during erase:", error);
      }
    }
  });

  ws.on("close", () => {
    const index = users.findIndex((user) => user.ws === ws);
    if (index !== -1) {
      users.splice(index, 1);
    }
  });
});

export default wss;
