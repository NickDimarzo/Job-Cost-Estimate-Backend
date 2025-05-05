import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// Added by: Nick
// Date: 2024-10-08
// This is a PATCH request that updates a pile-break-down
export const PATCH = async (request, { params }) => {
  try {
    let { id } = params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const { pileBreakDown } = body;

    if (!pileBreakDown) {
      return NextResponse.json({ message: "Missing pileBreakDown data" }, { status: 400 });
    }

    const { pileBreakDownId, ...updatedFields } = pileBreakDown;

    const updatedPileBreakDown = await prisma.pileBreakDown.update({
      where: {
        pileBreakDownId: id,
      },
      data: updatedFields,
    });

    return NextResponse.json(updatedPileBreakDown);
  } catch (err) {
    console.error("PATCH error:", err);
    return NextResponse.json(
      { message: "PATCH error", err: err.message },
      { status: 500 }
    );
  }
};
