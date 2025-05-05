import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// Added by: Nick
// Date: 2024-11-22
// This is a GET request that retrieves all resources with the same jobCostEstimateEstimateNumber
export const GET = async (request) => {
  try {
    
    const url = new URL(request.url);
    const jobCostEstimateEstimateNumber = url.pathname.split("/").pop();

    if (!jobCostEstimateEstimateNumber) {
      return NextResponse.json({ message: "Invalid jobCostEstimateEstimateNumber" }, { status: 400 });
    }

    const resources = await prisma.projectResources.findMany({
      where: {
        jobCostEstimateEstimateNumber: jobCostEstimateEstimateNumber,
      },
    });

    if (!resources) {
      return NextResponse.json({ message: "Resources not found" }, { status: 404 });
    }

    return NextResponse.json(resources);
  }
  catch (err) {
    console.error("GET error:", err);
    return NextResponse.json(
      { message: "GET error", err: err.message },
      { status: 500 }
    );
  }
}