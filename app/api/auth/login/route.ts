import prisma from "@/script";
import { NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.error("JWT_SECRET is not defined in the environment variables");
    return NextResponse.json("Internal Server Error", { status: 500 });
  }

  const token = jwt.sign({ userId: user.id }, jwtSecret);
  console.log(token);
  return NextResponse.json({ token, user });
}
