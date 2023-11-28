import { NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import prisma from "@/script";

interface JwtPayload {
  userId: number;
}

export async function GET(req: Request) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ message: "No token provided" }, { status: 401 });
  }
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error("JWT_SECRET is not defined in the environment variables");
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
  try {
    const decoded = (await jwt.verify(token, jwtSecret)) as JwtPayload;
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
