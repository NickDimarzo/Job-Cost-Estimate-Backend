import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// Added by: Nick
// Date: 2024-10-10
// This is a PATCH request that updates a breakDownResult
export const PATCH = async (request, { params }) => {
  try {
    let { id } = params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const { breakDownResult } = body;

    if (!breakDownResult) {
      return NextResponse.json({ message: "Missing breakDownResult data" }, { status: 400 });
    }

    const { breakDownResultsId, ...updatedFields } = breakDownResult;

    const updatedBreakDownResult = await prisma.breakDownResult.update({
      where: {
        breakDownResultsId: id,
      },
      data: updatedFields,
    });

    return NextResponse.json(updatedBreakDownResult);
  } catch (err) {
    console.error("PATCH error:", err);
    return NextResponse.json(
      { message: "PATCH error", err: err.message },
      { status: 500 }
    );
  }
};

