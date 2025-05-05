import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Added by: Nick
// Date: 2024-10-23
// This is a POST request that creates a new user
export const POST = async (request) => {
  try {
    const body = await request.json();
    
    const { user } = body;
    
    if (!user) {
      return NextResponse.json({ message: "Missing user data" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    const createdUser = await prisma.user.create({
      data: user,
    });

    return NextResponse.json(createdUser);
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json(
      { message: "POST error", err: err.message },
      { status: 500 }
    );
  }
};


// Added by: Nick
// Date: 2024-10-23
// This is a GET request that retrieves all users
export const GET = async (request) => {
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json(users);
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json(
      { message: "GET error", err: err.message },
      { status: 500 }
    );
  }
};