import { z } from "zod";

export const CreateUserSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(6).max(30),
  email: z.string().email(),
});

export const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(30),
});

export const CreateRoomSchema = z.object({
  name: z.string().min(3).max(30),
});
