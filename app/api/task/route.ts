import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import prisma from "@/script";

export async function POST(req: Request, res: NextApiResponse) {
  try {
    console.log(req.body);
    const { id } = await req.json();

    if (!id) {
      throw new Error("Missing ID in request body");
    }

    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    console.log(task);
    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PATCH(req: Request, res: NextApiResponse) {
  try {
    console.log(req.body);
    const data = await req.json();

    if (!data.id) {
      throw new Error("Missing ID in request body");
    }

    const task = await prisma.task.findUnique({
      where: { id: Number(data.id) },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    const updatedTask = await prisma.task.update({
      where: { id: Number(data.id) },
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        deadline: data.deadline,
        priority: data.priority,
        createdAt: data.createdAt,
      },
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: Request, res: NextApiResponse) {
  try {
    console.log(req.body);
    const data = await req.json();

    if (!data.id) {
      throw new Error("Missing ID in request body");
    }

    const task = await prisma.task.findUnique({
      where: { id: Number(data.id) },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    const deletedTask = await prisma.task.delete({
      where: { id: Number(data.id) },
    });

    return NextResponse.json(deletedTask, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
