import { NextResponse } from "next/server";
import prisma from "@/script";

export async function GET(req: Request) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });
    if (!users) {
      return NextResponse.json({ message: "Users not found" }, { status: 404 });
    }
    console.log(users);
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
