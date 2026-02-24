require("dotenv").config({ path: "../.env" });
const { Worker } = require("bullmq");
const connection = require("../config/redis");
const processJob = require("../utils/processor");
const deadQueue = require("../queue/deadQueue");
const logger = require("../utils/logger");

// 🔥 ADD THIS LINE
const { getIO } = require("../socket");

const worker = new Worker(
  "job-queue",
  async (job) => {
    logger.info(`🚀 Job ${job.id} started`);

    const result = await processJob(job);

    logger.info(`✅ Job ${job.id} completed`);

    return result;
  },
  {
    connection,
    concurrency: 5,
    limiter: {
      max: 10,
      duration: 1000,
    },
  }
);

// ✅ Completed Event
worker.on("completed", (job) => {
  logger.info(`✅ Job completed: ${job.id}`);

  // 🔥 ADD THIS
  const io = getIO();
  if (io) io.emit("job_update");
});

// ❌ Failed Event
worker.on("failed", async (job, err) => {
  logger.error(`❌ Job failed: ${job.id} | Error: ${err.message}`);

  // 🔥 ADD THIS
  const io = getIO();
  if (io) io.emit("job_update");

  if (job.attemptsMade === job.opts.attempts) {
    await deadQueue.add("failed-job", {
      originalJob: job.data,
      error: err.message,
    });

    logger.warn(`⚠️ Job ${job.id} moved to dead queue`);
  }
});

// Graceful shutdown
process.on("SIGINT", async () => {
  logger.info("Shutting down worker...");
  await worker.close();
  process.exit(0);
});