import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const admin = await prisma.post.findMany();
    return NextResponse.json(admin); // Return response here
  } catch (error) {
    console.error("Error fetching", error);
    return NextResponse.json(
      { error: "Failed to fetch" },
      { status: 500 }
    );
  }
}