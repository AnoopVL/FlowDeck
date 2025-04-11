import { NextResponse } from "next/server";
import { prismaClient } from "@repo/db/clients";

export async function POST(req: Request) {
  try {
    // IMPORTANT: Remove this in production
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const user = await prismaClient.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
        password: true, // This will return the hashed password for debugging
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        ...user,
        password: user.password.substring(0, 10) + "...", // Only show part of the hash
      },
    });
  } catch (error) {
    console.error("Debug error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
