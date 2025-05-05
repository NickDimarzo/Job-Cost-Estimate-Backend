import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// Added by: Nick
// Date: 2024-10-04
// POST request to create a new job cost estimate
export const POST = async (request) => {
  try {
    const body = await request.json();
    const { jobCostEstimate } = body;

    if (!jobCostEstimate) {
      return NextResponse.json(
        { message: "Missing job cost estimate data" },
        { status: 400 }
      );
    }

    const {
      tracking,
      pileBreakDown,
      breakDownResults,
      projectResources,
      changeLog,
      chatLog,
      ...estimateData 
    } = jobCostEstimate;

    const createdJobCostEstimate = await prisma.jobCostEstimate.create({
      data: {
        ...estimateData,

        //Conditional creation for tracking
        tracking: tracking
          ? {
              create: {
                ...tracking,
                projectContacts: {
                  create: tracking.projectContacts.map((projectContact) => ({
                    ...projectContact 
                  }))
                }
              },
            }
          : undefined,

        // Conditional creation for pileBreakDown
        pileBreakDown: pileBreakDown
          ? {
              create: {
                ...pileBreakDown,
                piles: {
                  create: pileBreakDown.piles.map((pile) => ({
                    ...pile,
                  })),
                },
              },
            }
          : undefined,

        // Conditional creation for breakDownResults
        breakDownResults: breakDownResults
          ? {
              create: {
                ...breakDownResults,
              },
            }
          : undefined,

        // Conditional creation for projectResources
        projectResources: projectResources
          ? {
              create: projectResources.map((resource) => ({
                ...resource,
              })),
            }
          : undefined,

        // Conditional creation for changeLog
        changeLog: changeLog
          ? {
              create: changeLog.map((cl) => ({
                ...cl,
              })),
            }
          : undefined,

        // Conditional creation for chatLog
        chatLog: chatLog
          ? {
              create: chatLog.map((ch) => ({
                ...ch,
              })),
            }
          : undefined,
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

    return NextResponse.json(createdJobCostEstimate, { status: 201 });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json(
      { message: "POST error", err: err.message },
      { status: 500 }
    );
  }
};

// Added by: Nick
// Date: 2021-10-04
// GET request to retrieve all job cost estimates
export const GET = async (request) => {
  try {
    const jobCostEstimates = await prisma.jobCostEstimate.findMany({
      include: {
        changeLog: true,
      },
    });
    return NextResponse.json(jobCostEstimates, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "GET error", err }, { status: 500 });
  }
};
