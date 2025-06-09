import { NextResponse } from "next/server";
import { PrismaClient } from "../../generated/prisma"; // Correct import

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const data = await req.json();
    console.log("Received data:", data);
    const { email, name, surname } = data;

    if (!email || !name || !surname) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: { email, name, surname },
    });

    console.log("User created:", user);
    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving user:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Error saving user", error: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
