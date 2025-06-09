import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { email, name, surname } = data;

    if (!email || !name || !surname) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    const user = await prisma.user.create({
      data: {
        email,
        name,
        surname,
      },
    });

    return NextResponse.json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error saving user:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json({ message: "Error saving user" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
