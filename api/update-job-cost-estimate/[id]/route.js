import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// Added by: Nick
// Date: 2025-01-20
// This is a PATCH request that updates a job-cost-estimate
// This updates all fields in the job-cost-estimate object, including the nested objects
// Will check piles and project resources for id's and upsert if no id is found
export const PATCH = async (request, { params }) => {
  try {
    const { id } = params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const { jobCostEstimate } = body;

    if (!jobCostEstimate) {
      return NextResponse.json(
        { message: "Missing jobCostEstimate data" },
        { status: 400 }
      );
    }

    const {
      estimateNumber,
      tracking,
      pileBreakDown,
      breakDownResults,
      projectResources,
      changeLog,
      chatLog,
      ...updatedFields
    } = jobCostEstimate;

    const updatedJobCostEstimate = await prisma.jobCostEstimate.update({
      where: {
        estimateNumber,
      },
      data: {
        ...updatedFields,

        tracking: tracking
          ? {
              update: {
                jobName: tracking.jobName,
                closingDate: tracking.closingDate,
                finalPrice: tracking.finalPrice,
                gc: tracking.gc,
                chance: tracking.chance,
                projectType: tracking.projectType,
                comments: tracking.comments,
                projectContacts: {
                  upsert: tracking.projectContacts.map((contact) => ({
                    where: {
                      projectContactId: contact.contactId || new ObjectId().toString(),
                    },
                    update: {
                      gc: contact.gc,
                      name: contact.name,
                      email: contact.email,
                      phone: contact.phone,
                    },
                    create: {
                      projectContactId: contact.contactId || new ObjectId().toString(),
                      gc: contact.gc,
                      name: contact.name,
                      email: contact.email,
                      phone: contact.phone,
                    },
                  })),
                },
              },
            }
          : undefined,

        pileBreakDown: pileBreakDown
          ? {
              update: {
                concreteLossFactor: pileBreakDown.concreteLossFactor,
                standardHrsPerWorkDay: pileBreakDown.standardHrsPerWorkDay,
                piles: {
                  upsert: pileBreakDown.piles.map((pile) => ({
                    where: { pileId: pile.pileId || new ObjectId().toString() },
                    update: {
                      drillRig: pile.drillRig,
                      pileDimensionsType: pile.pileDimensionsType,
                      pileDimensionsQty: pile.pileDimensionsQty,
                      pileDimensionsShaft: pile.pileDimensionsShaft,
                      pileDimensionsBell: pile.pileDimensionsBell,
                      pileDimensionsDepthMeter: pile.pileDimensionsDepthMeter,
                      concreteM3PerPile: pile.concreteM3PerPile,
                      concreteM3PerType: pile.concreteM3PerType,
                      drillingMinPerHole: pile.drillingMinPerHole,
                      drillingHoursPerType: pile.drillingHoursPerType,
                      drillingHolesPerDay: pile.drillingHolesPerDay,
                      reinforcementSteelVerticalsQty:
                        pile.reinforcementSteelVerticalsQty,
                      reinforcementSteelVerticalsSize:
                        pile.reinforcementSteelVerticalsSize,
                      reinforcementSteelVerticalsLength:
                        pile.reinforcementSteelVerticalsLength,
                      reinforcementSteelStirrupsOverl:
                        pile.reinforcementSteelStirrupsOverl,
                      reinforcementSteelStirrupsTop:
                        pile.reinforcementSteelStirrupsTop,
                      reinforcementSteelStirrupsTopCC:
                        pile.reinforcementSteelStirrupsTopCC,
                      reinforcementSteelStirrupsBotCC:
                        pile.reinforcementSteelStirrupsBotCC,
                      reinforcementSteelStirrupsQty:
                        pile.reinforcementSteelStirrupsQty,
                      reinforcementSteelStirrupsSize:
                        pile.reinforcementSteelStirrupsSize,
                      reinforcementSteelDowellsQty:
                        pile.reinforcementSteelDowellsQty,
                      reinforcementSteelDowellsSize:
                        pile.reinforcementSteelDowellsSize,
                      reinforcementSteelDowellsLength:
                        pile.reinforcementSteelDowellsLength,
                      reinforcementSteelWeightPerPile:
                        pile.reinforcementSteelWeightPerPile,
                      reinforcementSteelWeightPerType:
                        pile.reinforcementSteelWeightPerType,
                      reinforcementSteelRebarVolumePercent:
                        pile.reinforcementSteelRebarVolumePercent,
                      performanceRate: pile.performanceRate,
                    },
                    create: {
                      pileId: pile.pileId || new ObjectId().toString(),
                      drillRig: pile.drillRig,
                      pileDimensionsType: pile.pileDimensionsType,
                      pileDimensionsQty: pile.pileDimensionsQty,
                      pileDimensionsShaft: pile.pileDimensionsShaft,
                      pileDimensionsBell: pile.pileDimensionsBell,
                      pileDimensionsDepthMeter: pile.pileDimensionsDepthMeter,
                      concreteM3PerPile: pile.concreteM3PerPile,
                      concreteM3PerType: pile.concreteM3PerType,
                      drillingMinPerHole: pile.drillingMinPerHole,
                      drillingHoursPerType: pile.drillingHoursPerType,
                      drillingHolesPerDay: pile.drillingHolesPerDay,
                      reinforcementSteelVerticalsQty:
                        pile.reinforcementSteelVerticalsQty,
                      reinforcementSteelVerticalsSize:
                        pile.reinforcementSteelVerticalsSize,
                      reinforcementSteelVerticalsLength:
                        pile.reinforcementSteelVerticalsLength,
                      reinforcementSteelStirrupsOverl:
                        pile.reinforcementSteelStirrupsOverl,
                      reinforcementSteelStirrupsTop:
                        pile.reinforcementSteelStirrupsTop,
                      reinforcementSteelStirrupsTopCC:
                        pile.reinforcementSteelStirrupsTopCC,
                      reinforcementSteelStirrupsBotCC:
                        pile.reinforcementSteelStirrupsBotCC,
                      reinforcementSteelStirrupsQty:
                        pile.reinforcementSteelStirrupsQty,
                      reinforcementSteelStirrupsSize:
                        pile.reinforcementSteelStirrupsSize,
                      reinforcementSteelDowellsQty:
                        pile.reinforcementSteelDowellsQty,
                      reinforcementSteelDowellsSize:
                        pile.reinforcementSteelDowellsSize,
                      reinforcementSteelDowellsLength:
                        pile.reinforcementSteelDowellsLength,
                      reinforcementSteelWeightPerPile:
                        pile.reinforcementSteelWeightPerPile,
                      reinforcementSteelWeightPerType:
                        pile.reinforcementSteelWeightPerType,
                      reinforcementSteelRebarVolumePercent:
                        pile.reinforcementSteelRebarVolumePercent,
                      performanceRate: pile.performanceRate,
                    },
                  })),
                },
              },
            }
          : undefined,

        breakDownResults: breakDownResults
          ? {
              update: {
                totalEstimatedHours: breakDownResults.totalEstimatedHours,
                daysToCompleteJob: breakDownResults.daysToCompleteJob,
                totalHoles: breakDownResults.totalHoles,
                averageNumberOfHolesPerHour:
                  breakDownResults.averageNumberOfHolesPerHour,
                averageNumberOfHolesPerDay:
                  breakDownResults.averageNumberOfHolesPerDay,
                correctedVolumeConcrete:
                  breakDownResults.correctedVolumeConcrete,
                totalRebarWeight: breakDownResults.totalRebarWeight,
              },
            }
          : undefined,

        projectResources: projectResources?.length
          ? {
              upsert: projectResources.map((resource) => ({
                where: {
                  resourceId: resource.resourceId || new ObjectId().toString(),
                },
                update: {
                  type: resource.type,
                  name: resource.name,
                  quantity: resource.quantity,
                  numberOfHours: resource.numberOfHours,
                  ratePerHour: resource.ratePerHour,
                  perPile: resource.perPile,
                  allPile: resource.allPile,
                  ratio: resource.ratio,
                  profit: resource.profit,
                },
                create: {
                  resourceId: resource.resourceId || new ObjectId().toString(),
                  type: resource.type,
                  name: resource.name,
                  quantity: resource.quantity,
                  numberOfHours: resource.numberOfHours,
                  ratePerHour: resource.ratePerHour,
                  perPile: resource.perPile,
                  allPile: resource.allPile,
                  ratio: resource.ratio,
                  profit: resource.profit,
                },
              })),
            }
          : undefined,

        changeLog: changeLog?.length
          ? {
              upsert: changeLog.map((log) => ({
                where: { changeId: log.changeId || new ObjectId().toString() },
                update: {
                  user: log.user,
                  message: log.message,
                  createdAt: log.createdAt,
                },
                create: {
                  changeId: log.changeId || new ObjectId().toString(),
                  user: log.user,
                  message: log.message,
                  createdAt: log.createdAt,
                },
              })),
            }
          : undefined,

        chatLog: chatLog?.length
          ? {
              upsert: chatLog.map((chat) => ({
                where: { chatId: chat.chatId },
                update: {
                  user: chat.user,
                  message: chat.message,
                  createdAt: chat.createdAt,
                },
                create: {
                  chatId: chat.chatId || new ObjectId().toString(),
                  user: chat.user,
                  message: chat.message,
                  createdAt: chat.createdAt,
                },
              })),
            }
          : undefined,
      },
    });

    return NextResponse.json(
      {
        message: "Job cost estimate and related data updated successfully",
        updatedJobCostEstimate,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("PATCH error:", err);
    return NextResponse.json(
      { message: "Error updating job cost estimate", error: err.message },
      { status: 500 }
    );
  }
};
