const emailJob = require("../jobs/emailJob");
const imageJob = require("../jobs/imageJob");
const reportJob = require("../jobs/reportJob");

const processJob = async (job) => {
  console.log("Processing job:", job.id, "| Type:", job.name);

  switch (job.name) {
    case "email":
      return await emailJob(job.data);

    case "image":
      return await imageJob(job.data);

    case "report":
      return await reportJob(job.data);

    default:
      throw new Error("Unknown job type");
  }
};

module.exports = processJob;