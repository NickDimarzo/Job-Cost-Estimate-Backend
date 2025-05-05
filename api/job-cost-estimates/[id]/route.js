import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// Added by: Nick
// Date: 2024-10-04
// This is a PATCH request that updates a job-cost-estimate
// Only updates the fields in the parent job-cost-estimate object, not the nested objects
export const PATCH = async (request, { params }) => {
  try {
    let { id } = params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const {jobCostEstimate} = body;

    if (!jobCostEstimate) {
      return NextResponse.json({ message: "Missing jobCostEstimate data" }, { status: 400 });
    }

    const {estimateNumber, ...updatedFields} = jobCostEstimate;

    const updatedJobCostEstimate = await prisma.jobCostEstimate.update({
      where: {
        estimateNumber: id,
      },
      data: updatedFields,
    });

    return NextResponse.json(updatedJobCostEstimate);
  } catch (err) {
    console.error("PATCH error:", err);
    return NextResponse.json(
      { message: "PATCH error", err: err.message },
      { status: 500 }
    );
  }
};

// Added by: Nick
// Date: 2024-10-08
// This is a GET request that retrieves a job-cost-estimate by ID, including its nested objects
export const GET = async (request, { params }) => {
  try {
    let { id } = params;

    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const jobCostEstimate = await prisma.jobCostEstimate.findUnique({
      where: {
        estimateNumber: id,
      },
      include: {
        tracking: {
          include: {
            projectContacts: true,
          }
        },
        pileBreakDown: {
          include: {
            piles: true,
          },
        },
        breakDownResults: true,
        projectResources: true,
        changeLog: true,
        chatLog: true,
      },
    });

    return NextResponse.json(jobCostEstimate);
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json(
      { message: "GET error", err: err.message },
      { status: 500 }
    );
  }
};

// Added by: Nick
// Date: 2024-11-22
// This is a DELETE request that deletes a job-cost-estimate by ID and all related nested objects
// DELETE request to remove a job cost estimate and all related data
export const DELETE = async (request) => {
  try {
    const url = new URL(request.url);
    const estimateNumber = url.pathname.split("/").pop();

    if (!estimateNumber) {
      return NextResponse.json({ message: "Missing estimate number" }, { status: 400 });
    }

    const deletedJobCostEstimate = await prisma.$transaction(async (prisma) => {

      await prisma.projectContacts.deleteMany({
        where: {
          tracking: {
            jobCostEstimateEstimateNumber: estimateNumber,
          },
        }
      });
      
      await prisma.tracking.deleteMany({
        where: {
          jobCostEstimateEstimateNumber: estimateNumber,
        },
      });

      await prisma.piles.deleteMany({
        where: {
          pileBreakDown: {
            jobCostEstimateEstimateNumber: estimateNumber,
          },
        },
      });

      await prisma.pileBreakDown.deleteMany({
        where: {
          jobCostEstimateEstimateNumber: estimateNumber,
        },
      });

      await prisma.breakDownResult.deleteMany({
        where: {
          jobCostEstimateEstimateNumber: estimateNumber,
        },
      });

      await prisma.projectResources.deleteMany({
        where: {
          jobCostEstimateEstimateNumber: estimateNumber,
        },
      });

      await prisma.changeLog.deleteMany({
        where: {
          jobCostEstimateEstimateNumber: estimateNumber,
        },
      });

      await prisma.chatLog.deleteMany({
        where: {
          jobCostEstimateEstimateNumber: estimateNumber,
        },
      });

      return prisma.jobCostEstimate.delete({
        where: {
          estimateNumber,
        },
      });
    });

    return NextResponse.json(
      { message: "Job cost estimate and related data deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json(
      { message: "Error deleting job cost estimate", error: err.message },
      { status: 500 }
    );
  }
};
