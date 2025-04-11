import { NextResponse } from "next/server";
import { prismaClient } from "@repo/db/clients";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = body;
    if (!email || !password || !username) {
      return NextResponse.json({ error: "Missing Fields" }, { status: 400 });
    }
    const existingUser = await prismaClient.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "email already exisits" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prismaClient.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });
    return NextResponse.json(
      { message: "User created", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Sign-up error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
