import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// Added by: Nick
// Date: 2024-11-22
// This is a GET request that returns a pile by ID
export const GET = async (request, { params }) => {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const pile = await prisma.piles.findUnique({
      where: {
        pileId: id,
      },
    });

    if (!pile) {
      return NextResponse.json({ message: "Pile not found" }, { status: 404 });
    }

    return NextResponse.json(pile);
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json(
      { message: "GET error", err: err.message },
      { status: 500 }
    );
  }
};

// Added by: Nick
// Date: 2024-10-08
// This is a PATCH request that updates a pile
export const PATCH = async (request, { params }) => {
  try {
    let { id } = params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const { pile } = body
    
    if (!pile) {
      return NextResponse.json({ message: "Missing Pile data" }, { status: 400 });
    }

    const {pileId, ...updatedFields } = pile

    const updatedPile = await prisma.piles.update({
      where: {
        pileId: id,
      },
      data: updatedFields,
    });

    return NextResponse.json(updatedPile);
  } catch (err) {
    console.error("PATCH error:", err);
    return NextResponse.json(
      { message: "PATCH error", err: err.message },
      { status: 500 }
    );
  }
};

// Added by: Nick
// Date: 2024-11-28
// This is a DELETE request that deletes a pile
export const DELETE = async (request) => {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json({ message: "Missing pile id" }, { status: 400 });
    }

    const pile = await prisma.piles.delete({
      where: {
        pileId: id,
      },
    });

    return NextResponse.json(pile);
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json(
      { message: "DELETE error", err: err.message },
      { status: 500 }
    );
  }
};