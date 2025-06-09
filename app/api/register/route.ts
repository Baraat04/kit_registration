import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../generated/prisma";
import Cors from "cors";

const prisma = new PrismaClient();
const cors = Cors({
  methods: ["POST"],
  origin:
    process.env.NODE_ENV === "production"
      ? "https://kit-registration-vn2o.vercel.app/"
      : "http://localhost:3000",
});
function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}
export async function POST(req: Request) {
  await runMiddleware(req, {}, cors);
  console.log("MONGODB_URI:", process.env.MONGODB_URI);
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
