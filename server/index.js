const express = require("express");
require("dotenv").config({ path: "../.env" });

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const crypto = require("crypto");
const Joi = require("joi");
const cors = require("cors");

const http = require("http");

// 🔥 NEW SOCKET IMPORT
const { initSocket, getIO } = require("./socket");

const jobQueue = require("./queue/queue");
const serverAdapter = require("./dashboard/bullBoard");

const app = express();
const server = http.createServer(app);

// 🔥 INIT SOCKET
initSocket(server);

// ---------------- CORS ----------------
app.use(
  cors({
    origin: ["http://localhost:5190", "http://localhost:5191"],
    credentials: true,
  })
);

// ---------------- MIDDLEWARE ----------------
app.use(express.json());
app.use(helmet({ contentSecurityPolicy: false }));

// ---------------- RATE LIMIT ----------------
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 50,
});
app.use("/add-job", limiter);
app.use("/retry", limiter);

// ---------------- DASHBOARD ----------------
app.use("/admin/queues", serverAdapter.getRouter());

// ---------------- METRICS ----------------
app.get("/metrics", async (req, res) => {
  const counts = await jobQueue.getJobCounts();
  const uptime = process.uptime();

  res.json({
    totalJobs:
      counts.waiting +
      counts.active +
      counts.completed +
      counts.failed,
    waiting: counts.waiting,
    active: counts.active,
    completed: counts.completed,
    failed: counts.failed,
    throughput:
      uptime > 0 ? counts.completed / uptime : 0,
  });
});

// ---------------- JOBS ----------------
app.get("/jobs", async (req, res) => {
  const jobs = await jobQueue.getJobs([
    "waiting",
    "active",
    "completed",
    "failed",
  ]);

  res.json(
    jobs.map((job) => ({
      id: job.id,
      name: job.name,
      data: job.data,
      status: job.finishedOn
        ? "completed"
        : job.failedReason
        ? "failed"
        : job.processedOn
        ? "active"
        : "waiting",
    }))
  );
});

// ---------------- ADD JOB ----------------
app.post("/add-job", async (req, res) => {
  const job = await jobQueue.add("task", req.body, {
    jobId: crypto.randomUUID(),
  });

  // 🔥 SOCKET EMIT
  const io = getIO();
  io.emit("job_update");

  res.json({ jobId: job.id });
});

// ---------------- RETRY ----------------
app.post("/retry/:id", async (req, res) => {
  const job = await jobQueue.getJob(req.params.id);
  if (!job) return res.status(404).send("Not found");

  await job.retry();

  // 🔥 SOCKET EMIT
  const io = getIO();
  io.emit("job_update");

  res.send("Retried");
});

// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`Server running on ${PORT}`)
);