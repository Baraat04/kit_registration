import { NextResponse } from "next/server";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export async function DELETE(req: Request, params) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        {
          message: "User ID is required",
        },
        {
          status: 400,
        }
      );
    }
    const deletedUser = await prisma.user.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(
      { message: "User deleted successfully", deletedUser },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.code === "P2025") {
      // P2025: Record to delete does not exist
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Error deleting user", error: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
