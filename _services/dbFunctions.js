// J O B  C O S T  E S T I M A T E S

// Added by: Nick
// Date: 2024-10-09
// Purpose: Add a new job cost estimate to the database
// Can be called anywhere in the front end by importing
// Example: import { createJobCostEstimate } from '../_services/dbFunctions';
// userEntires = {
//   estimateNumber: "NEW-001",
//   name: "PROJECT NAME",
//   client: "PROJECT CLIENT",
//   location: "PROJECT LOCATION",
//   date: "PROJECT DATE"
// };
export const createJobCostEstimate = async (userEntires, user) => {
  const jobCostEstimate = {
    estimateNumber: userEntires.estimateNumber,
    name: userEntires.name,
    client: userEntires.client,
    location: userEntires.location,
    date: userEntires.date,
    createdBy: user.name,
    createdDate: new Date().toISOString().split("T")[0],
    modifiedBy: user.name,
    modifiedDate: new Date().toISOString().split("T")[0],
    revision: 0,
    overhead: 5,
    unforeseen: 5,
    smallTools: 5,
    isWon: false,
    profit: 20,
    drillOnly: false,
    concreteType: "DEFAULT CONCRETE",
    tracking: {
      jobName: "DEFAULT JOB NAME",
      closingDate: "DEFAULT CLOSING DATE",
      finalPrice: 0,
      gc: "DEFAULT GC",
      chance: "DEFAULT CHANCE",
      projectType: "DEFAULT PROJECT TYPE",
      comments : "DEFAULT COMMENTS",
      projectContacts: [
        {
          gc: "DEFAULT GC",
          name: "DEFAULT CONTACT NAME",
          email: "DEFAULT CONTACT EMAIL",
          phone: "DEFAULT CONTACT PHONE",
        },
      ]
    },
    pileBreakDown: {
      concreteLossFactor: 5,
      standardHrsPerWorkDay: 10,
      piles: [],
    },
    breakDownResults: {
      totalEstimatedHours: 0,
      daysToCompleteJob: 0,
      totalHoles: 0,
      averageNumberOfHolesPerHour: 0,
      averageNumberOfHolesPerDay: 0,
      correctedVolumeConcrete: 0,
      totalRebarWeight: 0,
    },
    projectResources: [],
  };

  try {
    const response = await fetch("/api/job-cost-estimates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ jobCostEstimate: jobCostEstimate }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("createJobCostEstimate error:", err);
  }
};

// Added by: Nick
// Date: 2024-10-10
// Purpose: Get a single job cost estimates from the database using the estimateNumber
// Can be called anywhere in the front end by importing
// Example: import { getJobCostEstimate } from '../_services/dbFunctions';
// estimateNumber = "123456";
export const getJobCostEstimate = async (estimateNumber) => {
  try {
    const response = await fetch(`/api/job-cost-estimates/${estimateNumber}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("getJobCostEstimate error:", err);
  }
};

// Added by: Nick
// Date: 2024-10-10
// Purpose: Get all job cost estimates from the database
// Can be called anywhere in the front end by importing
// Example: import { getAllJobCostEstimates } from '../_services/dbFunctions';
// No parameters needed
export const getAllJobCostEstimates = async () => {
  try {
    const response = await fetch("/api/job-cost-estimates");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("getAllJobCostEstimates error:", err);
  }
};

// Added by: Nick
// Date: 2024-11-01
// Purpose: Update a job cost estimate in the database using the estimateNumber
// Can be called anywhere in the front end by importing
// Example: import { updateJobCostEstimate } from '../_services/dbFunctions';
export const updateJobCostEstimate = async (userEntires, user) => {
  const jobCostEstimate = {
    estimateNumber: userEntires.estimateNumber,
    modifiedBy: user.name,
    modifiedDate: new Date().toISOString().split("T")[0],
    revision: userEntires.revision + 1,
  };

  try {
    const response = await fetch(
      `/api/job-cost-estimates/${jobCostEstimate.estimateNumber}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobCostEstimate }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("updateJobCostEstimate error:", err);
  }
};

// Added by: Nick
// Date: 2025-01-14
// Purpose: Update the isWon field for a job cost estimate in the database using the estimateNumber
// Can be called anywhere in the front end by importing
// Example: import { updateJobCostEstimateIsWon } from '../_services/dbFunctions';
// estimateNumber = "123456";
export const updateJobCostEstimateIsWon = async (jobCostEstimate) => {
  try {
    const updateData = {
      jobCostEstimate: {
        estimateNumber: jobCostEstimate.estimateNumber,
        isWon: jobCostEstimate.isWon,
      },
    };

    const response = await fetch(
      `/api/job-cost-estimates/${jobCostEstimate.estimateNumber}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server response:", errorText);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("updateJobCostEstimateIsWon error:", err);
    throw err;
  }
};

//Added by: Nick
// Date: 2025-04-29
// Purpose: Update the drillOnly field for a job cost estimate in the database using the estimateNumber
// Can be called anywhere in the front end by importing
// Example: import { updateJobCostEstimateDrillOnly } from '../_services/dbFunctions';
// estimateNumber = "123456";
export const updateJobCostEstimateDrillOnly = async (jobCostEstimate) => {
  try {
    const updateData = {
      jobCostEstimate: {
        estimateNumber: jobCostEstimate.estimateNumber,
        drillOnly: jobCostEstimate.drillOnly,
      },
    };

    const response = await fetch(
      `/api/job-cost-estimates/${jobCostEstimate.estimateNumber}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server response:", errorText);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("updateJobCostEstimateDrillOnly error:", err);
    throw err;
  }
}

// Added by: Nick
// Date: 2025-02-21
// Purpose: Update the date field for a job cost estimate in the database using the estimateNumber
// Can be called anywhere in the front end by importing
// Example: import { updateJobCostEstimateDate } from '../_services/dbFunctions';
// estimateNumber = "123456";
export const updateJobCostEstimateDate = async (jobCostEstimate) => {
  try {
    const updateData = {
      jobCostEstimate: {
        estimateNumber: jobCostEstimate.estimateNumber,
        date: jobCostEstimate.date,
      },
    };

    const response = await fetch(
      `/api/job-cost-estimates/${jobCostEstimate.estimateNumber}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server response:", errorText);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("updateJobCostEstimateDate error:", err);
    throw err;
  }
};

// Added by: Nick
// Date: 2024-11-22
// Purpose: Delete a job cost estimate and all related data from the database using the estimateNumber
// Can be called anywhere in the front end by importing
// Example: import { deleteJobCostEstimate } from '../_services/dbFunctions';
// estimateNumber = "123456";
export const deleteJobCostEstimate = async (estimateNumber) => {
  try {
    const response = await fetch(`/api/job-cost-estimates/${estimateNumber}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("deleteJobCostEstimate error:", err);
  }
};

// P I L E  B R E A K  D O W N

// Added by: Nick
// Date: 2024-10-10
// Purpose: Update a pile break down in the database
// Can be called anywhere in the front end by importing
// Example: import { updatePileBreakDown } from '../_services/dbFunctions';
// pileBreakDown = {
//     concreteLossFactor: 5,
//     standardHrsPerWorkDay: 10,
//     primaryDrill: "DEFAULT DRILL",
//   };
export const updatePileBreakDown = async (pileBreakDown) => {
  try {
    const response = await fetch(
      `/api/pile-break-down/${pileBreakDown.pileBreakDownId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pileBreakDown: pileBreakDown }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("updatePileBreakDown error:", err);
  }
};

// B R E A K  D O W N  R E S U L T S

// Added by: Nick
// Date: 2024-10-10
// Purpose: Update a break down result in the database
// Can be called anywhere in the front end by importing
// Example: import { updateBreakDownResult } from '../_services/dbFunctions';
// breakDownResult = {
//     breakDownResultsId: "67081c55d982fd168435fb02",
//     totalEstimatedHours: 99,
//     daysToCompleteJob: 99,
//     totalHoles: 99,
//     averageNumberOfHolesPerHour: 99,
//     averageNumberOfHolesPerDay: 99,
//     correctedVolumeConcrete: 99,
//     totalRebarWeight: 99
//   };
export const updateBreakDownResult = async (inputBreakDownResult) => {
  try {
    const response = await fetch(
      `/api/break-down-results/${inputBreakDownResult.breakDownResultsId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ breakDownResult: inputBreakDownResult }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("updateBreakDownResult error:", err);
  }
};

// P I L E S

// Added by: Nick
// Date: 2024-10-10
// Purpose: Add a pile to the database
// Can be called anywhere in the front end by importing
// Example: import { createPile } from '../_services/dbFunctions';
// pile = {
//     pileDimensionsType: "P3",
//     pileDimensionsQty: 1,
//     pileDimensionsShaft: "620",
//     pileDimensionsBell: 0,
//     pileDimensionsDepthMeter: 10,
//     concreteM3PerPile: 3,
//     concreteM3PerType: 3,
//     drillingMinPerHole: 30,
//     drillingHoursPerType: 0.5,
//     drillingHolesPerDay: 6,
//     reinforcementSteelVerticalsQty: 8,
//     reinforcementSteelVerticalsSize: 20,
//     reinforcementSteelVerticalsLength: 10,
//     reinforcementSteelStirrupsOverl: 30,
//     reinforcementSteelStirrupsTop: 3,
//     reinforcementSteelStirrupsTopCC: 150,
//     reinforcementSteelStirrupsBotCC: 300,
//     reinforcementSteelStirrupsQty: 35,
//     reinforcementSteelStirrupsSize: 10,
//     reinforcementSteelDowellsQty: 0,
//     reinforcementSteelDowellsSize: 5.98,
//     reinforcementSteelDowellsLength: 10,
//     reinforcementSteelWeightPerPile: 10,
//     reinforcementSteelWeightPerType: 10,
//     reinforcementSteelRebarVolumePercent: 10,
//     performanceRate: 10,
//     pileBreakDownId: "67081c55d982fd168435fb01"
//   };
export const createPile = async (pile) => {
  try {
    const response = await fetch("/api/piles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pile }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("createPile error:", err);
  }
};

// Added by: Nick
// Date: 2024-11-22
// Purpose: Get a single pile from the database using the pileId
// Can be called anywhere in the front end by importing
// Example: import { getPile } from '../_services/dbFunctions';
// pileId = "123456";
export const getPile = async (pileId) => {
  try {
    const response = await fetch(`/api/piles/${pileId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("getPile error:", err);
  }
};

// Added by: Nick
// Date: 2024-11-22
// Purpose: Get all piles for a project from the database using the pileBreakDownId
// Can be called anywhere in the front end by importing
// Example: import { getProjectPiles } from '../_services/dbFunctions';
// pileBreakDownId = "123456";
export const getProjectPiles = async (pileBreakDownId) => {
  try {
    const response = await fetch(`/api/project-all-piles/${pileBreakDownId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("getProjectPiles error:", err);
  }
};

// Added by: Nick
// Date: 2024-10-10
// Purpose: Update a pile in the database using the pileId'
// Can be called anywhere in the front end by importing
// Example: import { updatePile } from '../_services/dbFunctions';
// pile = {
//     pileId: "123456",
//     pileDimensionsType: "P3",
//     pileDimensionsQty: 1,
//     pileDimensionsShaft: "620",
//     pileDimensionsBell: 0,
//     pileDimensionsDepthMeter: 10,
//     concreteM3PerPile: 3,
//     concreteM3PerType: 3,
//     drillingMinPerHole: 30,
//     drillingHoursPerType: 0.5,
//     drillingHolesPerDay: 6,
//     reinforcementSteelVerticalsQty: 8,
//     reinforcementSteelVerticalsSize: 20,
//     reinforcementSteelVerticalsLength: 10,
//     reinforcementSteelStirrupsOverl: 30,
//     reinforcementSteelStirrupsTop: 3,
//     reinforcementSteelStirrupsTopCC: 150,
//     reinforcementSteelStirrupsBotCC: 300,
//     reinforcementSteelStirrupsQty: 35,
//     reinforcementSteelStirrupsSize: 10,
//     reinforcementSteelDowellsQty: 0,
//     reinforcementSteelDowellsSize: 5.98,
//     reinforcementSteelDowellsLength: 10,
//     reinforcementSteelWeightPerPile: 10,
//     reinforcementSteelWeightPerType: 10,
//     reinforcementSteelRebarVolumePercent: 10,
//     performanceRate: 10,
//   };
export const updatePile = async (pile) => {
  try {
    const response = await fetch(`/api/piles/${pile.pileId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pile }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("updatePile error:", err);
  }
};

// Added by: Nick
// Date: 2024-11-28
// Purpose: Delete a pile from the database using the pileId
// Can be called anywhere in the front end by importing
// Example: import { deletePile } from '../_services/dbFunctions';
// pileId = "123456";
export const deletePile = async (pileId) => {
  try {
    const response = await fetch(`/api/piles/${pileId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("deletePile error:", err);
  }
};

// P R O J E C T  R E S O U R C E S

// Added by: Nick
// Date: 2024-10-17
// Purpose: Add a project resource to a jobCostEstimate in the database
// Can be called anywhere in the front end by importing
// Example: import { addProjectResource } from '../_services/dbFunctions';
// projectResource = {
//     type: "TYPE",
//     name: "NAME",
//     quantity: 1,
//     numberOfHours: 0,
//     ratePerHour: 0,
//     perPile: 0,
//     allPile: 0,
//     ratio: 1,
//     profit: 1,
//     jobCostEstimateEstimateNumber: "123456"
//   };
export const addProjectResource = async (projectResource) => {
  try {
    const response = await fetch("/api/project-resources", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectResource }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("addProjectResource error:", err);
  }
};

// Added by: Nick
// Date: 2024-11-22
// Purpose: Get a single project resource from the database using the resourceId
// Can be called anywhere in the front end by importing
// Example: import { getProjectResource } from '../_services/dbFunctions';
// resourceId = "123456";
export const getProjectResource = async (resourceId) => {
  try {
    const response = await fetch(`/api/project-resources/${resourceId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("getProjectResource error:", err);
  }
};

// Added by: Nick
// Date: 2024-11-22
// Purpose: Get all project resources for a project from the database using the jobCostEstimateEstimateNumber
// Can be called anywhere in the front end by importing
// Example: import { getAllProjectResources } from '../_services/dbFunctions';
// jobCostEstimateEstimateNumber = "123456";
export const getAllProjectResources = async (jobCostEstimateEstimateNumber) => {
  try {
    const response = await fetch(
      `/api/project-all-resources/${jobCostEstimateEstimateNumber}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("getAllProjectResources error:", err);
  }
};

// Added by: Nick
// Date: 2024-10-17
// Purpose: Update a project resource in the database using the projectResourceId
// Can be called anywhere in the front end by importing
// Example: import { updateProjectResource } from '../_services/dbFunctions';
// projectResource = {
//     projectResourceId: "123456",
//     type: "TYPE",
//     name: "NAME",
//     quantity: 1,
//     numberOfHours: 0,
//     ratePerHour: 0,
//     perPile: 0,
//     allPile: 0,
//     ratio: 1,
//     profit: 1,
//     jobCostEstimateEstimateNumber: "123456"
//   };
export const updateProjectResource = async (projectResource) => {
  try {
    const response = await fetch(
      `/api/project-resources/${projectResource.resourceId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectResource }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("updateProjectResource error:", err);
  }
};

// Added by: Nick
// Date: 2024-11-22
// Purpose: Delete a project resource from the database using the resourceId
// Can be called anywhere in the front end by importing
// Example: import { deleteProjectResource } from '../_services/dbFunctions';
// resourceId = "123456";
export const deleteProjectResource = async (resourceId) => {
  try {
    const response = await fetch(`/api/project-resources/${resourceId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("deleteProjectResource error:", err);
  }
};

// C H A T  L O G

// Added by: Nick
// Date: 2024-10-21
// Purpose: Add a new chat log to the database
// Can be called anywhere in the front end by importing
// Example: import { createChatLog } from '../_services/dbFunctions';
// userEntry = {
//    user : "DEFAULT-USER",
//    message : "MESSAGE",
//    jobCostEstimateEstimateNumber : "123456"
// };
export const createChatLog = async (userEntry) => {
  const chatLog = {
    user: userEntry.user,
    message: userEntry.message,
    createdAt: new Date().toISOString().split("T")[0],
    jobCostEstimateEstimateNumber: userEntry.jobCostEstimateEstimateNumber,
  };

  try {
    const response = await fetch("/api/chat-log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatLog }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("createChatLog error:", err);
  }
};

// C H A N G E  L O G

// Added by: Nick
// Date: 2024-11-04
// Purpose: Add a new change log to the database
// Can be called anywhere in the front end by importing
// Example: import { createChangeLog } from '../_services/dbFunctions';
// userEntry = {
//    user : "DEFAULT-USER",
//    message : "MESSAGE",
//    jobCostEstimateEstimateNumber : "123456"
// };
export const createChangeLog = async (userEntry) => {
  const changeLog = {
    user: userEntry.user,
    message: userEntry.message,
    createdAt: new Date().toISOString().split("T")[0],
    jobCostEstimateEstimateNumber: userEntry.jobCostEstimateEstimateNumber,
  };

  try {
    const response = await fetch("/api/change-log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ changeLog }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (err) {
    console.error("createChangeLog error:", err);
  }
};

// R E S O U R C E S

// Added by: Nick
// Date: 2024-10-18
// Add a new resource to the database
// Can be called anywhere in the front end by importing
// Example: import { createResource } from '../_services/dbFunctions';
// resource = {
//     unitNumber: "NEW-001",
//     name: "RESOURCE NAME",
//     type: "RESOURCE TYPE",
//     ratePerHour: 0,
//     stPerHour: 0,
//     availability: "yes",
//     }
export const createResource = async (resource) => {
  try {
    const response = await fetch("/api/resources", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resource }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("createResource error:", err);
  }
};

// Added by: Nick
// Date: 2024-11-06
// Purpose: Get a single resource from the database using the unitNumber
// Can be called anywhere in the front end by importing
// Example: import { getResource } from '../_services/dbFunctions';
// unitNumber = 999999999;
export const getResource = async (unitNumber) => {
  try {
    const response = await fetch(`/api/resources/${unitNumber}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("getResource error:", err);
  }
};

// Added by: Nick
// Date: 2024-10-18
// Purpose: Get all resources from the database
// Can be called anywhere in the front end by importing
// Example: import { getAllResources } from '../_services/dbFunctions';
// No parameters needed
export const getAllResources = async () => {
  try {
    const response = await fetch("/api/resources");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("getAllResources error:", err);
  }
};

// Added by: Nick
// Date: 2024-11-06
// Purpose: Update a resource in the database using the unitNumber
// Can be called anywhere in the front end by importing
// Example: import { updateResource } from '../_services/dbFunctions';
// resource = {
//     unitNumber: 999999999,
//     name: "RESOURCE NAME",
//     type: "RESOURCE TYPE",
//     ratePerHour: 0,
//     stPerHour: 0,
//     availability: "yes",
//     }
export const updateResource = async (resource) => {
  try {
    const response = await fetch(`/api/resources/${resource.unitNumber}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resource }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("updateResource error:", err);
  }
};

// Added by: Nick
// Date: 2024-11-06
// Purpose: Delete a resource from the database using the unitNumber
// Can be called anywhere in the front end by importing
// Example: import { deleteResource } from '../_services/dbFunctions';
// unitNumber = 999999999;
export const deleteResource = async (unitNumber) => {
  try {
    const response = await fetch(`/api/resources/${unitNumber}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("deleteResource error:", err);
  }
};

// U S E R S

// Added by: Nick
// Date: 2024-10-23
// Purpose: Add new user to the database
// Can be called anywhere in the front end by importing
// Example: import { createUser } from '../_services/dbFunctions';
// user = {
//    id: "123456",
//    email: "test@test.com",
//    name: "DEFAULT USER",
//    password: "password",
//    role: "user",
//  }
export const createUser = async (user) => {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("createUser error:", err);
  }
};

// Added by: Nick
// Date: 2024-10-23
// Purpose: Get a user from the database using the user Id
// Can be called anywhere in the front end by importing
// Example: import { getUser } from '../_services/dbFunctions';
// userId = "123456";
export const getUser = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("getUser error:", err);
  }
};

// Added by: Nick
// Date: 2024-10-23
// Purpose: Get all users from the database
// Can be called anywhere in the front end by importing
// Example: import { getAllUsers } from '../_services/dbFunctions';
// No parameters needed
export const getAllUsers = async () => {
  try {
    const response = await fetch("/api/users");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("getAllUsers error:", err);
  }
};

// Added by: Nick
// Date: 2024-10-23
// Purpose: Update a user in the database using the user Id
// Can be called anywhere in the front end by importing
// Example: import { updateUser } from '../_services/dbFunctions';
// user = {
//    id: "123456",
//    email: "newemail@email.com",
//    name: "NEW USER",
//    password: "password",
//    role: "user",
//    chatColour: "#0000FF",
//  }
export const updateUser = async (user) => {
  try {
    const response = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("updateUser error:", err);
  }
};

// Added by: Nick
// Date: 2024-10-23
// Purpose: Delete a user from the database using the user Id
// Can be called anywhere in the front end by importing
// Example: import { deleteUser } from '../_services/dbFunctions';
// userId = "123456";
export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("deleteUser error:", err);
  }
};

// M U L T I  F U N C T I O N S

// Added by: Nick
// Date: 2024-10-15
// formats pile break down, break down results, piles and project resources before calling
// the updateEstimate function to update the job cost estimate in the database
// Can be called anywhere in the front end by importing
export const multiTableUpdate = async (
  pileBreakDown,
  breakDownResults,
  piles,
  projectResources,
  jobCostEstimate,
  user
) => {
  try {
    const newPiles = [];
    const updatedPiles = [];
    jobCostEstimate.changeLog = [];

    // Function to sanitize NaN and other comparable values
    const sanitizeData = (data) => {
      return Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key,
          value !== value ? null : value,
        ])
      );
    };

    // Fetch all the piles for the pileBreakDownId in one request
    const existingPiles = await getProjectPiles(pileBreakDown.pileBreakDownId);

    // Track pile IDs from the provided list
    const providedPileIds = new Set(piles.map((pile) => pile.pileId));

    // Identify piles in the database that are not in the provided list
    const pilesToDelete = existingPiles.filter(
      (existingPile) => !providedPileIds.has(existingPile.pileId)
    );

    // Delete the extra piles
    for (const pile of pilesToDelete) {
      await deletePile(pile.pileId);

      // log the deletion
      const changeLog = {
        user: user.name,
        message: `Pile ${pile.pileDimensionsType} was removed from the project`,
        createdAt: new Date().toISOString().split("T")[0],
        jobCostEstimateEstimateNumber: jobCostEstimate.estimateNumber,
      };

      // add the changelog to the jobCostEstimate.changeLog array
      jobCostEstimate.changeLog.push(changeLog);
    }

    // Loop through each pile and compare with existing piles
    for (const pile of piles) {
      pile.pileBreakDownId = pileBreakDown.pileBreakDownId;

      if (pile.pileId) {
        // Find the existing pile based on pileId
        const existingPile = existingPiles.find(
          (ep) => ep.pileId === pile.pileId
        );

        if (existingPile) {
          const sanitizedExistingPile = sanitizeData(existingPile);
          const sanitizedNewPile = sanitizeData(pile);

          // Compare the sanitized data
          const hasChanges = Object.keys(sanitizedNewPile).some(
            (key) => sanitizedNewPile[key] !== sanitizedExistingPile[key]
          );

          if (hasChanges) {

            // Update the pile and create a change log
            const changeLog = {
              user: user.name,
              message: `Pile ${pile.pileDimensionsType} was updated`,
              jobCostEstimateEstimateNumber: jobCostEstimate.estimateNumber,
              createdAt: new Date().toISOString().split("T")[0],
            };
            jobCostEstimate.changeLog.push(changeLog);
            updatedPiles.push(pile);
          }
        }
      } else {

        // Create a new pile and its change log
        const changeLog = {
          user: user.name,
          message: `Pile ${pile.pileDimensionsType} was added`,
          jobCostEstimateEstimateNumber: jobCostEstimate.estimateNumber,
          createdAt: new Date().toISOString().split("T")[0],
        };
        jobCostEstimate.changeLog.push(changeLog);
        newPiles.push(pile);
      }
    }

    //combine the new and updated piles
    const allPiles = [...newPiles, ...updatedPiles];

    // Fetch all project resources for the project in one request
    const existingResources = await getAllProjectResources(
      jobCostEstimate.estimateNumber
    );

    // Track resource IDs from the provided list
    const providedResourceIds = new Set(
      projectResources.map((resource) => resource.resourceId)
    );

    // Identify resources in the database that are not in the provided list
    const resourcesToDelete = existingResources.filter(
      (existingResource) =>
        !providedResourceIds.has(existingResource.resourceId)
    );

    // Delete the extra resources
    for (const resource of resourcesToDelete) {
      await deleteProjectResource(resource.resourceId);

      // log the deletion
      const changeLog = {
        user: user.name,
        message: `Resource ${resource.name} was removed from the project`,
        jobCostEstimateEstimateNumber: jobCostEstimate.estimateNumber,
        createdAt: new Date().toISOString().split("T")[0],
      };
      jobCostEstimate.changeLog.push(changeLog);
    }

    // Loop through each resource in the projectResources array
    for (const projectResource of projectResources) {
      if (projectResource.resourceId) {

        // Find the existing resource based on resourceId
        const existingResource = existingResources.find(
          (resource) => resource.resourceId === projectResource.resourceId
        );

        if (existingResource) {

          // Sanitize both existing and new data
          const sanitizedExistingResource = sanitizeData(existingResource);
          const sanitizedNewResource = sanitizeData(projectResource);

          // Separate the `ratio` field for specific handling as not to trigger to many change logs, 
          // only want to log other changes to the resource and not the ratio
          const { ratio: newRatio, ...restNewResource } = sanitizedNewResource;
          const { ratio: existingRatio, ...restExistingResource } =
            sanitizedExistingResource;

          // Check for changes in fields other than `ratio`
          const hasChangesExcludingRatio = Object.keys(restNewResource).some(
            (key) => restNewResource[key] !== restExistingResource[key]
          );

          // Check if only the `ratio` field has changed
          const ratioChanged = newRatio !== existingRatio;

          if (hasChangesExcludingRatio) {

            // Update the project resource and create a change log
            const changeLog = {
              user: user.name,
              message: `Resource ${projectResource.name} was updated`,
              createdAt: new Date().toISOString().split("T")[0],
              jobCostEstimateEstimateNumber: jobCostEstimate.estimateNumber,
            };
            jobCostEstimate.changeLog.push(changeLog);
          }
        }
      } else {
        
        // Add new project resource and its change log
        const changeLog = {
          user: user.name,
          message: `Resource ${projectResource.name} was added`,
          createdAt: new Date().toISOString().split("T")[0],
          jobCostEstimateEstimateNumber: jobCostEstimate.estimateNumber,
        };
        jobCostEstimate.changeLog.push(changeLog);
      }
    }

    await updateEstimate(
      pileBreakDown,
      breakDownResults,
      allPiles,
      projectResources,
      jobCostEstimate,
      user
    );
  } catch (err) {
    console.error("multiTableUpdate error:", err);
  }
};

// Added by: Nick
// Date: 2025-01-21
// Purpose: function to update the estimate
// Can be called anywhere in the front end by importing
// Example: import { updateEstimate } from '../_services/dbFunctions';
export const updateEstimate = async (
  pileBreakDown,
  breakDownResults,
  piles,
  projectResources,
  jobCostEstimate,
  user
) => {
  const pilesWithPileBreakDownId = piles.map((pile) => {
    pile.pileBreakDownId = pileBreakDown.pileBreakDownId;
    return pile;
  });

  pileBreakDown.piles = pilesWithPileBreakDownId;
  jobCostEstimate.pileBreakDown = pileBreakDown;
  jobCostEstimate.breakDownResults = breakDownResults;
  jobCostEstimate.projectResources = projectResources;
  jobCostEstimate.modifiedBy = user.name;
  jobCostEstimate.modifiedDate = new Date().toISOString().split("T")[0];
  jobCostEstimate.revision = jobCostEstimate.revision + 1;

  console.log("jobCostEstimate", jobCostEstimate);

  try {
    const response = await fetch(
      `/api/update-job-cost-estimate/${jobCostEstimate.estimateNumber}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobCostEstimate }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (err) {
    console.error("updateEstimate error:", err);
  }
};
