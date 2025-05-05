import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// Added by: Nick
// Date: 2024-11-22
// This is a GET request that retrieves a project resource by ID
export const GET = async (request, { params }) => {
  try {
    let { id } = params;

    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });

    }

    const projectResource = await prisma.projectResources.findUnique({
      where: {
        resourceId: id,
      },
    });

    if (!projectResource) {
      return NextResponse.json({ message: "Project Resource not found" }, { status: 404 });
    }

    return NextResponse.json(projectResource);
  }
  catch (err) {
    console.error("GET error:", err);
    return NextResponse.json(
      { message: "GET error", err: err.message },
      { status: 500 }
    );
  }
}

    
// Added by: Nick
// Date: 2024-10-17
// This is a PATCH request that updates a project resource
export const PATCH = async (request, { params }) => {
  try {
    let { id } = params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const { projectResource } = body
    
    if (!projectResource) {
      return NextResponse.json({ message: "Missing Project Resource data" }, { status: 400 });
    }

    const { resourceId, ...updatedFields } = projectResource

    const updatedProjectResource = await prisma.projectResources.update({
      where: {
        resourceId: id,
      },
      data: updatedFields,
    });

    return NextResponse.json(updatedProjectResource);
  } catch (err) {
    console.error("PATCH error:", err);
    return NextResponse.json(
      { message: "PATCH error", err: err.message },
      { status: 500 }
    );
  }
};

// Added by: Nick
// Date: 2024-11-17
// This is a DELETE request that deletes a project resource
export const DELETE = async (request) => {
  try {
    const url = new URL(request.url);
    const resourceId = url.pathname.split("/").pop();

    if (!resourceId) {
      return NextResponse.json({ message: "Invalid resourceId" }, { status: 400 });
    }

    const projectResource = await prisma.projectResources.delete({
      where: {
        resourceId: resourceId,
      },
    });

    return NextResponse.json(projectResource);
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json(
      { message: "DELETE error", err: err.message },
      { status: 500 }
    );
  }
};