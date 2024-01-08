import prisma from "@/script";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function POST(req: Request) {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  const { title, description, assignedTo, deadline, priority } =
    await req.json();

  if (!token) {
    return NextResponse.json({ message: "No token provided" }, { status: 401 });
  }

  const decoded = jwt.decode(token) as JwtPayload;
  const createdById = decoded?.userId;

  const task = await prisma.task.create({
    data: {
      title,
      description,
      status: "TO_DO",
      createdBy: {
        connect: {
          id: createdById,
        },
      },
      assignedTo: {
        connect: {
          id: assignedTo,
        },
      },
      deadline,
      priority,
    },
  });

  return NextResponse.json(task, { status: 200 });
}

export async function GET(req: Request) {
  const tasks = await prisma.task.findMany({
    include: {
      createdBy: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      assignedTo: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });
  console.log(tasks);
  return NextResponse.json(tasks, { status: 200 });
}
