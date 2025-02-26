import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { CreateUserSchema } from "@repo/common/types";
// import dotenv from "dotenv";
// dotenv.config();

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const data = CreateUserSchema.safeParse(req.body);
  res.json({
    userId: "123",
  });
});

app.post("/signin", async (req, res) => {
  const userId = 123;
  const token = jwt.sign({ userId }, JWT_SECRET);
  res.json(token);
});

app.post("/room", async (req, res) => {});

app.listen(3001);
