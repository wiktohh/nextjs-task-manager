import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { firstName, lastName, email, password, secondPassword } =
    await req.json();
  if (password !== secondPassword) {
    return NextResponse.json({ message: "Passwords do not match" });
  }
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password,
    },
  });
  return NextResponse.json(user);
}
