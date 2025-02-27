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
    await prismaClient.user.create({
      data: {
        email: parsedData.data.email,
        password: hashedPassword,
        username: parsedData.data.username,
      },
    });
    res.json({
      userId: "123",
    });
  } catch (error) {
    res.status(411).json({
      message: "User already exisits",
    });
  }
});

app.post("/signin", async (req, res) => {
  const data = SigninSchema.safeParse(req.body);
  if (!data.success) {
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }
  const userId = 123;
  const token = jwt.sign({ userId }, JWT_SECRET);
  res.json(token);
});

app.post("/room", async (req, res) => {
  const data = CreateRoomSchema.safeParse(req.body);
  if (!data.success) {
    res.json({
      message: "Incorrect inputs",
    });
    return;
  }
  res.json({
    roomId: 21,
  });
});

app.listen(3001);
