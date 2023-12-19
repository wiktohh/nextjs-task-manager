import prisma from "@/script";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

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
    const tasks = await prisma.task.findMany({
      where: { assignedTo: { id: decoded.userId } },
    });
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
