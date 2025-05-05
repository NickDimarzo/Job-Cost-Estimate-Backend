import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// Added by: Nick
// Date: 2024-10-18
// This is a POST request that creates a new resource
export const POST = async (request) => {
  try {
    const body = await request.json();
    
    const { resource } = body;
    
    if (!resource) {
      return NextResponse.json({ message: "Missing resource data" }, { status: 400 });
    }

    const createdResource = await prisma.resources.create({
      data: resource,
    });

    return NextResponse.json(createdResource);
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json(
      { message: "POST error", err: err.message },
      { status: 500 }
    );
  }
};

// Added by: Nick
// Date: 2024-10-18
// This is a GET request that retrieves all resources
export const GET = async () => {
  try {
    const resources = await prisma.resources.findMany();

    return NextResponse.json(resources);
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json(
      { message: "GET error", err: err.message },
      { status: 500 }
    );
  }
};