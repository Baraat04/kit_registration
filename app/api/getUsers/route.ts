import { NextResponse } from "next/server";
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
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Error fetching users" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
