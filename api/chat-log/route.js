import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// Added by: Nick
// Date: 2024-10-21
// This is a POST request that creates a new chat log
// This will add the chat log to the corresponding JobCostEstimate object
export const POST = async (request) => {
  try {
    const body = await request.json();

    const { chatLog } = body;

    if (!chatLog) {
      return NextResponse.json(
        { message: "Missing chat log data" },
        { status: 400 }
      );
    }

    const { jobCostEstimateEstimateNumber, ...chatLogData } = chatLog;

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

    const createdChatLog = await prisma.chatLog.create({
      data: {
        ...chatLogData,
        jobCostEstimateEstimateNumber,
      },
    });

    return NextResponse.json(createdChatLog);
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json(
      { message: "POST error", error: err.message },
      { status: 500 }
    );
  }
};
