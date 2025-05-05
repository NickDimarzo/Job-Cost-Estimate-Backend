import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// Added by: Nick
// Date: 2024-10-08
// This is a POST request that creates a new project resource
// This will add the project resource the corresponding jobCostEstimate object
export const POST = async (request) => {
  try {
    const body = await request.json();
    
    const { projectResource } = body;
    
    if (!projectResource) {
      return NextResponse.json({ message: "Missing project resource data" }, { status: 400 });
    }

    const {
      jobCostEstimateEstimateNumber,
      ...resourceData 
    } = projectResource;

    const jobCostEstimate = await prisma.jobCostEstimate.findUnique({
      where: {
        estimateNumber: jobCostEstimateEstimateNumber,
      },
    });

    if (!jobCostEstimate) {
      return NextResponse.json({ message: "Invalid jobCostEstimateId" }, { status: 404 });
    }

    const createdProjectResource = await prisma.projectResources.create({
      data: {
        ...resourceData, 
        jobCostEstimateEstimateNumber, 
      },
    });

    return NextResponse.json(createdProjectResource);
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json(
      { message: "POST error", err: err.message },
      { status: 500 }
    );
  }
};
