import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// Added by: Nick
// Date: 2024-10-08
// This is a POST request that creates a new pile
// This will add the pile to the corresponding pileBreakDown object
export const POST = async (request) => {
  try {
    const body = await request.json();

    const { pile } = body;

    if (!pile) {
      return NextResponse.json(
        { message: "Missing pile data" },
        { status: 400 }
      );
    }

    const { pileBreakDownId, ...pileData } = pile;

    const pileBreakDown = await prisma.pileBreakDown.findUnique({
      where: {
        pileBreakDownId: pileBreakDownId,
      },
    });

    if (!pileBreakDown) {
      return NextResponse.json(
        { message: "Invalid pileBreakDownId" },
        { status: 404 }
      );
    }

    const createdPile = await prisma.piles.create({
      data: {
        ...pileData,
        pileBreakDownId,
      },
    });

    return NextResponse.json(createdPile);
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json(
      { message: "POST error", error: err.message },
      { status: 500 }
    );
  }
};
