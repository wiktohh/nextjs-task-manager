import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { firstName, lastName, email, password, secondPassword } =
    await req.json();
  if (password !== secondPassword) {
    return NextResponse.json(
      { message: "Passwords do not match" },
      { status: 400 }
    );
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });
  return NextResponse.json(user, { status: 200 });
}
