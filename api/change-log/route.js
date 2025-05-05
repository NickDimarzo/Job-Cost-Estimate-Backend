import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// Added by: Nick
// Date: 2024-11-04
// This is a POST request that creates a new change log
// This will add the change log to the corresponding JobCostEstimate object
export const POST = async (request) => {
  try {
    const body = await request.json();

    const { changeLog } = body;

    if (!changeLog) {
      return NextResponse.json(
        { message: "Missing change log data" },
        { status: 400 }
      );
    }

    const { jobCostEstimateEstimateNumber, ...changeLogData } = changeLog;

    const jobCostEstimate = await prisma.jobCostEstimate.findUnique({
      where: {
        estimateNumber: jobCostEstimateEstimateNumber,
      },
    });

    if (!jobCostEstimate) {
      return NextResponse.json(
        { message: "Invalid jobCostEstimateId" },
        { status: 404 }
      );
    }

    const createdChangeLog = await prisma.changeLog.create({
      data: {
        ...changeLogData,
        jobCostEstimateEstimateNumber,
      },
    });

    return NextResponse.json(createdChangeLog);
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json(
      { message: "POST error", error: err.message },
      { status: 500 }
    );
  }
};
