import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// Added by: Nick
// Date: 2024-11-22
// This is a GET request that retrieves all piles with the same pileBreakDownId
export const GET = async (request) => {
  try {
    
    const url = new URL(request.url);
    const pileBreakDownId = url.pathname.split("/").pop();

    if (!pileBreakDownId) {
      return NextResponse.json({ message: "Invalid pileBreakDownId" }, { status: 400 });
    }

    const piles = await prisma.piles.findMany({
      where: {
        pileBreakDownId: pileBreakDownId,
      },
    });

    if (!piles) {
      return NextResponse.json({ message: "Piles not found" }, { status: 404 });
    }

    return NextResponse.json(piles);
  }
  catch (err) {
    console.error("GET error:", err);
    return NextResponse.json(
      { message: "GET error", err: err.message },
      { status: 500 }
    );
  }
}