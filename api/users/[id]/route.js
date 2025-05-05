import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


// Added by: Nick
// Date: 2024-10-23
// This is a PATCH request that updates a user
export const PATCH = async (request) => {
  try {
    const body = await request.json();
    
    const { user } = body;
    
    if (!user) {
      return NextResponse.json({ message: "Missing user data" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (user.password && user.password !== existingUser.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    const { id, ...userData } = user;

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: userData,
    });

    return NextResponse.json(updatedUser);
  } catch (err) {
    console.error("PATCH error:", err);
    return NextResponse.json(
      { message: "PATCH error", err: err.message },
      { status: 500 }
    );
  }
};

// Added by: Nick
// Date: 2024-10-23
// This is a GET request that retrieves a user
export const GET = async (request, { params }) => {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "Missing user id" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json(
      { message: "GET error", err: err.message },
      { status: 500 }
    );
  }
};


// Added by: Nick
// Date: 2024-10-23
// This is a DELETE request that deletes a user
export const DELETE = async (request) => {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json({ message: "Missing user id" }, { status: 400 });
    }

    const deletedUser = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(deletedUser);
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json(
      { message: "DELETE error", err: err.message },
      { status: 500 }
    );
  }
};