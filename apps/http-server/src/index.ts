import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import {
  CreateRoomSchema,
  CreateUserSchema,
  SigninSchema,
} from "@repo/common/types";
import { prismaClient } from "@repo/db/clients";
import bcrypt from "bcrypt";
import { middleware } from "./middleware";
// import dotenv from "dotenv";
// dotenv.config();

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }
  try {
    const hashedPassword = await bcrypt.hash(parsedData.data.password, 12);
    const user = await prismaClient.user.create({
      data: {
        email: parsedData.data.email,
        password: hashedPassword,
        username: parsedData.data.username,
      },
    });
    res.json({
      userId: user.id,
    });
  } catch (error) {
    res.status(411).json({
      message: "User already exists",
    });
  }
});

app.post("/signin", async (req, res) => {
  const parsedData = SigninSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }
  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.email,
    },
  });
  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }
  const passwordMatch = await bcrypt.compare(
    parsedData.data.password,
    user.password
  );
  if (!passwordMatch) {
    res.status(401).json({
      message: "Incorrect password",
    });
    return;
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  res.json(token);
});

app.post("/room", middleware, async (req, res) => {
  const parsedData = CreateRoomSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }
  // @ts-ignore: TODO: Fix this
  const userId = req.userId;
  try {
    const room = await prismaClient.room.create({
      data: {
        slug: parsedData.data.name,
        adminId: userId,
      },
    });

    res.json({
      roomId: room.id,
    });
  } catch (e) {
    res.status(411).json({
      message: "Room already exists with this name",
    });
  }
});
app.listen(3001);
