import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// Added by: Nick  
// Date: 2024-10-18
// This is a PATCH request that updates a resource
export const PATCH = async (request) => {
  try {
    const body = await request.json();
    
    const { resource } = body;
    
    if (!resource) {
      return NextResponse.json({ message: "Missing resource data" }, { status: 400 });
    }

    const { unitNumber, ...resourceData } = resource;

    const updatedResource = await prisma.resources.update({
      where: {
        unitNumber,
      },
      data: resourceData,
    });

    return NextResponse.json(updatedResource);
  } catch (err) {
    console.error("PATCH error:", err);
    return NextResponse.json(
      { message: "PATCH error", err: err.message },
      { status: 500 }
    );
  }
};

// Added by: Nick
// Date: 2024-11-06
// This is a GET request that retrieves a resource
export const GET = async (request) => {
  try {
    const url = new URL(request.url);
    const stringUnitNumber = url.pathname.split("/").pop();
    const unitNumber = parseInt(stringUnitNumber);

    if (!unitNumber) {
      return NextResponse.json({ message: "Missing resource id" }, { status: 400 });
    }

    const resource = await prisma.resources.findUnique({
      where: {
        unitNumber,
      },
    });

    return NextResponse.json(resource);
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json(
      { message: "GET error", err: err.message },
      { status: 500 }
    );
  }
};

// Added by: Nick
// Date: 2024-11-06
// This is a DELETE request that deletes a resource
export const DELETE = async (request) => {
  try {

    const url = new URL(request.url);
    const stringUnitNumber = url.pathname.split("/").pop();
    const unitNumber = parseInt(stringUnitNumber);

    if (!unitNumber) {
      return NextResponse.json({ message: "Missing resource id" }, { status: 400 });
    }

    const deletedResource = await prisma.resources.delete({
      where: {
        unitNumber: unitNumber,
      },
    });

    return NextResponse.json(deletedResource);

  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json(
      { message: "DELETE error", err: err.message },
      { status: 500 }
    );
  }
};
